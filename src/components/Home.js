import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { withFireBase } from '../Firebase'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

const useFetchDataHook = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchData = async url => {
    setIsError(false)
    setIsLoading(true)

    try {
      const result = await axios(url)
      setData(result.data)
    } catch (error) {
      setIsError(true)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchData(initialUrl)
  }, [initialUrl])

  return { data, isLoading, isError, fetchData }
}

function _Home({ firebase, history }) {
  const [query, setQuery] = useState('redux')
  const { data, isLoading, isError, fetchData } = useFetchDataHook(
    'https://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] }
  )
  if (!firebase.getCurrentUsername()) {
    history.replace('/signin')
    return null
  }
  return (
    <>
      <form
        onSubmit={event => {
          fetchData(`https://hn.algolia.com/api/v1/search?query=${query}`)
          event.preventDefault()
        }}>
        <input
          type='text'
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type='submit'>Search</button>
      </form>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

const Home = compose(
  withRouter,
  withFireBase
)(_Home)

export default withFireBase(Home)
