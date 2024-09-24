import { useEffect, useState } from 'react';

const TOKEN_KEY = 'token';
const EXPIRATION_KEY = 'tokenExpiration';
const ID_KEY = 'userId';
const TYPE_KEY = 'type';

export function useToken(): [string | null, (token: string, expiration: Date, userId: number, type: string) => void, () => void] {
  const [token, setTokenState] = useState<string | null>(null);
  const [expiration, setExpiration] = useState<Date | null>(null);
  const [, setIdUsuario] = useState<number | null>(null);
  const [, setTipoUsuario] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem(TOKEN_KEY);
    const storedExpiration = sessionStorage.getItem(EXPIRATION_KEY);
    const storedIdUsuario = sessionStorage.getItem(ID_KEY);
    const storedtype  = sessionStorage.getItem(TYPE_KEY);

    if (storedToken && storedExpiration && storedIdUsuario && storedtype) {
      const expirationTime = new Date(storedExpiration);
      if (expirationTime > new Date()) {
        setTokenState(storedToken);
        setExpiration(expirationTime);
        setIdUsuario(parseInt(storedIdUsuario));
        setTipoUsuario(storedtype);
      } else {
        removeToken();
      }
    }
  }, []);

  const setToken = (token: string, expiration: Date, idUsuario: number, type: string) => {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(EXPIRATION_KEY, expiration.toISOString());
    sessionStorage.setItem(ID_KEY, idUsuario.toString());
    sessionStorage.setItem(TYPE_KEY, type);
    setTokenState(token);
    setExpiration(expiration);
    setIdUsuario(idUsuario);
  };

  const removeToken = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(EXPIRATION_KEY);
    sessionStorage.removeItem(ID_KEY);
    sessionStorage.removeItem(TYPE_KEY);
    setTokenState(null);
    setExpiration(null);
    setIdUsuario(null);
    setTipoUsuario(null);
  };

  useEffect(() => {
    const checkExpirationInterval = setInterval(() => {
      if (expiration && expiration <= new Date()) {
        removeToken();
      }
    }, 1000);

    return () => clearInterval(checkExpirationInterval);
  }, [expiration]);

  return [token, setToken, removeToken];
}
