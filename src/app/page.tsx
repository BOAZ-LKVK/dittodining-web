"use client";
import { requestRestaurantRecommendation } from "@/api/api";
import { Header } from "@/components/header";
import Map from "@/components/map";
import { SESSION_STORAGE_KEY } from "@/utils/session-storage";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const onClickStartButton = async () => {
    const { restaurantRecommendationRequestId } = await requestRestaurantRecommendation(
      {
        userLocation: {
          latitude: 37.5662952,
          longitude: 126.9779451,
        }
      },
    );

    sessionStorage.setItem(
      SESSION_STORAGE_KEY.restaurantRecommendationRequestId,
      restaurantRecommendationRequestId.toString(),
    );
    sessionStorage.removeItem(SESSION_STORAGE_KEY.selectedRestaurantIds);

    // url path 상수화
    router.push("/recommendation");
  };


  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white h-screen">
      <Header />
      <div className="flex flex-col items-center h-full w-full">
        <main className="flex flex-col w-full max-w-md mt-4 h-full">
          <div className="flex-1">
            <Map />
          </div>

          <div className="flex-2">
            <button
              className="w-full py-3 bg-orange-600 text-white text-lg rounded-b-lg shadow"
              onClick={onClickStartButton}
            >
              주변 맛집 찾기
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
