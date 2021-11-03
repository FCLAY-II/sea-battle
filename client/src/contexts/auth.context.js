import { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userAC from '../redux/actionCreators/userAC';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.login) {
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
        dispatch(userAC.resetTokens({ accessToken, refreshToken }));
      })
      .catch((err) => {
        console.log(err);
        // alert('проверка токена прошла неудачно');
        dispatch(userAC.logout());
      });
    }
  }, [user.login]);

  return (
    <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
