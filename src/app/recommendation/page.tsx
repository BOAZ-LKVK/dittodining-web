"use client";

import { InBoxArrowDownIcon } from "@/assets/icons/InBoxArrowDownIcon";
import { RefreshIcon } from "@/assets/icons/RefreshIcon";
import { Header } from "@/components/header";
import { RestaurantRecommendation } from "@/components/recommendation/recommendation";
import { useRestaurantRecommendationPage } from "@/hooks/use-restaurant-recommendation-page";

export default function RecommendationPage() {
  const { currentRestaurant, currentRestaurantRecommendation, selectedIds, handleSelect, review, menus, isLoading } =
    useRestaurantRecommendationPage();

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
          <div className="p-8 flex-grow overflow-auto scrollbar-hide">
            <RestaurantRecommendation restaurantRecommendation={currentRestaurantRecommendation} />
          </div>

          <div className="w-full flex mx-auto max-w-md bg-secondary h-28 text-white font-bold">
            <button
              className="flex-col flex-1 py-6 text-center w-full"
              onClick={() => handleSelect(false)}
            >
              <div className="flex flex-1 items-center justify-center">
                <RefreshIcon />
              </div>
              <div className="flex flex-1 text-xl justify-center items-center">NO</div>
            </button>

            <button
              className="flex-col flex-1 py-6 text-center w-full items-center justify-center"
              onClick={() => handleSelect(true)}
            >
              <div className="flex flex-1 justify-center items-center">
                <InBoxArrowDownIcon />
              </div>
              <div className="flex flex-1 text-xl justify-center items-center">
                YES
              </div>
              <div className="flex flex-1 text-xs justify-center items-center">
                ({selectedIds.length}/3)
              </div>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
