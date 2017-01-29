export class Store {

  constructor() {
  }

  validateKey(key) {
    if (!key) {
      throw new Error('key is undefined');
    }
  }

  save(key, value, state) {
    this.validateKey(key);
    if (!value) {
      throw new Error('value is undefined');
    }
    if (state) {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  load(key, state) {
    this.validateKey(key);
    if (state) {
        return localStorage.getItem(key);
    }
    return JSON.parse(localStorage.getItem(key));
  }

  remove(key) {
    this.validateKey(key);
    localStorage.removeItem(key);
  }
}
