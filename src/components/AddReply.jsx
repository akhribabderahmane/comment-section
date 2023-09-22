import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../features/currentUser/currentUserSlice";
import { replyAdded } from "../features/comments/commentsSlice";

const AddReply = ({ isComment, setShowReply,commentID,replyID }) => {
  const [content, setContent] = useState("");
  const currentUser = useSelector(selectCurrentUser);
  const dispatch=useDispatch()
  const  handleReplyAdded=()=>{
     const username=currentUser.username;
     const userImage=currentUser.image.png;
     const replyId=replyID;
     const commentId=commentID;
     const isToComment=isComment;
    dispatch(replyAdded({isToComment,commentId,replyId,userImage,content,username}))
    setShowReply(false)
  }
  return (
    <div className="w-full flex flex-row bg-white rounded-md  py-4 px-4 gap-6 mt-4">
      <div className="mt-2">
        <img className="w-12" src={currentUser.image.png} alt="" />
      </div>
      <div>
        <form className="flex flex-row gap-4" action="">
          <div className={`${isComment ? "w-[380px]" : "w-[300px]"}`}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add reply ..."
              className={` px-2 py-2 text-gray-600 outline-none h-[100px] w-full resize-none border-[0.5px] border-gray-500 rounded-lg`}
              name="comment"
              id="comment"
            ></textarea>
          </div>
          <div className=" space-y-2 flex flex-col gap-1">
            <button
              disabled={content === ""}
              className={`py-2 px-6 text-lg rounded-md bg-[#5457b6] ${
                content === "" ? "opacity-60" : ""
              } text-white `}
              onClick={handleReplyAdded}
            >
              Reply
            </button>
            <button
              onClick={() => setShowReply(false)}
              className={`py-2 px-6 text-lg rounded-md bg-red-500  text-white `}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReply;
