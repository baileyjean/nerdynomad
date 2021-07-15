import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import CommentCard from '../components/CommentCard'
import CommentForm from '../components/CommentForm'

////////////////////////////// TO DO LIST ////////////////////////////////
// 1) Add RATINGS and COMMENTS
// 2) CONDITIONAL RENDERING: check userID against sciCenter's user_id
                          // if they match, then show the editing stuff
                          // if they do not match, show the OP profile link
////////////////////////////// TO DO LIST ////////////////////////////////

const SciCenter = (props) => {
  // STATE
  const { history, userID } = props
  const [sciCenter, setSciCenter] = useState({})
  const [comments, setComments] = useState([])
  const [editing, setEditing] = useState(false)
  const id = parseInt(props.match.params.scicenter_id)

  // FUNCTIONS & AXIOS CALLS
  const getSciCenterById = async () => {
    const res = await axios.get(`${BASE_URL}/scicenters/scicenter/${id}`)
    setSciCenter(res.data)
  }

  const deleteSciCenter = async () => {
    await axios.delete(`${BASE_URL}/scicenters/${id}`)
    history.push('/')
  }

  const sciCenterComments = async () => {
    const res = await axios.get(`${BASE_URL}/comments/scicenter/${id}`)
    setComments(res.data)
  }

  const handleDelete = async (comment_id) => {
    await axios.delete(`${BASE_URL}/comments/${comment_id}`)
    let currentComments = [...comments].filter((comment) => comment.id !== comment_id)
    setComments(currentComments)
  }

  const handleChange = (e, index) => {
    let currentComments = [...comments]
    let target = currentComments[index]
    target.post = e.target.value
    setComments(currentComments)
  }

  const editSciCenter = () => {
    if (editing) {
      setEditing(false)
    } else {
      setEditing(true)
    }
  }

  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////
  console.log(comments)
  //////////////////////// CONSOLE LOGS FOR TESTING - DELETE LATER ////////////////////////

  // ON LOAD
  useEffect(() => {
    getSciCenterById();
    sciCenterComments();
  }, [])


  
  
  if(parseInt(userID) === parseInt(sciCenter.user_id)) {
    return (
      <div className="sciCenter-page">
        <img src={sciCenter.image} />
        <h2>{sciCenter.name}</h2>
        <div className="details">
          <div>
            <p>Price Range: {sciCenter.priceRange}</p>
            <p>{sciCenter.description}</p>
            <p>{sciCenter.website}</p>
            <p>{sciCenter.street}, {sciCenter.city}, {sciCenter.state}, {sciCenter.zip}</p>
          </div>
        </div>
        {/* <div>
          <h4>COMMENTS</h4>
          {comments.map((comment) => (
            <div className="comment-box" id={comment.id}>
              <p>{comment.post}</p>
            </div>
          ))}
        </div> */}
        <div>
          <p><button onClick={editSciCenter} style={{ backgroundColor: 'green', margin: "1em", color: "white" }}>Edit Posting</button></p>
          <p>Did this Science Center close? Please update our database... <button onClick={() => deleteSciCenter} style={{ backgroundColor: 'maroon', margin: "1em", color: "white"  }}>Delete This Science Center</button></p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="sciCenter-page">
        <img src={sciCenter.image} />
        <h2>{sciCenter.name}</h2>
        <div className="details">
          <div>
            <p>Price Range: {sciCenter.priceRange}</p>
            <p>{sciCenter.description}</p>
            <p>{sciCenter.website}</p>
            <p>{sciCenter.street}, {sciCenter.city}, {sciCenter.state}, {sciCenter.zip}</p>
          </div>
          <div className="comments">
            {comments.map((comment, index) => (
              <div className="comments">
                <CommentCard
                  key={`${comment.user_id} ${index}`}
                  index={index}
                  text={comment.post}
                  user_id={comment.user_id}
                  scicenter_id={comment.scicenter_id}
                  userID={userID}
                  id={comment.id}
                  handleDelete={handleDelete}
                  handleChange={handleChange}
                />
              </div>
            ))}
            <CommentForm
              userID={userID}
              sciCenterID={id}
              sciCenterComments={sciCenterComments}
            />
          </div>
          {/* <div>
            <h4>COMMENTS</h4>
            {comments.map((comment) => (
              <div className="comment-box" id={comment.id}>
                <p>{comment.post}</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    )
  }
}

export default SciCenter