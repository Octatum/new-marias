const isClient = typeof window !== 'undefined';

const localStorageManager = {
  retrieve: function(key, defaultValue) {
    if (!isClient) return defaultValue;

    const item = JSON.parse(window.localStorage.getItem(key));

    return item || defaultValue;
  },

  set: function(key, value) {
    if (!isClient) return;

    const itemsJson = JSON.stringify(value);

    window.localStorage.setItem(key, itemsJson);
  },
};

export default localStorageManager;
