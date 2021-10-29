import { LOAD_TOKENS } from "../types/tokens.type"

export const loadTokens = (tokens) =>{
  return {
    type: LOAD_TOKENS,
    payload: tokens
  }
}

