import { createContext, useContext } from 'react';

const authContext = createContext();

function AuthProvider({ children }) {

  return (
    <authContext.Provider value={{}}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
export const useAuth = () => useContext(authContext);