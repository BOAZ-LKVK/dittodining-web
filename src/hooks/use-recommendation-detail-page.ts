import { API_PATH, getRestaurantRecommendation } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

type Params = {
  recommendationId: number;
};

export const useRecommendationDetailPage = ({ recommendationId }: Params) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [API_PATH.GET_RESTAURANT_RECOMMENDATION(recommendationId)],
    queryFn: () => getRestaurantRecommendation(recommendationId),
  });

  if (isLoading || isError) {
    return { recommendation: null, isLoading, isError };
  }

  if (data === undefined) {
    throw new Error("getRestaurantRecommendation 호출 도중 에러 발생");
  }

  return {
    recommendation: data.recommendation,
    isLoading,
    isError,
  };
};
