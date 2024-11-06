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

  const handleFocus = () => {
    if (contentRef.current) {
      const isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight;
      setIsOverflowing(isOverflowing);
      setIsExpanded(isOverflowing);
    }
  };

  const handleBlur = () => {
    setIsExpanded(false);
  };

  return (
    <div
      className={`flex-col min-w-56 p-4 rounded-lg mt-4 bg-gray-100 ${isExpanded ? "" : "max-h-46"}`}
      tabIndex={0} // Focus를 받을 수 있도록 설정
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
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
        className={`mt-4 transition-all duration-500 overflow-hidden ${isExpanded ? "line-clamp-none" : "line-clamp-3"}`}
      >
        <div className="flex-col font-semibold text-gray-700 text-xs">
          <div>
            {reviewItem.content}
          </div>
        </div>
      </div>

      {isOverflowing && (
        <div className="text-right text-xs text-gray-700">
          <button
            className="hover:underline"
            onClick={toggleExpansion}
          >
            {isExpanded ? "(접기)" : "(더보기)"}
          </button>
        </div>
      )}

      <p className="text-gray-500 text-xs mt-2 text-right">
        {formatDateString(reviewItem.wroteAt)}
      </p>
    </div>
  );
};
