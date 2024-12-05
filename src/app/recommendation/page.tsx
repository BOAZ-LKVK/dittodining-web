"use client";

import { InBoxArrowDownIcon } from "@/assets/icons/InBoxArrowDownIcon";
import { RefreshIcon } from "@/assets/icons/RefreshIcon";
import { Header } from "@/components/header";
import { RestaurantRecommendation } from "@/components/recommendation/recommendation";
import { useRestaurantRecommendationPage } from "@/hooks/use-restaurant-recommendation-page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RecommendationPage() {
  const { currentRestaurantRecommendation, recommendedRestaurants, selectedIds, handleSelect, isLoading } =
    useRestaurantRecommendationPage();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && recommendedRestaurants?.length === 0) {
      router.push("/result");
    }
  }, [isLoading, recommendedRestaurants, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // TODO: Error handling
  if (currentRestaurantRecommendation === undefined) {
    return <div>오류가 발생했습니다. 잠시후 다시 시도해주세요.</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center h-dvh">
        <Header />
        <main className="flex flex-col w-full max-w-md overflow-auto scrollbar-hide">
          <div className="px-8 py-4 flex-grow overflow-auto scrollbar-hide">
            <RestaurantRecommendation restaurantRecommendation={currentRestaurantRecommendation} />
          </div>

          <div className="w-full flex mx-auto max-w-md bg-secondary h-28 text-white font-bold">
            <div className="flex-1">
              <button
                className="flex-col w-full h-full py-6 text-center items-center justify-center"
                onClick={() => handleSelect(false)}
              >
                <div className="flex flex-1 items-center justify-center mb-1">
                  <RefreshIcon />
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <div className="text-xl">
                    NO
                  </div>
                </div>
              </button>
            </div>
            <div className="flex-1">
              <button
                className="flex-col w-full h-full py-6 text-center items-center justify-center"
                onClick={() => handleSelect(true)}
              >
                <div className="flex flex-1 justify-center items-center mb-1">
                  <InBoxArrowDownIcon />
                </div>
                <div className="flex flex-1 flex-col justify-center items-center">
                  <div className="text-xl">YES</div>
                  <div className="text-xs">({selectedIds.length}/3)</div>
                </div>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
