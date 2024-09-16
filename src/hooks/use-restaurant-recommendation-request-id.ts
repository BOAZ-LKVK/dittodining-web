import { SESSION_STORAGE_KEY } from "@/utils/session-storage";

export const useRestaurantRecommendationRequestId = () => {
  const restaurantRecommendationRequestId = Number(
    sessionStorage.getItem(
      SESSION_STORAGE_KEY.restaurantRecommendationRequestId
    )
  );

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
  };
};
