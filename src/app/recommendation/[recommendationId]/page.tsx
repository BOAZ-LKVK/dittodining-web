'use client';

import { ArrowLeftIcon } from "@/assets/icons/ArrowLeftIcon";
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
          <ArrowLeftIcon />
        </button>
      </header>

      <main className="flex flex-col flex-grow w-full max-w-md overflow-auto scrollbar-hide">
        <div className="felx-1 p-4 flex-grow overflow-auto scrollbar-hide">
          <RestaurantRecommendation restaurantRecommendation={recommendation} />
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
      </main>
    </div >
  );
}
