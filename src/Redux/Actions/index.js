export const REQUEST_API = 'REQUEST_API';
export const CHANGE_INPUT = 'CHANGE_INPUT';
export const REDIRECT = 'REDIRECT';

export const requestApiAct = () => ({ type: REQUEST_API });

export const changeInputAct = ({ name, value }) => ({ type: CHANGE_INPUT, name, value });

export const redirectAct = () => ({ type: REDIRECT });
