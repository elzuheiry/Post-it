"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Toggle from "@/components/Toggle";
import toast from "react-hot-toast";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    authorId: string;
  }[];
};

export default function EditPost({
  avatar,
  id,
  name,
  title,
  comments,
}: EditProps) {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  let deleteToastId: string;

  // Delete Post
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: id }),
    {
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting that post", { id: deleteToastId });
      },
      onSuccess: (data) => {
        toast.success("Post has been deleted.", { id: deleteToastId });
        queryClient.invalidateQueries(["auth-post"]);
      },
    }
  );

  const deletePost = () => {
    deleteToastId = toast.loading("Deleting your post.", { id: deleteToastId });
    mutate(id);
  };

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-3">
          <Image
            width={32}
            height={32}
            src={avatar}
            alt={name}
            className="overflow-hidden rounded-full"
          />
          <h3 className="text-sm font-[700] text-gray-700">{name}</h3>
        </div>

        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>

        <div className="flex item-center gap-4">
          <p className="text-sm font-[700] text-gray-700">
            {comments?.length} Comments
          </p>

          <button
            onClick={() => {
              setToggle(true);
            }}
            className="text-sm font-[700] text-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
