import { RestaurantReview } from "@/api/api";
import { ReviewItem } from "@/components/recommendation/review-item";
import { useRef, useState } from "react";

type Props = {
  review: RestaurantReview;
}

export const Reviews = ({ review }: Props) => {
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

  return <>
    <div className="mt-4 pt-2">
      <div className="flex items-center space-x-2 text-secondary">
        <div className="font-bold">
          리뷰
        </div>
        <div className="mx-2 font-bold">
          |
        </div>

        <div className="font-medium text-sm">
          카카오 {review.statistics.kakao?.averageScore}점(
          {review.statistics.kakao?.count})
        </div>

        <div className="font-medium text-sm">
          네이버 {review.statistics.naver?.averageScore}점(
          {review.statistics.naver?.count})
        </div>
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
            <ReviewItem key={index} reviewItem={reviewItem} />
          ))}
        </div>
      </div>
    </div>
  </>;
}
