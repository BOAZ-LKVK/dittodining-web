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
    <div className="flex flex-col min-w-56 p-4 rounded-lg mt-4 bg-gray-100 ">
      <div className="flex justify-between">
        <div className="font-bold text-secondary">
          {reviewItem.writerName}
        </div>

        <div className="text-[#FFCC00]">
          {"★".repeat(reviewItem.score)}
          {"☆".repeat(5 - reviewItem.score)}
        </div>
      </div>

      <div
        ref={contentRef}
        className={`mt-4 transition-all duration-500 ${isExpanded ? "whitespace-normal" : "max-h-16 whitespace-wrap overflow-hidden text-ellipsis"
          }`}
      >
        <div className="font-semibold text-gray-700 text-xs">
          {reviewItem.content}
        </div>
      </div>

      {isOverflowing && (
        <button
          className="text-blue-500 text-sm mt-1 hover:underline text-right"
          onClick={toggleExpansion}
        >
          {isExpanded ? "접기" : "더보기"}
        </button>
      )}
      <p className="text-gray-500 text-xs mt-2 text-right">
        {formatDateString(reviewItem.wroteAt)}
      </p>
    </div>
  );
};
