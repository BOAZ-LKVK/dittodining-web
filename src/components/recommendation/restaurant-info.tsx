import { RestaurantRecommendation } from "@/api/api";
import { ClockIcon } from "@/assets/icons/ClockIcon";
import { UserIcon } from "@/assets/icons/UserIcon";
import { makeDistance, makeOpenTimeToday, makePriceRangePerPerson } from "@/domain/restaurant";
import Image from "next/image";

type Props = {
  restaurant: RestaurantRecommendation;
}

export const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <>
      <div className="w-full h-80 relative">
        <Image
          src={restaurant.restaurantImageUrls[0]}
          alt="restaurant image"
          objectFit="cover"
          layout="fill"
          className="rounded-lg"
        />
      </div>

      <div className="mt-4 text-gray-700">
        {/* TOOD: 음식점 설명 데이터 파이프라인 작업 후 추가 */}
        {/* <p className="text-primary font-semibold">
          {restaurant.description}
        </p> */}
        <div className="flex space-x-2 mt-2">
          <h2 className="text-xl font-bold text-secondary">
            {restaurant.name}
          </h2>

          <p className="mt-1 text-sm font-semibold text-gray-400 ">
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