import {
  API_PATH,
  getRestaurantRecommendationResult,
  RestaurantRecommendationResult,
} from "@/api/api";
import { useRestaurantRecommendationRequestId } from "@/hooks/use-restaurant-recommendation-request-id";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useRecommendationResultPage = () => {
  const [selectedResult, setSelectedResult] =
    useState<RestaurantRecommendationResult>();
  const { restaurantRecommendationRequestId, isLoading: isRequestIdLoading } =
    useRestaurantRecommendationRequestId();
  const router = useRouter();

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

  const onClickShowDetailButton = () => {
    if (selectedResult) {
      router.push(
        `/recommendation/${selectedResult.restaurantRecommendationId}`
      );
    }
  };

  const isLoading = isRequestIdLoading || isQueryLoading;

  if (isLoading || isError) {
    return {
      isError,
      isLoading,
      results: [],
      setSelectedResult,
      selectedResult,
      onClickShowDetailButton,
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
    isError,
    isLoading,
    setSelectedResult,
    selectedResult,
    onClickShowDetailButton,
  };
};
