import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER: '@kojo_user',
  IS_LOGGED_IN: '@kojo_logged_in',
};

export const Storage = {
  async saveUser(user: { name: string; email: string; phone: string }) {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
    await AsyncStorage.setItem(KEYS.IS_LOGGED_IN, 'true');
  },

  async getUser() {
    const raw = await AsyncStorage.getItem(KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  },

  async isLoggedIn(): Promise<boolean> {
    const val = await AsyncStorage.getItem(KEYS.IS_LOGGED_IN);
    return val === 'true';
  },

  async logout() {
    await AsyncStorage.removeItem(KEYS.IS_LOGGED_IN);
    await AsyncStorage.removeItem(KEYS.USER);
  },


};
