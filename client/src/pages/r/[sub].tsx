import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import useSWR from "swr";
import Image from "next/image";

import PostCard from "../../components/PostCard";
import { Post, Sub } from "../../types";

export default function SubPage() {
  const router = useRouter();

  const subName = router.query.sub;

  const { data: sub, error } = useSWR<Sub>(subName ? `/subs/${subName}` : null);

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
          {/* Sub info and Images */}
          <div className="">
            {/* Banner Image */}
            <div className="bg-blue-500">
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
                    className="rounded-full"
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
          <div className="container flex pt-5">{postMarkup}</div>
        </Fragment>
      )}
    </div>
  );
}
