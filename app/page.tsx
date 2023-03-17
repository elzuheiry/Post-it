"use client";

import AddPost from "@/components/AddPost";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Post from "@/components/Post";
import { PostType } from "@/types/Posts";
import Loading from "@/components/Loading";

// Fetching all posts
const getPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: getPosts,
    queryKey: ["getPosts"],
  });
  if (error) return error;
  if (isLoading) return <Loading />;

  return (
    <main>
      <div className="md:w-3/5 w-4/5 h-auto mx-auto">
        <AddPost />

        {data?.map((post) => (
          <Post
            key={post.id}
            name={post.author.name}
            avatar={post.author.image}
            postTitle={post.title}
            id={post.id}
            comment={post.comment}
          />
        ))}
      </div>
    </main>
  );
}
