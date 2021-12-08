export class MockLocalStorage {
  store: Record<string, string> = {};

  addMockLocalStorage() {
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return (this.store[key] = <string>value);
    });

    spyOn(localStorage, 'getItem').and.callFake((key: string): string | null => {
      return this.store[key] || null;
    });

    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete this.store[key];
    });

    spyOn(localStorage, 'clear').and.callFake((): void => {
      this.store = {};
    });
  }
}
