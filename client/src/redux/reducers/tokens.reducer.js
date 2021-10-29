import { CHECK_TOKENS, LOAD_TOKENS, REFRESH_TOKENS, REMOVE_TOKENS } from "../types/tokens.type";

function tokensReducer(state = null, action) {
  switch (action.type) {
    case LOAD_TOKENS:
    case REFRESH_TOKENS:
    case CHECK_TOKENS:
      return action.payload;
    case REMOVE_TOKENS:
      return null;
    default:
      return state

  }
}

export default tokensReducer
