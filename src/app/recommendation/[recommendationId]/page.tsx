'use client';

import { Header } from "@/components/header";
import { RestaurantRecommendation } from "@/components/recommendation/recommendation";
import { useRecommendationDetailPage } from "@/hooks/use-recommendation-detail-page";

type RecommendationDetailPageProps = {
  params: {
    recommendationId: number;
  }
}

export default function RecommendationDetailPage({ params }: RecommendationDetailPageProps) {
  const { recommendationId } = params;
  const { recommendation, isLoading, isError } = useRecommendationDetailPage({ recommendationId });

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
    <div>
      <div className="flex flex-col items-center">
        <Header />
        <main className="flex flex-col w-full max-w-md p-4">
          <RestaurantRecommendation restaurantRecommendation={recommendation} />
        </main>
      </div>
    </div>
  );
}