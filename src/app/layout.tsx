import "./globals.css";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Random Bible Verse",
  description: "A Next.js + Tailwind CSS app that fetches random Bible verses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${merriweather.className} bg-gradient-to-b from-[#fff6da] to-[#ffeba7] text-neutral-800`}
      >
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow flex items-center justify-center p-4">
            {children}
          </main>
          <footer className="w-full bg-white bg-opacity-90 p-4 shadow-inner backdrop-blur-md mt-4">
      <div className="container mx-auto text-center">
        <p className="text-gray-700 text-sm sm:text-base">
          Built by{" "}
          <a
            href="https://github.com/itsmeenavi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            itsmeenavi
          </a>
        </p>
      </div>
    </footer>
        </div>
      </body>
    </html>
  );
}
