import Link from "next/link";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import classNames from "classnames";

import { Post } from "../types";
import Axios from "axios";

dayjs.extend(relativeTime);

const ActionButton = ({ children }) => {
  return (
    <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
      {children}
    </div>
  );
};

interface PostCardProps {
  post: Post;
}

export default function PostCard({
  post: {
    identifier,
    slug,
    subName,
    voteScore,
    username,
    url,
    createdAt,
    title,
    body,
    commentCount,
    userVote,
  },
}: PostCardProps) {
  const vote = async (value: number) => {
    try {
      const res = await Axios.post("/misc/vote", {
        identifier,
        slug,
        value,
      });

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div key={identifier} className="flex mb-4 bg-white rounded">
      {/* Vote Section */}
      <div className="w-10 py-3 text-center bg-gray-100 rounded-l">
        {/* Upvote */}
        <div
          className="w-6 mx-auto text-gray-400 cursor-pointer hover:bg-gray-300 hover:text-red-500"
          onClick={() => vote(1)}>
          <i
            className={classNames("icon-arrow-up", {
              "text-red-500": userVote === 1,
            })}></i>
        </div>
        {/* Score */}
        <p className="text-xs font-bold text-center">{voteScore}</p>
        {/* Downvote */}
        <div
          className="w-6 mx-auto text-gray-400 cursor-pointer hover:bg-gray-300 hover:text-blue-600"
          onClick={() => vote(-1)}>
          <i
            className={classNames("icon-arrow-down", {
              "text-blue-600": userVote === -1,
            })}></i>
        </div>
      </div>
      {/* Post Data Section */}
      <div className="w-full p-2">
        <div className="flex items-center">
          <Link href={`/r/${subName}`}>
            <img
              className="w-6 h-6 mr-1 cursor-pointer"
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
              alt="avatar"
            />
          </Link>
          <Link href={`/r/${subName}`}>
            <a className="text-xs font-bold cursor-pointer hover:underline">
              {subName}
            </a>
          </Link>
          <p className="text-xs text-gray-500">
            <span className="mx-1">•</span>
            Posted by
            <Link href={`/u/${username}`}>
              <a className="mx-1 hover:underline">/u/user</a>
            </Link>
            <Link href={url}>
              <a className="mx-1 hover:underline">
                {dayjs(createdAt).fromNow()}
              </a>
            </Link>
          </p>
        </div>
        <Link href={url}>
          <a className="my-1 text-lg font-medium">{title}</a>
        </Link>
        {body && <p className="my-1 text-sm">{body}</p>}

        <div className="flex">
          <Link href={url}>
            <a>
              <ActionButton>
                <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                <span className="font-bold">{commentCount} Comments</span>
              </ActionButton>
            </a>
          </Link>
          <ActionButton>
            <i className="mr-1 fas fa-bookmark fa-xs"></i>
            <span className="font-bold">Bookmark</span>
          </ActionButton>
          <ActionButton>
            <i className="mr-1 fas fa-share fa-xs"></i>
            <span className="font-bold">Share</span>
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
