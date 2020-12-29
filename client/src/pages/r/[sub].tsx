import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, createRef, Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import classNames from "classnames";
import Axios from "axios";

import { useAuthState } from "../../context/auth";

import PostCard from "../../components/PostCard";
import { Post, Sub } from "../../types";
import SideBar from "../../components/SideBar";

export default function SubPage() {
  // Local State
  const [ownSub, setOwnSub] = useState<Boolean>(false);

  //Global State
  const { authenticated, user } = useAuthState();

  // Utils
  const router = useRouter();
  const fileInputRef = createRef<HTMLInputElement>();

  const subName = router.query.sub;

  const { data: sub, error, revalidate } = useSWR<Sub>(
    subName ? `/subs/${subName}` : null
  );

  useEffect(() => {
    if (!sub) return;

    setOwnSub(authenticated && user.username === sub.username);
  }, [sub]);

  const openFileInput = (type: string): void => {
    if (!ownSub) return;

    fileInputRef.current.name = type;
    fileInputRef.current.click();
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", fileInputRef.current.name);

    try {
      await Axios.post<Sub>(`/subs/${sub.name}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  if (error) router.push("/");

  let postMarkup;
  if (!sub) {
    postMarkup = <p className="text-lg text-center">Loading ...</p>;
  } else if (sub.posts.length === 0) {
    postMarkup = <p className="text-lg text-center">No posts submitted</p>;
  } else {
    postMarkup = (
      <div className="w-160">
        {sub?.posts.map((post: Post) => (
          <PostCard key={post.identifier} post={post} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{sub?.title}</title>
      </Head>
      {sub && (
        <Fragment>
          <input
            type="file"
            hidden={true}
            ref={fileInputRef}
            onChange={uploadImage}
          />
          {/* Sub info and Images */}
          <div className="">
            {/* Banner Image */}
            <div
              className={classNames("bg-blue-500", {
                "cursor-pointer": ownSub,
              })}
              onClick={() => openFileInput("banner")}>
              {sub.bannerUrl ? (
                <div
                  className="h-56 bg-blue-500"
                  style={{
                    backgroundImage: `url(${sub.bannerUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}></div>
              ) : (
                <div className="h-20 bg-blue-500"></div>
              )}
            </div>
            {/* Sub Meta */}
            <div className="h-20 bg-white">
              <div className="container relative flex">
                <div className="absolute -top-1/4">
                  <Image
                    src={sub.imageUrl}
                    alt="Sub"
                    className={classNames("rounded-full", {
                      "cursor-pointer": ownSub,
                    })}
                    onClick={() => openFileInput("image")}
                    width={70}
                    height={70}
                  />
                </div>
                <div className="pt-1 pl-24">
                  <div className="flex items-center">
                    <h1 className="mb-1 text-3xl font-bold">{sub.title}</h1>
                  </div>
                  <p className="text-sm font-bold text-gray-500">
                    /r/{sub.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Posts and sidebar */}
          <div className="container flex pt-5">
            <div className="w-160">{postMarkup}</div>
            <SideBar sub={sub} />
          </div>
        </Fragment>
      )}
    </div>
  );
}
