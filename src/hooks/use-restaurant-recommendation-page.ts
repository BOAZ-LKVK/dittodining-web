import { SESSION_STORAGE_KEY } from "@/components/session-storage";
import { Restaurant } from "@/models/restaurant";
import { useEffect, useState } from "react";

export const useRestaurantRecommendationPage = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // 실제 API데이터로 변경 필요
  const currentRestaurant: Restaurant = {
    restaurantId: 1,
    name: "A 덮밥집 목동점",
    catchphrase: "부드러운 치즈버거가 일품인 수제버거 전문점",
    priceRangePerPerson: "₩7,000 ~ ₩10,000",
    distance: "200m (도보 5분)",
    imageUrl: "/food.png",
    businessHours: "10:00 ~ 22:00",
  };

  const review = {
    statistics: {
      kakao: { score: 4.3, count: 124 },
      naver: { score: 4.5, count: 242 },
    },
    reviews: [
      {
        reviewId: 1,
        writer: "요아소비빠따정",
        score: 4,
        content:
          "진짜로 여기에서는 트리플치즈버거 드셔야합니다. 패티 육즙은 말할 것도 없고, 일단 버거 번이 입을 정도로 부드러워요. 근데 이게 패티의 육즙이랑 만난다? 그냥 게임 끝납니다.",
        writedAt: "2021-09-01 12:00:00",
      },
      {
        reviewId: 2,
        writer: "요아소비빠따정",
        score: 4,
        content:
          "진짜로 여기에서는 트리플치즈버거 드셔야합니다. 패티 육즙은 말할 것도 없고, 일단 버거 번이 입을 정도로 부드러워요. 근데 이게 패티의 육즙이랑 만난다? 그냥 게임 끝납니다.",
        writedAt: "2021-09-01 12:00:00",
      },
      {
        reviewId: 3,
        writer: "요아소비빠따정",
        score: 4,
        content:
          "진짜로 여기에서는 트리플치즈버거 드셔야합니다. 패티 육즙은 말할 것도 없고, 일단 버거 번이 입을 정도로 부드러워요. 근데 이게 패티의 육즙이랑 만난다? 그냥 게임 끝납니다.",
        writedAt: "2021-09-01 12:00:00",
      },
    ],
  };

  useEffect(() => {
    const restaurantIds = sessionStorage.getItem(
      SESSION_STORAGE_KEY.selectedRestaurantIds
    );
    if (restaurantIds) {
      setSelectedIds(JSON.parse(restaurantIds));
    }
  }, []);

  const handleSelect = (isLike: boolean) => {
    if (!isLike) {
      // TODO: 실제 API 호출 및 데이터 업데이트
      return;
    }

    const updatedIds = [...selectedIds, currentRestaurant.restaurantId];
    setSelectedIds(updatedIds);
    sessionStorage.setItem(
      SESSION_STORAGE_KEY.selectedRestaurantIds,
      JSON.stringify(updatedIds)
    );
  };

  return {
    currentRestaurant: currentRestaurant,
    selectedIds: selectedIds,
    handleSelect: handleSelect,
    review: review,
  };
};
