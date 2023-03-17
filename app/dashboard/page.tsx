import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import MyPosts from "@/components/MyPosts";

export const metadata = {
  title: "Post it - Dashboard",
  description: "The Dashboard Page",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main>
      <div className="md:w-3/5 w-4/5 h-auto mx-auto">
        <div className="w-full h-[10rem] flex items-center my-5 p-8 bg-white rounded-md border-[0.1rem] border-gray-300">
          <h1 className="text-lg font-[700]">
            Welcome back <span>{session?.user?.name}</span>
          </h1>
        </div>

        <MyPosts />
      </div>
    </main>
  );
}
