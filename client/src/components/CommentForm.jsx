import { React, useState } from 'react'
import { Textarea, Button } from 'react-rainbow-components'
import axios from 'axios'
import { BASE_URL } from '../globals'

const CommentForm = (props) => {
  const { id, userID, sciCenterComments } = props
  const [comment, setComment] = useState('')

  const handleSubmit = async () => {
    await axios.post(`${BASE_URL}/comments`, {
      user_id: userID,
      scicenter_id: id,
      post: comment
    })
    sciCenterComments()
  }

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  return (
    <div>
      <form>
        <Textarea
          label="Comment"
          rows={4}
          onChange={handleChange}
          maxLength={255}
          placeholder="Comment"
        />
        <Button label="Submit" variant="border" onClick={handleSubmit} />
      </form>
    </div>
  )
}
export default CommentForm