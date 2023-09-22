import React, { useState } from "react";
import ScoreBox from "./ScoreBox";
import TopBar from "./TopBar";
import ReplyBox from "./ReplyBox";
import AddReply from "./AddReply";
import { useDispatch } from "react-redux";
import { commentDeleted,commentUpdated } from "../features/comments/commentsSlice";

const Comment = ({ comment }) => {
  const [content,setContent]=useState(comment.content)
  const [showReply, setShowReply] = useState(false);
  const dispatch = useDispatch();
  const onShowAddReply = () => {
    setShowReply(!showReply);
  };
  const onDeleteComment = () => {
    dispatch(
      commentDeleted({ isComment: true, commentID: comment.id, replyID: 0 })
    );
  };
  const renderReplies = comment.replies.map((reply) => {
    return <ReplyBox key={reply.id} reply={reply} commentIdent={comment.id} />;
  });
  const [showEditForm, setShowEditForm] = useState(false);
  const onHandleEdit = () => {
    setShowEditForm(true)
  };
  const onHandlechange=(e)=>{
    setContent(e.target.value)
  }
  const onHandleUpdate=()=>{
       dispatch(commentUpdated({isComment:true,commentID:comment.id,replyID:0,content:content}))
       setShowEditForm(false);
  }
  return (
    <section className="w-[600px]">
      <div className=" flex flex-row  px-4 py-4 bg-white gap-4  rounded-md">
        <div className="">
          <ScoreBox
            score={comment.score}
            commentId={comment.id}
            isComment={true}
          />
        </div>
        <div className=" flex flex-col w-full">
          <div className="">
            <TopBar
              user={comment.user}
              createdAt={comment.createdAt}
              onShowAddReply={onShowAddReply}
              onDeleteComment={onDeleteComment}
              onHandleEdit={onHandleEdit}
            />
          </div>
          {!showEditForm && (
            <div className="conetnt-box px-2 pr-4 py-4 text-[#67727e] ">
              {comment.content}
            </div>
          )}
          {showEditForm && (
            <div className="conetnt-box px-2 pr-4 pt-4 text-[#67727e] ">
              <form className="flex flex-row gap-2 w-full" action="">
                <textarea  onChange={(e)=> onHandlechange(e)} value={content} className="w-11/12 no-scrollbar h-[100px] px-2 py-2 text-gray-600 outline-none resize-none border-[0.5px] border-gray-500 rounded-lg" name="edit"></textarea>
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
          isComment={true}
          commentID={comment.id}
          setShowReply={setShowReply}
        ></AddReply>
      )}
      {/* replies */}
      {comment.replies.length !== 0 && (
        <div className="flex flex-row w-full">
          <div className=" py-2 px-10 flex justify-center">
            <div className=" w-[1px]  my-4 bg-slate-300"></div>
          </div>
          <div className=" my-4 ">
            <div className="space-y-4">{renderReplies}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Comment;
