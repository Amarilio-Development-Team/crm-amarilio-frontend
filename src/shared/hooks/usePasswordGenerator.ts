import { useState, useCallback } from 'react';

interface PasswordOptions {
  length?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
}

const usePasswordGenerator = () => {
  const [password, setPassword] = useState<string>('');

  const generatePassword = useCallback((options: PasswordOptions = {}) => {
    const { length = 12, uppercase = true, lowercase = true, numbers = true, symbols = false } = options;

    let charset = '';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (!charset) {
      setPassword('');
      return '';
    }

    let newPassword = '';

    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      newPassword += charset[randomValues[i] % charset.length];
    }

    setPassword(newPassword);
    return newPassword;
  }, []);

  return { password, generatePassword };
};

export default usePasswordGenerator;
