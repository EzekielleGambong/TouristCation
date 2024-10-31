class Utils:
  def format_user_features(self, df_users_preferences_raw):
    df_users_preferences_cleaned = df_users_preferences_raw.applymap(lambda x: x.lower().replace(" ", "-") if isinstance(x, str) else x)
    df_users_preferences_cleaned['features'] = df_users_preferences_cleaned.iloc[:, 2:].apply(lambda row: ','.join(row.map(str)), axis=1)
    return df_users_preferences_cleaned[['userId', 'features']]

#pet features / pet informations
  def format_features(self, df_informations_raw):
    df_informations_cleaned = df_informations_raw.applymap(lambda x: x.lower().replace(" ", "-") if isinstance(x, str) else x)
    df_informations_cleaned['features'] = df_informations_cleaned.iloc[:, 1:].apply(lambda row: ','.join(row.map(str)), axis=1)
    return df_informations_cleaned[['accoId','features']]

  def format_user_interaction(self, df_user_interaction_raw):
    return list(zip(df_user_interaction_raw['userId'], df_user_interaction_raw['accoId']))

  def generate_user_features(self, df_users_preferences_cleaned):
    #Generate user features
    return list(zip((df_users_preferences_cleaned['userId']), df_users_preferences_cleaned['features'].str.lower().str.split(',')))
#acco
  def generate_features(self, df_informations_cleaned):
    #Generate user features
    return list(zip((df_informations_cleaned['accoId']), df_informations_cleaned['features'].str.lower().str.split(',')))

  def generate_all_user_features(self, user_features_list):
    #Generate all feature list of user
    user_features_list = user_features_list.str.split(',')
    user_features_list = user_features_list.apply(pd.Series).stack().reset_index(drop=True)
    return list(set(user_features_list))

  def generate_all_features(self, features_list):
    #Generate all feature list
    features_list = features_list.str.split(',')
    features_list = features_list.apply(pd.Series).stack().reset_index(drop=True)
    return list(set(features_list))