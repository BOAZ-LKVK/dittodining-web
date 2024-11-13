import { RecommendedRestaurant } from "@/api/api";
import { Menus } from "@/components/recommendation/menus";
import { RestaurantInfo } from "@/components/recommendation/restaurant-info";
import { Reviews } from "@/components/recommendation/reviews";



type Props = {
  restaurantRecommendation: RecommendedRestaurant;
}

export const RestaurantRecommendation = ({ restaurantRecommendation }: Props) => {
  const { restaurant, review, menuItems } = restaurantRecommendation;

  return (
    <>
      <RestaurantInfo restaurant={restaurant} />
      <div className="border-b my-4" />
      {review === undefined ? '' :
        <Reviews review={review} />
      }
      {menuItems === undefined ? '' :
        <Menus menus={menuItems} />
      }
    </>
  );
}