export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        inProgress: false,
        isLoggedIn: !action.error,
        errors: action.error ? action.payload.errors : null
      };
    case 'MS_LOGIN':
      return {
        ...state,
        inProgress: false,
        isLoggedIn: !action.error,
        errors: action.error ? action.payload.errors : null
      };
    case 'LOGIN_PAGE_UNLOADED':
    case 'REGISTER_PAGE_UNLOADED':
      return {};
    case 'ASYNC_START':
      if (action.subtype === 'LOGIN' || action.subtype === 'REGISTER') {
        return { ...state, inProgress: true };
      }
      return state;
    case 'UPDATE_FIELD_AUTH':
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};
