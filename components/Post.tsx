"use client";

import Image from "next/image";
import Link from "next/link";

type PostProps = {
  avatar: string;
  name: string;
  postTitle: string;
  id: string;
  comment?: {}[];
};

export default function Post({
  avatar,
  name,
  postTitle,
  id,
  comment,
}: PostProps) {
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex item-center gap-2">
        <Image
          width={32}
          height={32}
          src={avatar}
          alt={name}
          className="rounded-full overflow-hidden"
        />
        <h3 className="font-[700] text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>

      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-[700] text-gray-700">
            {comment?.length} Comments
          </p>
        </Link>
      </div>
    </div>
  );
}
