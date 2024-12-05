import {
  API_PATH,
  listRecommendedRestaurants,
  ListRecommendedRestaurantsRequest,
} from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export const useListRecommendationRestaurants = (
  restaurantRecommendationRequestId: number,
  request: ListRecommendedRestaurantsRequest
) => {
  return useQuery({
    queryKey: [
      API_PATH.LIST_RECOMMENDED_RESTAURANTS(restaurantRecommendationRequestId),
      request,
    ],
    queryFn: () =>
      listRecommendedRestaurants(restaurantRecommendationRequestId, request),
  });
};
