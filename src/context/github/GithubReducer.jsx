const githubReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        // this is doning same thing as default case
        // but here we are manually defining object and then spread across the sate and then updating values
        ...state,
        users: action.payload,
        loading: false,
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'CLEAR_USERS':
      return {
        ...state,
        users: [],
      }
    case 'GET_USER_AND_REPOS':
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      }
    default:
      return state
  }
}

export default githubReducer
