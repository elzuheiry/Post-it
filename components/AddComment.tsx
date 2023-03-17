"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

type PostType = {
  id?: string;
};

type comment = {
  postId?: string;
  title: string;
};

export default function AddComment({ id }: PostType) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToastID: string;

  const { mutate } = useMutation(
    async (data: comment) => axios.post("/api/posts/addComment", { data }),
    {
      onSuccess: (data) => {
        setTitle("");
        setIsDisabled(false);
        queryClient.invalidateQueries(["detail-post"]);
        toast.success("Added your comment", { id: commentToastID });
      },
      onError: (error) => {
        setIsDisabled(false);
        if (error instanceof AxiosError)
          toast.error(error?.response?.data.message, { id: commentToastID });
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    commentToastID = toast.loading("Adding your comment", {
      id: commentToastID,
    });
    mutate({ title, postId: id });
  };

  return (
    <form onSubmit={submitComment} className="my-8">
      <h3>Add a comment</h3>

      <div className="flex flex-col my-2">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-4 text-lg rounded-md my-2"
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          disabled={isDisabled}
          type="submit"
          className="text-sm bg-teal-600 text-white py-3 px-6 rounded-md disabled:opacity-25"
        >
          Add a Comment
        </button>

        <p
          className={`font-[700] text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
      </div>
    </form>
  );
}
