import { API_PATH, getRestaurantRecommendationResult } from "@/api/api";
import { useRestaurantRecommendationRequestId } from "@/hooks/use-restaurant-recommendation-request-id";
import { useQuery } from "@tanstack/react-query";

export const useRecommendationResultPage = () => {
  const { restaurantRecommendationRequestId } =
    useRestaurantRecommendationRequestId();

  const {
    data: recommendationResult,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [
      API_PATH.GET_RESTAURANT_RECOMMENDATION_RESULT(
        restaurantRecommendationRequestId
      ),
    ],
    queryFn: () =>
      getRestaurantRecommendationResult(restaurantRecommendationRequestId),
  });

  if (isLoading || isError) {
    return {
      error: isError,
      isLoading: isLoading,
    };
  }

  if (recommendationResult === undefined) {
    throw new Error("음식점 추천 결과를 불러오는 중 에러가 발생했습니다.");
  }

  return {
    results: recommendationResult.results,
    isError: isError,
    isLoading: isLoading,
  };
};
