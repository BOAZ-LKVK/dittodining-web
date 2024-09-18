import {
  API_PATH,
  getRestaurantRecommendationResult,
  RestaurantRecommendationResult,
} from "@/api/api";
import { useRestaurantRecommendationRequestId } from "@/hooks/use-restaurant-recommendation-request-id";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useRecommendationResultPage = () => {
  const [selectedResult, setSelectedResult] =
    useState<RestaurantRecommendationResult>();
  const { restaurantRecommendationRequestId, isLoading: isRequestIdLoading } =
    useRestaurantRecommendationRequestId();

  const {
    data: recommendationResult,
    isError,
    isLoading: isQueryLoading,
  } = useQuery({
    queryKey: [
      API_PATH.GET_RESTAURANT_RECOMMENDATION_RESULT(
        restaurantRecommendationRequestId!!
      ),
    ],
    queryFn: () =>
      getRestaurantRecommendationResult(restaurantRecommendationRequestId!!),
    enabled: !!restaurantRecommendationRequestId,
  });

  useEffect(() => {
    if (!selectedResult) {
      setSelectedResult(recommendationResult?.results[0]);
    }
  }, [recommendationResult?.results, selectedResult]);

  const isLoading =
    isRequestIdLoading || isQueryLoading || selectedResult === undefined;

  if (isLoading || isError) {
    return {
      error: isError,
      isLoading: isLoading,
      results: [],
      setSelectedResult: setSelectedResult,
      selectedResult: selectedResult,
    };
  }

  if (restaurantRecommendationRequestId === null) {
    throw new Error("restaurantRecommendationRequestId이 없습니다.");
  }

  if (
    recommendationResult === undefined ||
    recommendationResult.results === undefined
  ) {
    throw new Error("음식점 추천 결과를 불러오는 중 에러가 발생했습니다.");
  }

  return {
    results: recommendationResult.results,
    isError: isError,
    isLoading: isLoading,
    setSelectedResult: setSelectedResult,
    selectedResult: selectedResult,
  };
};