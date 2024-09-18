"use client";

import { RestaurantRecommendationResult } from "@/api/api";
import { Header } from "@/components/header";
import { DEFAULT_LOCATION } from "@/constants";
import { makeDistance, makePriceRangePerPerson } from "@/domain/restaurant";
import { useRecommendationResultPage } from "@/hooks/use-recommendation-result-page";
import { useRef, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

export default function RecommnendationResultPage() {
  const { results, isLoading, isError, selectedResult, setSelectedResult, onClickShowDetailButton } = useRecommendationResultPage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다. 잠시후 다시 시도해주세요.</div>;
  }


  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    if (scrollRef.current && results.length > 0) {
      const x = scrollRef.current.scrollLeft;
      const index = Math.round(x / scrollRef.current.offsetWidth);
      setSelectedResult(results[index]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleClick = (e: React.MouseEvent, index: number) => {
    if (scrollRef.current) {
      const clickedElement = scrollRef.current.children[0].children[
        index
      ] as HTMLElement;
      const elementPosition =
        clickedElement.offsetLeft - scrollRef.current.offsetLeft;
      scrollRef.current.scrollTo({
        left: elementPosition,
        behavior: "smooth",
      });

      setSelectedResult(results[index]);
    }
  };

  const onClickMarker = (result: RestaurantRecommendationResult, index: number) => {
    setSelectedResult(results[index]);
    if (scrollRef.current) {
      const clickedElement = scrollRef.current.children[0].children[
        index
      ] as HTMLElement;
      const elementPosition =
        clickedElement.offsetLeft - scrollRef.current.offsetLeft;
      scrollRef.current.scrollTo({
        left: elementPosition,
        behavior: "smooth",
      });
    }
  }


  const mapCenter = selectedResult
    ? {
      lat: selectedResult.recommendedRestaurant.restaurant.location.latitude,
      lng: selectedResult.recommendedRestaurant.restaurant.location.longitude,
    }
    : {
      lat: DEFAULT_LOCATION.latitude,
      lng: DEFAULT_LOCATION.longitude,
    };

  const MarkerContainer = ({ result, index, isSelected }: { result: RestaurantRecommendationResult, index: number, isSelected: boolean }) => {
    const [isVisible, setVisible] = useState(true);

    const markerPosition = {
      lat: result.recommendedRestaurant.restaurant.location.latitude,
      lng: result.recommendedRestaurant.restaurant.location.longitude,
    }

    return (
      <div>
        <MapMarker
          position={markerPosition}
          onClick={(marker) => {
            onClickMarker(result, index);
          }}
        >
        </MapMarker>
        {isSelected && <CustomOverlayMap
          position={markerPosition}
          yAnchor={2.1}
        >
          <button onClick={onClickShowDetailButton}>
            <div
              className="bg-white text-black p-2 rounded-lg shadow-lg text-center cursor-pointer"
              style={{ whiteSpace: "nowrap" }}
            >

              <p className="text-sm font-semibold">자세히 보기</p>
            </div>
          </button>
        </CustomOverlayMap>}
      </div>
    )
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white h-screen">
      <Header />
      <main className="w-full max-w-md mt-4 flex flex-col items-center h-full">
        <div className="text-center px-4 flex-2">
          <h1 className="text-lg font-bold text-orange-600">오늘 뭐먹지?</h1>
          <p className="mt-2 text-xl font-semibold text-gray-800">
            선택하신 음식점을 모아왔어요.
          </p>
          <p className="text-lg text-gray-600">원하는 음식점을 찾아가보세요!</p>
        </div>

        <div className="w-full mt-6 flex-1">
          <div className="w-full h-full bg-gray-200">
            {isLoading &&
              <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                <span className="sr-only">Loading...</span>
              </div>
            }
            <Map center={mapCenter} style={{ width: "100%", height: "100%" }}>
              {results.map((result, index) => {
                return <MarkerContainer
                  key={result.recommendedRestaurant.restaurant.restaurantId}
                  result={result}
                  index={index}
                  isSelected={selectedResult?.restaurantRecommendationId === result.restaurantRecommendationId}
                />
              })}
            </Map>
          </div>
        </div>

        <div className="flex-2 w-full flex mx-auto max-w-md">
          <div
            ref={scrollRef}
            className="w-full mt-4 px-4 py-4 overflow-x-auto scrollbar-hide whitespace-nowrap cursor-grab bg-[#452800] select-none"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
          >
            <div className="flex space-x-4">
              {results.map((result, index) => (
                <div
                  key={result.recommendedRestaurant.restaurant.restaurantId}
                  className="bg-white rounded-lg shadow-lg w-full flex p-2 min-w-96"
                  onClick={(e) => handleClick(e, index)}
                >
                  {/* TODO: image는 캐로셀로 여러개 보이도록 */}
                  {/* <Image
                    src={result.restaurant.restaurantImageUrls[0]}
                    alt={result.restaurant.name}
                    width={80}
                    height={80}
                    className="object-cover rounded-lg select-none"
                  /> */}
                  <div className="ml-4">
                    <h2 className="text-lg font-bold">{result.recommendedRestaurant.restaurant.name}</h2>
                    <p className="text-sm text-orange-600">
                      {result.recommendedRestaurant.restaurant.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      {makePriceRangePerPerson(
                        result.recommendedRestaurant.restaurant.maximumPricePerPerson,
                        result.recommendedRestaurant.restaurant.minimumPricePerPerson
                      )} {makeDistance(result.recommendedRestaurant.restaurant.distanceInMeters)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
