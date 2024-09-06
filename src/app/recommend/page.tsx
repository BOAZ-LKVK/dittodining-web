"use client";

import { Header } from "@/components/header";
import { useRestaurantRecommendationPage } from "@/hooks/use-restaurant-recommendation-page";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function RecommendationPage() {
  const { currentRestaurant, selectedIds, handleSelect, review } =
    useRestaurantRecommendationPage();
  const router = useRouter();

  if (selectedIds.length >= 3) {
    router.push("/result");
  }

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
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <Header />
        <main className="flex flex-col w-full max-w-md p-4">
          <div className="h-full">
            <div className="rounded-lg overflow-hidden">
              <Image
                src={currentRestaurant.imageUrl}
                alt="food"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="mt-4 text-gray-700 text-sm">
              <p className={`text-primary font-semibold`}>
                {currentRestaurant.catchphrase}
              </p>
              <div className="flex space-x-2 mt-2">
                <h2 className={`text-xl font-bold text-secondary`}>
                  {currentRestaurant.name}
                </h2>
                <p className="text-gray-500 mt-1 font-semibold">
                  {currentRestaurant.distance}
                </p>
              </div>
              <p className="mt-1 font-semibold">
                {currentRestaurant.priceRangePerPerson}{" "}
                {currentRestaurant.businessHours}
              </p>
            </div>

            <div className="mt-4 pt-2 border-t">
              <div className="flex items-center space-x-2 text-secondary">
                <h3 className="font-semibold">리뷰</h3>
                <span className="mx-2">|</span>
                <span className="font-medium">
                  카카오 {review.statistics.kakao.score}점(
                  {review.statistics.kakao.count})
                </span>
                <span className="font-medium">
                  네이버 {review.statistics.naver.score}점(
                  {review.statistics.naver.count})
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
                        {reviewItem.writer} {"★".repeat(reviewItem.score)}
                        {"☆".repeat(5 - reviewItem.score)}
                      </p>
                      <p className="text-gray-700 text-sm mt-1">
                        {reviewItem.content}
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        {reviewItem.writedAt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-secondary h-28 text-white font-bold">
            <button
              className="flex-1 py-2 text-center mr-2 w-full"
              onClick={() => handleSelect(false)}
            >
              <div className="text-xl flex justify-center items-center">NO</div>
            </button>
            <button
              className="flex-1 flex-col py-2 items-center w-full h-full"
              onClick={() => handleSelect(true)}
            >
              <div className="flex-1 text-xl flex justify-center items-center">
                YES
              </div>
              <div className="flex-1 text-xs flex justify-center items-center">
                ({selectedIds.length}/3)
              </div>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
