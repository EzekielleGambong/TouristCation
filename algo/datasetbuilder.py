from utils import Utils
from lightfm.data import Dataset
import pandas as pd

class DatasetBuilder:
  def __init__(self, user_preferences, acco_informations, interactions):
    self.utils = Utils()
    self.df_users_cleaned = self.utils.format_user_features(user_preferences)
    self.df_acco_cleaned = self.utils.format_features(acco_informations)
    self.df_user_interactions = self.utils.format_user_interaction(interactions)

    self.all_user_features = self.utils.generate_all_user_features(self.df_users_cleaned['features'])
    self.all_features = self.utils.generate_all_features(self.df_acco_cleaned['features'])

    self.dataset = Dataset()
    self.dataset.fit(self.df_users_cleaned['userId'], self.df_acco_cleaned['accoId'], self.all_user_features, self.all_features)

  def add_new_user(self, df_user_raw):
    df_users_cleaned = self.utils.format_user_features(df_user_raw)
    all_user_features = self.utils.generate_all_user_features(df_users_cleaned['features'])
    if self.df_users_cleaned['userId'].isin([df_users_cleaned['userId'][0]]).any():
      return
    self.df_users_cleaned = pd.concat([self.df_users_cleaned, df_users_cleaned]).reset_index(drop=True)
    self.all_user_features = list(set(self.all_user_features + all_user_features))
    self.dataset.fit_partial(users=df_users_cleaned['userId'], user_features=self.all_user_features)

  def add_new_acco(self, df_acco_raw):
    df_acco_cleaned = self.utils.format_features(df_acco_raw)
    all_features = self.utils.generate_all_user_features(df_acco_cleaned['features'])
    if self.df_acco_cleaned['accoId'].isin([df_acco_cleaned['accoId'][0]]).any():
      return
    self.df_pet_cleaned = pd.concat([self.df_acco_cleaned, df_acco_cleaned]).reset_index(drop=True)
    self.all_features = list(set(self.all_features + all_features))
    self.dataset.fit_partial(items=df_acco_cleaned['userId'], item_features=self.all_features)

  def add_new_interactions(self, df_interaction):
    self.df_user_interactions = pd.concat([self.df_user_interactions, df_interaction]).reset_index(drop=True)

  def get_dataset(self):
    return self.dataset

  def get_user_features(self):
    user_features_data = self.utils.generate_user_features(self.df_users_cleaned)
    return self.dataset.build_user_features(user_features_data)

  def get_acco_features(self):
    acco_features_data = self.utils.generate_features(self.df_acco_cleaned)
    return self.dataset.build_item_features(acco_features_data)

  def get_user_interactions(self):
    return self.dataset.build_interactions(self.df_user_interactions)

  def get_df_acco_list(self):
    return self.df_acco_cleaned