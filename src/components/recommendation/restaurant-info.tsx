import { RestaurantRecommendation } from "@/api/api";
import { ClockIcon } from "@/assets/icons/ClockIcon";
import { UserIcon } from "@/assets/icons/UserIcon";
import { makeDistance, makeOpenTimeToday, makePriceRangePerPerson } from "@/domain/restaurant";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  restaurant: RestaurantRecommendation;
}

export const RestaurantInfo = ({ restaurant }: Props) => {
  const { restaurantImageUrls } = restaurant;

  const [isAutoSliding, setIsAutoSliding] = useState(restaurantImageUrls.length > 1); // 자동 슬라이드 활성화 여부
  const autoSlideTimeout = useRef<NodeJS.Timeout | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAutoSliding && currentIndex === 0) {
      autoSlideTimeout.current = setTimeout(() => {
        setCurrentIndex(1);
        setIsAutoSliding(false);
      }, 2000); // 최초 2초 후에만 다음 슬라이드로 이동
    }

    return () => {
      if (autoSlideTimeout.current) {
        clearTimeout(autoSlideTimeout.current);
      }
    };
  }, [isAutoSliding, currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? restaurantImageUrls.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === restaurantImageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };


  return (
    <>
      <div
        className="relative w-full h-80 overflow-hidden rounded-2xl shadow-xl"
        ref={containerRef}
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {restaurantImageUrls.map((src, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <Image
                src={src}
                alt={`Restaurant Image ${index}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {restaurantImageUrls.length > 1 && (

          <div>
            {/* Left Arrow */}
            {currentIndex !== 0 && (
              <button
                onClick={goToPrevious}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
              >
                &lt;
              </button>
            )}


            {/* Right Arrow */}
            {currentIndex !== restaurantImageUrls.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
              >
                &gt;
              </button>
            )}
          </div>
        )}

        {/* Indicators as Numbers (Right Bottom) */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-4 py-1 rounded-xl">
          {`${currentIndex + 1} / ${restaurantImageUrls.length}`}
        </div>
      </div >

      <div className="mt-4 text-gray-700">
        {/* TOOD: 음식점 설명 데이터 파이프라인 작업 후 추가 */}
        {/* <p className="text-primary font-semibold">
          {restaurant.description}
        </p> */}
        <div className="flex space-x-2 mt-2">
          <h2 className="text-xl font-bold text-secondary">
            {restaurant.name}
          </h2>

          <p className="mt-1 text-sm font-semibold text-gray-400">
            {makeDistance(restaurant.distanceInMeters)}
          </p>
        </div>

        <div className="flex mt-1 font-semibold text-black">
          <div className="mr-1 flex items-center">
            <UserIcon />
            <span className="ml-1 text-xs">
              {makePriceRangePerPerson(restaurant.minimumPricePerPerson, restaurant.maximumPricePerPerson)}
            </span>
          </div>
          <div className="flex items-center">
            <ClockIcon />
            <span className="ml-1 text-xs">
              {makeOpenTimeToday(restaurant.businessHours)}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}