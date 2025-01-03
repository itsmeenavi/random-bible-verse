import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Random Bible Verse App",
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
        className={`${poppins.className} bg-gradient-to-r from-blue-400 to-purple-600`}
      >
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow flex items-center justify-center p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
