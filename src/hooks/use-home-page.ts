import { requestRestaurantRecommendation } from "@/api/api";
import { DEFAULT_LOCATION } from "@/constants";
import { useRestaurantRecommendationRequestId } from "@/hooks/use-restaurant-recommendation-request-id";
import { SESSION_STORAGE_KEY } from "@/utils/session-storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useHomePage = () => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  }>(DEFAULT_LOCATION);
  const [isAvailableLocation, setIsAvailableLocation] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { updateRestaurantRecommendationRequestId } =
    useRestaurantRecommendationRequestId();

  useEffect(() => {
    if (isLoading && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });

      setIsLoading(false);
    }
  }, [isLoading]);

  // TODO: hooks로 refactoring
  const onClickStartButton = async () => {
    const { restaurantRecommendationRequestId, isAvailableLocation } =
      await requestRestaurantRecommendation({
        userLocation: {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
      });

    setIsAvailableLocation(isAvailableLocation);

    if (!isAvailableLocation) {
      return;
    }

    updateRestaurantRecommendationRequestId(restaurantRecommendationRequestId);
    sessionStorage.removeItem(SESSION_STORAGE_KEY.selectedRestaurantIds);

    // url path 상수화
    router.push("/recommendation");
  };

  return {
    onClickStartButton,
    isAvailableLocation,
    setIsAvailableLocation,
    userLocation,
    setUserLocation,
    isLoading,
  };
};
