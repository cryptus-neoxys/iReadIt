import Axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { GetServerSideProps } from "next";

import { Post } from "../types";
import PostCard from "../components/PostCard";

dayjs.extend(relativeTime);

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    Axios.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="pt-12">
      <Head>
        <title>iReadit: The front page of the internet</title>
      </Head>
      <div className="container flex pt-4">
        <div className="w-160">
          {/* Post Feed */}
          {posts.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>
        {/* SideBar */}
        <div>SideBar</div>
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await Axios.get("/posts");

//     return { props: { posts: res.data } };
//   } catch (err) {
//     return { props: { error: "Something went wrong" } };
//   }
// };
