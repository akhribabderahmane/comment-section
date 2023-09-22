import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/currentUser/currentUserSlice'
import { commentAdded } from '../features/comments/commentsSlice'
const AddCommentForm = () => {
  const currentUser=useSelector(selectCurrentUser)
  const dispatch=useDispatch()
  const [content,setContent]=useState('')
  const onAddComment=()=>{
    const userImage=currentUser.image.png; 
    const username=currentUser.username;
    dispatch(commentAdded(userImage,content,username))
    setContent('');
  }
  return (
    <div className='flex flex-row bg-white rounded-md w-[600px] py-4 px-4 gap-6 mt-4'>
      <div className='mt-2'>
        <img className='w-12' src={currentUser.image.png} alt="" />
      </div>
      <div>
        <form className='flex flex-row gap-4' action="">
          <div>
            <textarea value={content} onChange={(e)=> setContent(e.target.value)} placeholder='Add comment ...' className=' px-2 py-2 text-gray-600 outline-none h-[100px] w-[380px] resize-none border-[0.5px] border-gray-500 rounded-lg' name="comment" id="comment" ></textarea>
          </div>
          <div>
            <button onClick={onAddComment} disabled={content===''} className={`py-2 px-6 text-lg rounded-md bg-[#5457b6] ${content===''?'opacity-60':''} text-white `}>Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCommentForm