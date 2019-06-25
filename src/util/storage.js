export default class Storage {
  static set = (key, value) => {
    window.localStorage.setItem(key, value);
  };

  static get = key => {
    return window.localStorage.getItem(key) || null;
  };

  static remove = key => {
    window.localStorage.removeItem(key);
  };
}
