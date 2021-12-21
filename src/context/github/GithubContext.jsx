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

  // search users
  const searchUsers = async (text) => {
    setLoading()
    const params = new URLSearchParams({
      q: text,
    })
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token${GITHUB_TOKEN}`,
      },
    })

    // in response we get many fields, we just want items field so we will destructure it
    const { items } = await response.json()
    // here payload is the data we get from the api
    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  // not using this in our project .. it was only for testing and setup
  // const fetchUsers = async () => {
  //   setLoading()
  //   const response = await fetch(`${GITHUB_URL}/users`, {
  //     headers: {
  //       Authorization: `token${GITHUB_TOKEN}`,
  //     },
  //   })

  //   const data = await response.json()

  //   // here payload is the data we get from the api
  //   dispatch({
  //     type: 'GET_USERS',
  //     payload: data,
  //   })
  // }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        // fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
