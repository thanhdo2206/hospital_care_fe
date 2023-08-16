export const setStorage = (name: string, data: string): void => {
  localStorage.setItem(name, data);
};

export const getStorage = (
  name: string
): string | null | undefined | boolean | any => {
  if (localStorage.getItem(name)) {
    const data: string | null | undefined = localStorage.getItem(name);
    return data;
  }
  return; //undefined
};

export const setLocalSorageJson = (name: string, value: any): void => {
  localStorage.setItem(name, JSON.stringify({ ...value }));
};

export const getStorageJson = (name: string): any | undefined => {
  if (localStorage.getItem(name)) {
    const dataStore: string | undefined | null = localStorage.getItem(name);
    if (typeof dataStore == "string") {
      const data = JSON.parse(dataStore);
      return data;
    }
    return undefined;
  }
  return; //undefined
};

export const deleteLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};
