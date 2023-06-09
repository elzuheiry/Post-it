"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID: string;

  // Create a Post
  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError)
          toast.error(error?.response?.data.message, { id: toastPostID });

        setIsDisabled(false);
      },
      onSuccess: (data) => {
        toast.success("Post has been made .", { id: toastPostID });
        queryClient.invalidateQueries(["getPosts"]);
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading("Creating your post", { id: toastPostID });
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form
      onSubmit={submitPost}
      className="bg-white my-8 p-8 rounded-md border-slate-300 border-[0.1rem]"
    >
      <div className="flex flex-col my-4">
        <textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind?"
          className="p-4 text-lg rounded-md my-2 bg-[#f1f1f1]"
        ></textarea>
      </div>

      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-[700] text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          type="submit"
          className="text-sm bg-teal-600 text-white py-3 px-6 rounded-md disabled:opacity-25"
        >
          Create a Post
        </button>
      </div>
    </form>
  );
}
