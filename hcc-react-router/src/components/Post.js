import React from 'react'

function Post(props) {
  console.log(props)
  console.log(props.match.params)
  const { match, location } = props
  return (
      <div>
        <h4>Post</h4>
        <h5>{match.params.id}</h5>
        {location.state && <h4>{location.state.title}</h4>}
      </div>
  )
}

export default Post
