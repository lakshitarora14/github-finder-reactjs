import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'
const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  }

  //dispatch is used to dispatch our action to our reducer same like setState
  const [state, dispatch] = useReducer(githubReducer, initialState)

  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    })
  }
  const fetchUsers = async () => {
    setLoading()
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token${GITHUB_TOKEN}`,
      },
    })

    const data = await response.json()

    // here payload is the data we get from the api
    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
