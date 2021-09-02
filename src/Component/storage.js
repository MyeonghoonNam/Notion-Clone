const storage = window.localStorage;

export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const getItem = (key, defaultValue) => {
  try {
    const value = storage.getItem(key);

    return value ? JSON.parse(value) : defaultValue;
  } catch(e) {
    return defaultValue;
  }
}