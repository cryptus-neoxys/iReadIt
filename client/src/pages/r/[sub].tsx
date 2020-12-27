import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import useSWR from "swr";

import PostCard from "../../components/PostCard";
import { Post } from "../../types";

export default function Sub() {
  const router = useRouter();

  const subName = router.query.sub;

  const { data: sub, error } = useSWR(subName ? `/subs/${subName}` : null);

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
            <div className="bg-blue-500"></div>
          </div>
          {/* Posts and sidebar */}
          <div className="container flex pt-5">{postMarkup}</div>
        </Fragment>
      )}
    </div>
  );
}
