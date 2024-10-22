import { useEffect, useRef, useState } from "react";
import { RestaurantReviewItem } from "@/api/api";
import { formatDateString } from "@/utils/datetime";

type ReviewItemProps = {
  reviewItem: RestaurantReviewItem;
};

export const ReviewItem = ({ reviewItem }: ReviewItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // scrollHeight가 clientHeight보다 크면 overflow 발생
      setIsOverflowing(contentRef.current.scrollHeight > contentRef.current.clientHeight);
    }
  }, [reviewItem.content]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4 flex flex-col w-full min-w-72">
      <p className="font-bold">
        {reviewItem.writerName} {"★".repeat(reviewItem.score)}
        {"☆".repeat(5 - reviewItem.score)}
      </p>
      <div
        ref={contentRef}
        className={`text-gray-700 text-sm mt-1 transition-all duration-500 ${
          isExpanded ? "whitespace-normal" : "max-h-16 whitespace-wrap overflow-hidden text-ellipsis"
        }`}
      >
        {reviewItem.content}
      </div>
      {isOverflowing && (
        <button
          className="text-blue-500 text-sm mt-1 hover:underline text-right"
          onClick={toggleExpansion}
        >
          {isExpanded ? "접기" : "더보기"}
        </button>
      )}
      <p className="text-gray-500 text-xs mt-2">
        {formatDateString(reviewItem.wroteAt)}
      </p>
    </div>
  );
};
