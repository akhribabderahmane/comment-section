import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/currentUser/currentUserSlice";

const TopBar = ({ user, createdAt, onShowAddReply,onDeleteComment,onHandleEdit}) => {
  const currentUser = useSelector(selectCurrentUser);
  const ReplyIcon = (
    <svg
      className=" scale-125"
      width="14"
      height="13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
        fill="#5357B6"
      />
    </svg>
  );
  const EditIcon = (
    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
        fill="#5357B6"
      />
    </svg>
  );
  const DeleteIcon = (
    <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
        fill="#ED6368"
      />
    </svg>
  );
  return (
    <div className=" flex flex-row justify-between w-full px-2">
      <div className=" flex flex-row gap-4 items-center">
        <div>
          <img
            className="min-w-[30px] max-w-[32px] aspect-square"
            src={user.image.png}
            alt={`image of ${user.username}`}
          />
        </div>
        <div className=" font-[500] text-[#324152] ">
          <p>{user.username}</p>
        </div>
        {user.username === currentUser.username && (
          <div className="px-2 text-white bg-[#5457b6]">You</div>
        )}
        <div className=" max-w-[80px] text-sm text-[#67727e]">
          <p>{createdAt}</p>
        </div>
      </div>
      <div className="">
        {user.username !== currentUser.username && (
          <button
            onClick={onShowAddReply}
            className=" flex flex-row gap-1 items-center hover:opacity-60 transition"
          >
            {ReplyIcon}
            <p className=" text-[#5457b6] font-[500] text-lg">Reply</p>{" "}
          </button>
        )}
        {user.username === currentUser.username && (
          <div className=" flex flex-row gap-3">
            <button onClick={onDeleteComment} className=" flex flex-row gap-1 items-center hover:opacity-60 transition">
              {DeleteIcon}
              <p className=" text-red-600 font-[500] text-lg">Delete</p>{" "}
            </button>
            <button className=" flex flex-row gap-1 items-center hover:opacity-60 transition">
              {EditIcon}
              <p onClick={onHandleEdit} className=" text-[#5457b6] font-[500] text-lg">Edit</p>{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
