import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import QueryWrapper from "@/components/QueryWrapper";
import "@/app/globals.css";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "700", "900"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Post it",
  description: "What is in your mind",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${roboto.variable} bg-[#f1f1f1]`}>
        <SessionProvider session={session}>
          <QueryWrapper>
            {/* Header */}
            <Header />

            {/* Main Container */}
            <div className="min-w-screen min-h-screen">{children}</div>

            {/* Footer */}
            <Footer />
          </QueryWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
