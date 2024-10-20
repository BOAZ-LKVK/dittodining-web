import { RestaurantMenu } from "@/api/api";
import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  menus: RestaurantMenu[];
};

export const Menus = ({ menus }: Props) => {
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
    <>
      <div className="mt-4 pt-2">
        <div className="flex items-center space-x-2 text-secondary">
          <h3 className="font-semibold">메뉴</h3>
          <span className="mx-2">|</span>
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
            {menus.map((menu, index) => (
              <div className="bg-gray-100 p-4 rounded-lg mt-4 flex w-full min-w-96" key={menu.restaurantMenuId}>
                <div className="h-16 w-16">
                  {menu.imageUrl === null ? '' :
                    <Image
                      src={menu.imageUrl}
                      alt={menu.name}
                      width={64}
                      height={64}
                      className="w-full h-auto object-cover"
                    />}
                </div>
                <div className="flex-col flex-grow ml-3">
                  <div className="font-bold">
                    {menu.name}
                  </div>
                  <div className="mt-3 text-primary font-semibold">
                    {menu.price}원
                  </div>
                  <div className="mt-1 font-semibold">
                    {menu.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

};
