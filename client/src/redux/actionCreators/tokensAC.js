import { LOAD_TOKENS } from '../types/tokens.type';

export const loadTokens = (tokens) =>({
    type: LOAD_TOKENS,
    payload: tokens
  });

