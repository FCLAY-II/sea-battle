import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userAC from '../redux/actionCreators/userAC';

const AuthContext = createContext();

function AuthProvider({ children }) {

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (!isAuth) {
      fetch('http://localhost:3001/api/tokens/refresh', {
        headers: { 'Authorization': `Bearer ${user.refreshToken}` }
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } 
        throw new Error('asgdfghjk');
      })
      .then(({ accessToken, refreshToken }) => {
        dispatch(userAC.updateTokens({ accessToken, refreshToken }));
        setIsAuth(true);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка на сервере');
        return setIsAuth(false);
      });
    }
  }, [user.refreshToken, dispatch]);

  return (
    <AuthContext.Provider value={{ isAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);