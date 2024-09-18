import { RecommendedRestaurant } from "@/api/api";
import { makeDistance, makePriceRangePerPerson } from "@/domain/restaurant";
import { formatDateString } from "@/utils/datetime";
import Image from "next/image";
import { useRef, useState } from "react";



type Props = {
  restaurantRecommendation: RecommendedRestaurant;
}

export const RestaurantRecommendation = ({ restaurantRecommendation }: Props) => {
  const { restaurant, review } = { restaurant: restaurantRecommendation.restaurant, review: restaurantRecommendation.review };

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };


  return (
    <div className="h-full">
      {/* TOOD: Image 캐로셀 형태로 보여지도록 */}
      <div className="rounded-lg overflow-hidden">
        <Image
          src={restaurant.restaurantImageUrls[0]}
          alt="food"
          width={400}
          height={300}
          className="w-full h-auto object-cover" />
      </div>

      <div className="mt-4 text-gray-700 text-sm">
        <p className={`text-primary font-semibold`}>
          {restaurant.description}
        </p>
        <div className="flex space-x-2 mt-2">
          <h2 className={`text-xl font-bold text-secondary`}>
            {restaurant.name}
          </h2>
          <p className="text-gray-500 mt-1 font-semibold">
            {makeDistance(restaurant.distanceInMeters)}
          </p>
        </div>
        <p className="mt-1 font-semibold">
          {makePriceRangePerPerson(restaurant.minimumPricePerPerson, restaurant.maximumPricePerPerson)}
          {restaurant.businessHours.find(
            (businessHour) => businessHour.dayOfWeekEnum === 1
          )?.openTime}{" "}

        </p>
      </div>
      {review === undefined ? '' : (
        <>

          <div className="mt-4 pt-2 border-t">
            <div className="flex items-center space-x-2 text-secondary">
              <h3 className="font-semibold">리뷰</h3>
              <span className="mx-2">|</span>
              <span className="font-medium">
                카카오 {review.statistics.kakao?.averageScore}점(
                {review.statistics.kakao?.count})
              </span>
              <span className="font-medium">
                네이버 {review.statistics.naver?.averageScore}점(
                {review.statistics.naver?.count})
              </span>
            </div>
          </div>

          <div className="flex w-full flex mx-auto max-w-md">
            <div
              ref={scrollRef}
              className="w-full overflow-x-auto scrollbar-hide cursor-grab select-none"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
            >
              <div className="flex space-x-4">
                {review.reviews.map((reviewItem, index) => (
                  <div className="bg-gray-100 p-4 rounded-lg mt-4 flex flex-col w-full min-w-96" key={index}>
                    <p className="font-bold">
                      {reviewItem.writerName} {"★".repeat(reviewItem.score)}
                      {"☆".repeat(5 - reviewItem.score)}
                    </p>
                    <p className="text-gray-700 text-sm mt-1">
                      {reviewItem.content}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      {formatDateString(reviewItem.wroteAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}