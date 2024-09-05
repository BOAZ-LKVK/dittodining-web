"use client";

import { Header } from "@/components/header";
import Map from "@/components/map";
import { Restaurant } from "@/models/restaurant";
import Image from "next/image";
import { useState, useRef } from "react";

export default function RecommnendationResultPage() {
  const [results, setResults] = useState<Restaurant[]>([
    {
      rastaurantId: "restaurant-1",
      name: "A 덮밥집 목동점",
      catchphrase: "부드러운 치즈버거가 일품인 수제버거 전문점",
      priceRangePerPerson: "₩7,000 ~ ₩10,000",
      distance: "200m (도보 5분)",
      imageUrl: "/food.png",
    },
    {
      rastaurantId: "restaurant-2",
      name: "B 덮밥집 목동점",
      catchphrase: "부드러운 치즈버거가 일품인 수제버거 전문점",
      priceRangePerPerson: "₩7,000 ~ ₩10,000",
      distance: "200m (도보 5분)",
      imageUrl: "/food.png",
    },
    {
      rastaurantId: "restaurant-3",
      name: "C 덮밥집 목동점",
      catchphrase: "부드러운 치즈버거가 일품인 수제버거 전문점",
      priceRangePerPerson: "₩7,000 ~ ₩10,000",
      distance: "200m (도보 5분)",
      imageUrl: "/food.png",
    },
  ]);

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
          <Map />
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
                  key={result.rastaurantId}
                  className="bg-white rounded-lg shadow-lg w-full flex p-2 min-w-96"
                  onClick={(e) => handleClick(e, index)}
                >
                  <Image
                    src={result.imageUrl}
                    alt={result.name}
                    width={80}
                    height={80}
                    className="object-cover rounded-lg select-none"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-bold">{result.name}</h2>
                    <p className="text-sm text-orange-600">
                      {result.catchphrase}
                    </p>
                    <p className="text-sm text-gray-600">
                      {result.priceRangePerPerson} | {result.distance}
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
