import { React, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { Textarea } from 'react-rainbow-components'

const CommentCard = (props) => {
  //////////////////////// STATE ////////////////////////
  const [editing, setEditing] = useState(false)

  //////////////////////// AXIOS CALLS & FUNCTIONS ////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`${BASE_URL}/comments/${props.id}`, {
      user_id: props.user_id,
      scicenter_id: props.scicenter_id,
      post: props.text
    })
    editComment()
  }
  const editComment = () => {
    if (editing) {
      setEditing(false)
    } else {
      setEditing(true)
    }
  }

  if (editing) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <form onSubmit={handleSubmit}>
            <Textarea
              type="text"
              value={props.text}
              onChange={(e) => props.handleChange(e, props.index)}
              rows={3}
              className="no-margin"
            />
            <button>Submit</button>
          </form>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Textarea
        type="text"
        value={props.text}
        rows={3}
        readOnly={true}
      />
      <div
        style={{ display: `${props.user_id === props.userID ? 'flex' : 'none'}` }}
      >
        <button onClick={editComment}>Edit</button>
        <button onClick={() => props.handleDelete(props.id)}>delete</button>
      </div>
    </div>
  )
}
export default CommentCard