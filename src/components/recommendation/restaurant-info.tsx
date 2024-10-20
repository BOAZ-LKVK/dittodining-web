import { makeDayOfWeek, RestaurantRecommendation } from "@/api/api";
import { makeDistance, makePriceRangePerPerson } from "@/domain/restaurant";
import Image from "next/image";

type Props = {
  restaurant: RestaurantRecommendation;
}

export const RestaurantInfo = ({ restaurant }: Props) => {
  const now = new Date();

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
        <p className="text-primary font-semibold">
          {restaurant.description}
        </p>
        <div className="flex space-x-2 mt-2">
          <h2 className="text-xl font-bold text-secondary">
            {restaurant.name}
          </h2>
          <p className="text-gray-500 mt-1 font-semibold">
            {makeDistance(restaurant.distanceInMeters)}
          </p>
        </div>
        <p className="mt-1 font-semibold">
          {makePriceRangePerPerson(restaurant.minimumPricePerPerson, restaurant.maximumPricePerPerson)}
          {restaurant.businessHours.find(
            (businessHour) => businessHour.dayOfWeekEnum === makeDayOfWeek(now)
          )?.openTime}{" "}
        </p>
      </div>
    </>
  )
}