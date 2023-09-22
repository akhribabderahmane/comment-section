import React from 'react'
import { useSelector } from 'react-redux'
import {selectAllComments} from './../features/comments/commentsSlice'
import Comment from './Comment'

const CommentsList = () => {
  const comments=useSelector(selectAllComments);
  console.log(comments)
  const renderComments=comments.map((comment)=>{
    return(
         <Comment comment={comment} key={comment.id}/>
    )
  })
  return (
    <div className='flex flex-col gap-6'>
      {renderComments}
    </div>
  )
}

export default CommentsList