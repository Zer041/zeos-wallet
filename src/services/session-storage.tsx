export class SessionStorage {
  protected getStorage(key: string): Storage {
    return JSON.parse(sessionStorage.getItem(key) || 'undefined');
  }

  protected setStorage(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}