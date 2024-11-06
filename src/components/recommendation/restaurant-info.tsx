import { RestaurantRecommendation } from "@/api/api";
import { makeDistance, makeOpenTimeToday, makePriceRangePerPerson } from "@/domain/restaurant";
import Image from "next/image";

type Props = {
  restaurant: RestaurantRecommendation;
}

export const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <>
      <div className="rounded-lg overflow-hidden">
        <Image
          src={restaurant.restaurantImageUrls[0]}
          alt="food"
          width={400}
          height={300}
          className="w-full h-auto object-cover" />
      </div>

      <div className="mt-4 text-gray-700 text-sm">
        {/* TOOD: 음식점 설명 데이터 파이프라인 작업 후 추가 */}
        {/* <p className="text-primary font-semibold">
          {restaurant.description}
        </p> */}
        <div className="flex space-x-2 mt-2">
          <h2 className="text-xl font-bold text-secondary">
            {restaurant.name}
          </h2>
          <p className="text-gray-500 mt-1 font-semibold">
            {makeDistance(restaurant.distanceInMeters)}
          </p>
        </div>
        <p className="mt-1 font-semibold flex">
          <div className="mr-1">
            {makePriceRangePerPerson(restaurant.minimumPricePerPerson, restaurant.maximumPricePerPerson)}
          </div>
          <div>
            {makeOpenTimeToday(restaurant.businessHours)}
          </div>
        </p>
      </div>
    </>
  )
}