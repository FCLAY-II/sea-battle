import { EXIT_USER, LOG_USER, REG_USER } from "../types/user.types"

export const regUser = (user) => {
  return {
    type: REG_USER,
    payload: user
  }
}

export const regUserInDB = (user) => async (dispatch) => {
  console.log(user);
  const response = await fetch('http://localhost:3001/auth/signup', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
  })
  if (response.ok) {
    const activeUser = await response.json()
    dispatch(regUser(activeUser))
  }
}

export const logUser = (user) => {
  return {
    type: LOG_USER,
    payload: user
  }
}

export const logUserInDB = (user) => async (dispatch) => {
  console.log(user);
  const response = await fetch('http://localhost:3001/auth/signin', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user), 
  })
  if (response.ok) {
    const activeUser = await response.json()
    dispatch(regUser(activeUser))
  }
}

export const exitUser = () => {
  return {
    type: EXIT_USER
  }
}

export const exitUserInSession = () => async (dispatch) => {
  const response = await fetch('http://localhost:3001/auth/logout', {
    method: "GET", 
  })
  if (response.ok) {
    dispatch(exitUser())
  }
}
