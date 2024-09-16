import {
  API_PATH,
  listRecommendedRestaurants,
  RecommendedRestaurant,
  selectRestaurantRecommendations,
} from "@/api/api";
import { useRestaurantRecommendationRequestId } from "@/hooks/use-restaurant-recommendation-request-id";
import { SESSION_STORAGE_KEY } from "@/utils/session-storage";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useRestaurantRecommendationPage = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentRestaurantRecommendation, setCurrentRestaurantRecommendation] =
    useState<RecommendedRestaurant>();

  const router = useRouter();

  const { restaurantRecommendationRequestId } =
    useRestaurantRecommendationRequestId();

  const {
    data: listRecommendedRestaurantsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      API_PATH.LIST_RECOMMENDED_RESTAURANTS(restaurantRecommendationRequestId),
    ],
    queryFn: () =>
      listRecommendedRestaurants(restaurantRecommendationRequestId, {
        limit: 10,
      }),
  });

  useEffect(() => {
    const restaurantIds = sessionStorage.getItem(
      SESSION_STORAGE_KEY.selectedRestaurantIds
    );
    if (restaurantIds) {
      setSelectedIds(JSON.parse(restaurantIds));
    }
  }, []);

  if (isLoading || isError) {
    return {
      selectedIds: selectedIds,
      isLoading: isLoading,
      isError: isError,
    };
  }

  if (listRecommendedRestaurantsData === undefined) {
    throw new Error("음식점 추천 데이터를 불러오는 중 에러가 발생했습니다.");
  }

  if (currentRestaurantRecommendation === undefined) {
    // 초기값 세팅
    setCurrentRestaurantRecommendation(
      listRecommendedRestaurantsData?.recommendedRestaurants[0]
    );
  }

  const getNextRestaurantRecommendation = () => {
    const currentIndex =
      listRecommendedRestaurantsData.recommendedRestaurants.findIndex(
        (restaurant) =>
          restaurant.restaurant.restaurantRecommendationId ===
          currentRestaurantRecommendation?.restaurant.restaurantRecommendationId
      );

    if (
      currentIndex ===
      listRecommendedRestaurantsData.recommendedRestaurants.length - 1
    ) {
      // TODO: 마지막 음식점 추천인 경우 데이터를 좀 더 조회하기
      // TODO: 더 이상 추천 데이터가 없는 경우 처리하기
      return undefined;
    }

    setCurrentRestaurantRecommendation(
      listRecommendedRestaurantsData.recommendedRestaurants[currentIndex + 1]
    );
  };

  const currentRestaurant = currentRestaurantRecommendation?.restaurant;
  const review = currentRestaurantRecommendation?.review;
  const menus = currentRestaurantRecommendation?.menuItems;

  const handleSelect = async (isLike: boolean) => {
    if (!isLike) {
      getNextRestaurantRecommendation();
      return;
    }

    if (currentRestaurant === undefined) {
      throw new Error("currentRestaurant 데이터가 없습니다.");
    }

    await selectRestaurantRecommendations(restaurantRecommendationRequestId, {
      restaurantRecommendationIDs: [
        currentRestaurant.restaurantRecommendationId,
      ],
    });

    const updatedIds = [...selectedIds, currentRestaurant.restaurantId];
    setSelectedIds(updatedIds);
    sessionStorage.setItem(
      SESSION_STORAGE_KEY.selectedRestaurantIds,
      JSON.stringify(updatedIds)
    );

    if (selectedIds.length >= 3) {
      // TODO: path 상수화
      router.push("/result");
    }

    getNextRestaurantRecommendation();
  };

  return {
    currentRestaurant: currentRestaurant,
    selectedIds: selectedIds,
    handleSelect: handleSelect,
    review: review,
    menus: menus,
    isLoading: isLoading,
    isError: isError,
  };
};
