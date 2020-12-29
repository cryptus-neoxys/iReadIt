import dayjs from "dayjs";

import { Sub } from "../types";
import { useAuthState } from "../context/auth";
import Link from "next/link";

export default function SideBar({ sub }: { sub: Sub }) {
  const { authenticated } = useAuthState();
  return (
    <div className="ml-6 w-80">
      <div className="bg-white rounded">
        <div className="p-3 bg-blue-500 rounded-t">
          <p className="font-semibold text-white">About Community</p>
        </div>
        <div className="p-3">
          <p className="mb-3">{sub.description}</p>
          <div className="flex mb-3 text-xs font-medium">
            <div className="w-1/2">
              <p>5.2K</p>
              <p>Members</p>
            </div>
            <div className="w-1/2">
              <p>170</p>
              <p>Online</p>
            </div>
          </div>
          <p className="my-3">
            <i className="mr-2 fas fa-birthday-cake"></i>
            Created {dayjs(sub.createdAt).format("D MMM YYYY")}
          </p>
          {authenticated && (
            <Link href={`/r/${sub.name}/submit`}>
              <a className="w-full py-1 text-sm blue button">Create Post</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
