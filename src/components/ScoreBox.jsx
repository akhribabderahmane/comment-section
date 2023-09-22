import React from 'react'
import {FaPlus,FaMinus} from 'react-icons/fa'
import { scoreAdded,scoreMined } from '../features/comments/commentsSlice'
import { useDispatch } from 'react-redux'
const ScoreBox = ({score,commentId,replyId,isComment}) => {
  const dispatch=useDispatch();
  const handleAddClick=()=>{
    dispatch(scoreAdded({commentID:commentId,replyID:replyId,isComment:isComment}))
  }
  const handleMinusClick=()=>{
    dispatch(scoreMined({commentID:commentId,replyID:replyId,isComment:isComment}))
  }
  return (
    <div className='flex flex-col bg-[#f5f6fa] w-7 py-2 px-6 rounded-lg text-xl gap-2  items-center justify-center'>
        <button className='text-[#c3c4ef] hover:text-[#5457b6] transition  h-1/3' onClick={handleAddClick}>
            <FaPlus />
        </button>
        <div className=' text-[#5457b6] font-[500] text-2xl pt-1'>
            {score}
        </div>
        <button className={`text-[#c3c4ef] ${score===0?'':'hover:text-[#5457b6]'} h-1/3 transition`} onClick={handleMinusClick} disabled={score===0}>
          <FaMinus />
        </button>
    </div>
  )
}

export default ScoreBox