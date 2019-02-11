export class LocalStorage {
  private isLocalStorageAvailable: boolean;

  constructor() {
    this.testLocalStorage();
  }

  public setItem(key: string, value: any) {
    if (!this.isLocalStorageAvailable) {
      return;
    }
    localStorage.setItem(key, this.serialize(value));
  }

  public getItem<T>(key: string): T | null {
    if (!this.isLocalStorageAvailable) {
      return null;
    }

    try {
      return this.deserialize<T>(localStorage.getItem(key));
    } catch (err) {
      return null;
    }
  }

  private serialize(value: any): string {
    return JSON.stringify(value);
  }

  private deserialize<T>(value: any): T {
    return JSON.parse(value);
  }

  /**
   * Returns true if LocalStorage is available
   */
  private testLocalStorage() {
    if (this.isLocalStorageAvailable !== undefined) {
      return this.isLocalStorageAvailable;
    }

    const testKey = "localstorage_test_key";
    const testValue = "localstorage_test_value";
    try {
      localStorage.setItem(testKey, testValue);
      if (localStorage.getItem(testKey) === testValue) {
        localStorage.removeItem(testKey);
        this.isLocalStorageAvailable = true;
      }
    } catch (err) {
      this.isLocalStorageAvailable = false;
      console.warn("Local Storage is not available.");
    }
    return this.isLocalStorageAvailable;
  }
}
