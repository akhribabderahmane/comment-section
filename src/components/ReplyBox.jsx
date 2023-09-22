import React, { useState } from "react";
import TopBar from "./TopBar";
import ScoreBox from "./ScoreBox";
import AddReply from "./AddReply";
import { useDispatch } from "react-redux";
import { commentDeleted,commentUpdated } from "../features/comments/commentsSlice";

const ReplyBox = ({ reply, commentIdent }) => {
  const [content,setContent]=useState(reply.content)
  const [showReply, setShowReply] = useState(false);
  const dispatch = useDispatch();
  const onShowAddReply = () => {
    setShowReply(!showReply);
  };
  const onDeleteComment = () => {
    dispatch(
      commentDeleted({
        isComment: false,
        commentID: commentIdent,
        replyID: reply.id,
      })
    );
  };
  const [showEditForm, setShowEditForm] = useState(false);
  const onHandleEdit = () => {
    setShowEditForm(true)
  };
  const onHandlechange=(e)=>{
    setContent(e.target.value)
  }
  const onHandleUpdate=()=>{
       dispatch(commentUpdated({isComment:false,commentID:commentIdent,replyID:reply.id,content:content}))
       setShowEditForm(false);
  }
  return (
    <div>
      <div className=" flex flex-row  px-4 py-4 bg-white gap-4  rounded-md">
        <div className="">
          <ScoreBox
            score={reply.score}
            replyId={reply.id}
            commentId={commentIdent}
            isComment={false}
          />
        </div>
        <div className=" flex flex-col w-full">
          <div className="">
            <TopBar
              user={reply.user}
              createdAt={reply.createdAt}
              onShowAddReply={onShowAddReply}
              onDeleteComment={onDeleteComment}
              onHandleEdit={onHandleEdit}
            />
          </div>
          {!showEditForm && (<div className="conetnt-box px-2 pr-4 py-4 text-[#67727e] ">
            <p>
              <span className="text-[#5457b6] font-bold">
                {" "}
                {`@${reply.replyingTo}`}
              </span>{" "}
              {reply.content}
            </p>
          </div>)}
          {showEditForm && (
            <div className="conetnt-box px-2 pr-4 pt-4 text-[#67727e] ">
            <form className="flex flex-row gap-2 w-full" action="">
              <textarea onChange={(e)=> onHandlechange(e)}  value={content} className="w-11/12 no-scrollbar h-[100px] px-2 py-2 text-gray-600 outline-none resize-none border-[0.5px] border-gray-500 rounded-lg" name="edit"></textarea>
              <div className=" flex items-end">
              <button onClick={onHandleUpdate} className="py-2 px-4 text-base text-white rounded-md bg-[#5457b6]">UPDATE</button>
              </div>
            </form>
          </div>
          )}
        </div>
      </div>
      {showReply && (
        <AddReply
          isComment={false}
          commentID={commentIdent}
          replyID={reply.id}
          setShowReply={setShowReply}
        ></AddReply>
      )}
    </div>
  );
};

export default ReplyBox;
