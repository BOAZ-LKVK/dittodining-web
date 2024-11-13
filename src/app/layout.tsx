import type { Metadata } from "next";
import "@/app/globals.css";
import ReactQueryProvider from "@/components/query-client-provider";
import Script from "next/script";
import { KAKAO_MAP_APP_KEY } from "@/constants";

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
      <body className="max-w-md">
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />

        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
