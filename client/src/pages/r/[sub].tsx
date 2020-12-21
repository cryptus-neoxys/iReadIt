import { useRouter } from "next/router";
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

  return <div className="container flex pt-5">{postMarkup}</div>;
}
