import CryptoJS from "crypto-js";

const SECRET_KEY = "proifMantap2025"; 

export const secureStorage = {
  setItem: (key: string, value: any) => {
    const jsonString = JSON.stringify(value);
    const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
    localStorage.setItem(key, encrypted);
  },

  getItem: (key: string) => {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedData) return null;
      
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error("Error decrypting data", error);
      return null;
    }
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
  }
};