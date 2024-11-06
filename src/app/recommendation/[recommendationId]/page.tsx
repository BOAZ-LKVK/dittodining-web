'use client';

import { KakaoMapLink } from "@/components/kakao-map-link";
import { RestaurantRecommendation } from "@/components/recommendation/recommendation";
import { useRecommendationDetailPage } from "@/hooks/use-recommendation-detail-page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type RecommendationDetailPageProps = {
  params: {
    recommendationId: number;
  }
}

export default function RecommendationDetailPage({ params }: RecommendationDetailPageProps) {
  const { recommendationId } = params;
  const { recommendation, isLoading, isError } = useRecommendationDetailPage({ recommendationId });

  const router = useRouter();

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (isLoading && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다. 잠시후 다시 시도해주세요.</div>;
  }

  if (recommendation === null) {
    return <div>음식점 추천 데이터를 불러오는 중 에러가 발생했습니다.</div>;
  }

  return (
    <div className="flex flex-col h-dvh items-center">
      <header className="w-full p-4 flex justify-between items-center bg-white">
        <button onClick={() => router.back()}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.78125 11.25L11.7813 18.25L10 20L0 10L10 0L11.7813 1.75L4.78125 8.75H20V11.25H4.78125Z" fill="#1D1B20" />
          </svg>
        </button>
      </header>

      <div className="flex flex-col flex-grow max-w-md w-full">
        <div className="flex-1 w-full h-full">
          <main className="flex flex-col w-full p-4">
            <RestaurantRecommendation restaurantRecommendation={recommendation} />
          </main>
        </div>
        <div className="flex-2">
          <button
            className="w-full py-3 bg-orange-600 text-white text-lg rounded-b-lg shadow"
          >
            <KakaoMapLink
              placeName={recommendation.restaurant.name}
              latitude={recommendation.restaurant.location.latitude}
              longitude={recommendation.restaurant.location.longitude}
              userLocation={userLocation}
            />
          </button>
        </div>
      </div>
    </div >
  );
}
