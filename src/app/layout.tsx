import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "디토다이닝",
  description: "나도 좋아할 음식점 추천 - 디토다이닝",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen flex flex-col items-center">
          <main className="flex-1 w-full pw-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
