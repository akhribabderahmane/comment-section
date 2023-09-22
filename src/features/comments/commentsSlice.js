import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import userImage from "./../../assets/images/avatars/image-juliusomo.png";
import girlImage from "./../../assets/images/avatars/image-amyrobson.png";
import maxbalgnImage from "./../../assets/images/avatars/image-maxblagun.png";
import ramsesmironImage from "./../../assets/images/avatars/image-ramsesmiron.png";
const initialState = [
  {
    id: 1,
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: "1 month ago",
    score: 12,
    user: {
      image: {
        png: girlImage,
        webp: "./../assets/images/avatars/image-amyrobson.webp",
      },
      username: "amyrobson",
    },
    replies: [],
  },
  {
    id: 2,
    content:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    createdAt: "2 weeks ago",
    score: 5,
    user: {
      image: {
        png: maxbalgnImage,
        webp: "./../assets/images/avatars/image-maxblagun.webp",
      },
      username: "maxblagun",
    },
    replies: [
      {
        id: 3,
        content:
          "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        createdAt: "1 week ago",
        score: 4,
        replyingTo: "maxblagun",
        user: {
          image: {
            png: ramsesmironImage,
            webp: "./../assets/images/avatars/image-ramsesmiron.webp",
          },
          username: "ramsesmiron",
        },
      },
      {
        id: 4,
        content:
          "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        createdAt: "2 days ago",
        score: 2,
        replyingTo: "ramsesmiron",
        user: {
          image: {
            png: userImage,
            webp: "./../assets/images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        },
      },
    ],
  },
];

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(userImage, content, username) {
        return {
          payload: {
            id: nanoid(),
            content: content,
            createdAt: new Date().toDateString(),
            score: 0,
            user: {
              image: {
                png: userImage,
                webp: userImage,
              },
              username: username,
            },
            replies: [],
          },
        };
      },
    },
    scoreAdded:(state,action)=>{
      const {commentID,replyID,isComment}=action.payload;
      let existingPost;
      if(isComment){
        existingPost=state.find((comment)=> comment.id===commentID);
        if(existingPost){
          existingPost.score++;
        }
      } else{
        const commentPost=state.find((comment)=> comment.id===commentID)
        if(commentPost){
          existingPost=commentPost.replies.find((reply)=> reply.id===replyID);
          existingPost.score++;
        }
      }
    },
    scoreMined:(state,action)=>{
      const {commentID,replyID,isComment}=action.payload;
      let existingPost;
      if(isComment){
        existingPost=state.find((comment)=> comment.id===commentID);
        if(existingPost){
          existingPost.score--;
        }
      } else{
        const commentPost=state.find((comment)=> comment.id===commentID)
        if(commentPost){
          existingPost=commentPost.replies.find((reply)=> reply.id===replyID);
          existingPost.score--;
        }
      }
    },
    replyAdded:(state,action)=>{
        const {isToComment,commentId,replyId,userImage,content,username}=action.payload;
         let newReply= {
          id:nanoid(),
          content:content,
          createdAt:new Date().toDateString(),
          score:0,
          replyingTo: "",
          user: {
            image: {
              png: userImage,
              webp: userImage,
            },
            username: username,
          },
        }
        let existingPost;
        if(isToComment){
           existingPost=state.find((comment)=> comment.id===commentId)
           newReply.replyingTo=existingPost.user.username;
           console.log(newReply);
           console.log(existingPost.replies)
           existingPost.replies.push(newReply);
           console.log(existingPost.replies)
        }else{
          const existingPost=state.find((comment)=> comment.id===commentId)
          const commentReplied=existingPost.replies.find((reply)=>reply.id===replyId);
          newReply.replyingTo=commentReplied.user.username;
          existingPost.replies.push(newReply);
        }
    },
    commentDeleted:(state,action)=>{
      const {isComment,commentID,replyID}=action.payload;
      if(isComment){
         return state.filter((comment) => comment.id !== commentID);
      }else{
        const existingPost=state.find(comment => commentID===comment.id)
        const repliesFiltred=existingPost.replies.filter(reply=> reply.id!== replyID)
        existingPost.replies=repliesFiltred;
      }
    },
    commentUpdated:(state,action)=>{
      const {isComment,commentID,replyID,content}=action.payload;
      if(isComment){
          const existingPost=state.find((comment)=> comment.id===commentID);
          existingPost.content=content;
      }else{
        const existingPost=state.find((comment)=> comment.id===commentID);
        const existingReply=existingPost.replies.find((reply)=>reply.id===replyID);
        existingReply.content=content;
      }
    }
  },
});
export const { commentAdded,scoreAdded,scoreMined,replyAdded,commentDeleted,commentUpdated} = commentsSlice.actions;
export const selectAllComments = (state) => state.comments;
export default commentsSlice.reducer;
