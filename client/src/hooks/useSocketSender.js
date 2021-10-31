import { useDispatch, useSelector } from 'react-redux';
import userAC from '../redux/actionCreators/userAC';

async function wrapper(user, fetchCb, onSuccess, onFailure, updateCredCb, logoutCb) {
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
    onFailure(response.status);
  }
};

function useSocketSender() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return ({ fetchCb, onSuccess, onFailure }) => {
    wrapper(
      user,
      fetchCb,
      onSuccess,
      onFailure,
      (tokens) => dispatch(userAC.resetTokens(tokens)),
      () => alert('выкинуть пользователя')
    );
  };
}

export default useSocketSender;