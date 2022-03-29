const initialState = {
  loading: false,
  error: null,
  isUpdated: null,
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE_REQUEST':
      //   case UPDATE_PASSWORD_REQUEST:
      //   case UPDATE_USER_REQUEST:
      //   case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case 'UPDATE_PROFILE_SUCCESS':
      //   case UPDATE_PASSWORD_SUCCESS:
      //   case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      }

    //   case DELETE_USER_SUCCESS:
    //     return {
    //       ...state,
    //       loading: false,
    //       isDeleted: action.payload.success,
    //       message: action.payload.message,
    //     };
    case 'UPDATE_PROFILE_FAIL':
      //   case UPDATE_PASSWORD_FAIL:
      //   case UPDATE_USER_FAIL:
      //   case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'UPDATE_PROFILE_RESET':
      //   case UPDATE_PASSWORD_RESET:
      //   case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      }

    //   case DELETE_USER_RESET:
    //     return {
    //       ...state,
    //       isDeleted: false,
    //     };

    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}
