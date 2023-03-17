import Link from "next/link";
import LoginButton from "@/components/LoginButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Logged from "@/components/Logged";
import DashboardLink from "@/components/DashboardLink";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="w-full h-[6rem] shadow-md">
      <div className="md:w-3/5 w-4/5 h-full mx-auto flex justify-between items-center">
        <div>
          <Link href={"/"}>
            <h1 className="lg:text-2xl md:text-lg sm:text-sm text-black font-[900] uppercase">
              Post it
            </h1>
          </Link>
        </div>

        <nav>
          <ul className="flex items-center gap-5">
            <li>
              <Link href={"/about"}>
                <h3 className="text-sm text-gray-700 font-[300] uppercase">
                  about
                </h3>
              </Link>
            </li>

            {!session?.user && <LoginButton />}
            {session?.user && (
              <>
                <Logged />
                <DashboardLink
                  name={session.user?.name || ""}
                  image={session.user?.image || ""}
                />
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
