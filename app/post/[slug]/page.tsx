"use client";

import AddComment from "@/components/AddComment";
import Loading from "@/components/Loading";
import Post from "@/components/Post";
import { PostType } from "@/types/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetails(url: URL) {
  const { data, isLoading } = useQuery({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return <Loading />;

  return (
    <main>
      <div className="md:w-3/5 w-4/5 h-auto mx-auto">
        <Post
          id={data.id}
          name={data.author.name}
          avatar={data.author.image}
          postTitle={data.title}
          comment={data.comment}
        />

        <AddComment id={data?.id} />

        {data?.comment?.map((comment) => (
          <div key={comment.id} className="my-4 bg-white py-4 px-8 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  width={32}
                  height={32}
                  src={comment.author.image}
                  alt=""
                  className="overflow-hidden rounded-full"
                />

                <h3 className="text-sm font-[700] text-gray-700">
                  {comment.author.name}
                </h3>
              </div>
              <div>
                <h3 className="text-sm font-[700] text-gray-700">
                  {comment.createdAt}
                </h3>
              </div>
            </div>

            <div className="my-2">
              <p className="break-all">{comment.message}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
