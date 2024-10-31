from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pandas import DataFrame

class TouristCationDB:
  def __init__(self, uri):
    self.client = MongoClient(uri, server_api=ServerApi('1'))
    self.db_client = self.client['TouristCation']
    try:
      self.client.admin.command('ping')
      print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
      print(e)

  def get_user_preferences(self, collection):
    #accommodationpreferences
    users_preferences_raw = self.db_client[collection].aggregate([
      {
          '$match': {}
      },
      {
          '$project': {
              '__v': 0
          }
      }
    ])
    return DataFrame(users_preferences_raw).astype(str)

  def get_informations(self, collection):
    #informations
    informations_raw = self.db_client[collection].aggregate([
      {
          '$match': {}
      },
      {
          '$project': {
              'Name': 0,
              'AE': 0,
              'DOT': 0,
              '__v': 0,
              'likes': 0,
              'Net': 0,
          }
      }
    ])
    return DataFrame(informations_raw).astype(str).rename(columns={'_id': 'accoId'})

  def get_user_interactions(self, collection):
    #userinteraction
    user_interaction_raw = self.db_client[collection].aggregate([
      {
        '$match': { 'type': 'like' }
      },
      {
        '$project': {
          '_id': 0,
          'type': 0,
          '__v': 0
        }
      }
    ])
    return DataFrame(user_interaction_raw).astype(str)

  def get_user_preferences_by_id(self,collection,id):
    #userpreferences
    users_preferences_raw = self.db_client[collection].aggregate([
      {
          '$match': {'_id': id}
      },
      {
          '$limit': 2
      },
      {
          '$project': {
              '__v': 0
          }
      }
    ])
    return DataFrame(users_preferences_raw).astype(str)

  def get_user_interaction_by_id(self, id):
    user_interaction_raw = self.db_client['accommodationinteraction'].aggregate([
      {
        '$match': {'_id': id}
      },
      {
        '$project': {
          '_id': 0,
          'type': 0,
          '__v': 0
        }
      }
    ])
    return DataFrame(user_interaction_raw).astype(str)