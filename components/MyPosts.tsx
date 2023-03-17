"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthPosts } from "@/types/AuthPosts";
import Loading from "@/components/Loading";
import EditPost from "@/components/EditPost";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

export default function Post() {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-post"],
  });
  if (isLoading) return <Loading />;
  console.log(data);

  return (
    <div>
      {data?.post?.map((post) => (
        <EditPost
          avatar={data.image}
          id={post.id}
          key={post.id}
          name={data.name}
          title={post.title}
          comments={post.comment}
        />
      ))}
    </div>
  );
}
