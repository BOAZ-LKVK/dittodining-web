import type { Metadata } from "next";
import "@/app/globals.css";
import ReactQueryProvider from "@/components/query-client-provider";
import Script from "next/script";
import { HOST, KAKAO_MAP_APP_KEY } from "@/constants";


export const metadata: Metadata = {
  title: "디토다이닝",
  description: "나도 좋아할 음식점 추천 - 디토다이닝",
  keywords: ['음식점 추천', '맛집 추천', '레스토랑 리뷰', '지역 맛집', 'Ditto Dining'],
  alternates: {
    canonical: HOST,
  },
  openGraph: {
    type: 'website',
    title: 'Ditto Dining - 최고의 음식점 추천 플랫폼',
    description:
      'Ditto Dining은 최고의 음식점과 레스토랑을 추천하는 플랫폼입니다. 지역별 인기 맛집, 리뷰, 메뉴 정보를 한눈에 확인하세요.',
    url: `${HOST}`,
    images: [
      {
        url: `${HOST}/logo.png`,
        width: 400,
        height: 400,
        alt: 'Ditto Dining Preview Image',
      },
    ],
  },
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
