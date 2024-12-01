import { useState } from "react";

const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [state, setState] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (!value) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(error);
    }
  });

  const setValue = (value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    } catch (error) {
      console.error(error);
    }
  };

  return [state, setValue];
};

export default useLocalStorage;
