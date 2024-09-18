import { SESSION_STORAGE_KEY } from "@/utils/session-storage";
import { useEffect, useState } from "react";

export const useRestaurantRecommendationRequestId = () => {
  const [
    restaurantRecommendationRequestId,
    setRestaurantRecommendationRequestId,
  ] = useState<number | null>(null);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    if (!isInitial) {
      return;
    }

    const restaurantRecommendationRequestId = sessionStorage.getItem(
      SESSION_STORAGE_KEY.restaurantRecommendationRequestId
    );

    if (restaurantRecommendationRequestId) {
      setRestaurantRecommendationRequestId(
        Number(restaurantRecommendationRequestId)
      );
    }

    setIsInitial(false);
  }, [isInitial]);

  return {
    restaurantRecommendationRequestId: restaurantRecommendationRequestId,
    updateRestaurantRecommendationRequestId: (
      restaurantRecommendationRequestId: number
    ) => {
      sessionStorage.setItem(
        SESSION_STORAGE_KEY.restaurantRecommendationRequestId,
        restaurantRecommendationRequestId.toString()
      );
    },
    isLoading: isInitial,
  };
};
