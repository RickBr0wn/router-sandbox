import React, { useEffect, useState } from 'react'
import { withFireBase } from '../Firebase'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

function _Home({ firebase, history }) {
  const [data, setData] = useState([])

  useEffect(() => {
    let mounted = true
    async function fetchData() {
      await firebase
        .getAllDocuments()
        .then(response => mounted && setData(response))
        .catch(err => console.log('Error in useEffect', err))
    }
    fetchData()

    return () => {
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!firebase.getCurrentUsername()) {
    history.replace('/signin')
    return null
  }

  console.log(data)
  return data ? (
    <>
      <h2>Home</h2>
      <p>{data.length}</p>
      <ul>
        {data.map(doc => (
          <li>{doc.quote}</li>
        ))}
      </ul>
    </>
  ) : (
    <p>Loading..</p>
  )
}

const Home = compose(
  withRouter,
  withFireBase
)(_Home)

export default withFireBase(Home)
