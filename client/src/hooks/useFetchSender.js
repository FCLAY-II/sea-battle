import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userAC from '../redux/actionCreators/userAC';

async function wrapper(user, fetchCb, onSuccess, onFailure, updateCredCb, logoutCb) {
  console.log('from wrapper:', user.refreshToken);
  const response = await fetchCb(user.accessToken);
  if (response.ok) {
    const result = await response.json();
    onSuccess(result);
  } else if (response.status === 403) {
    const refResponse = await fetch('http://localhost:3001/api/tokens/refresh', {
      headers: { 'Authorization': `Bearer ${user.refreshToken}` }
    });
    if (refResponse.ok) {
      const { accessToken, refreshToken } = await refResponse.json();
      console.log({ accessToken, refreshToken });
      updateCredCb({ accessToken, refreshToken });

      // process the function again
      const secResponse = await fetchCb(accessToken);
      if (secResponse.ok) {
        const secResult = await secResponse.json();
        onSuccess(secResult);
      } else {
        onFailure(response.status); // TODO
      }
    } else {
      logoutCb();
    }
  } else {
    console.log(response.status);
    onFailure(response.status);
  }
};

function useFetchSender() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userRef = useRef(user); 
  
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  return async ({ fetchCb, onSuccess, onFailure }) => wrapper(
      userRef.current,
      fetchCb,
      onSuccess,
      onFailure,
      ({ accessToken, refreshToken }) => dispatch(userAC.resetTokens({ accessToken, refreshToken })),
      () => alert('выкинуть пользователя')
    );
}

export default useFetchSender;
