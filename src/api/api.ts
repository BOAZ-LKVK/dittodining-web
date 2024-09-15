import axios, { AxiosRequestConfig } from "axios";

// TODO: Replace with actual API base URL using environment variables
const API_BASE_URL = "localhost:8080";

const API_PATH = {
  REQUEST_RESTAUNRANT_RECOMMENDATION: "/api/recommendation",
  LIST_RECOMMENDED_RESTAURANTS: (restaurantRecommendationRequestId: number) =>
    `/api/recommendation/${restaurantRecommendationRequestId}/restaurants`,
  SELECT_RESTAURANT_RECOMMENDATION: (
    restaurantRecommendationRequestId: number
  ) => `/api/recommendation/${restaurantRecommendationRequestId}/select`,
  GET_RESTAURANT_RECOMMENDATION_RESULT: (
    restaurantRecommendationRequestId: number
  ) => `/api/recommendation/${restaurantRecommendationRequestId}/result`,
};

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const api = (axiosConfig?: AxiosRequestConfig<unknown>) => {
  const instance = axios.create({
    ...axiosConfig,
  });

  return instance;
};

export const getApiUrl = (path: string) => `${API_BASE_URL}${path}`;

type RequestRestaurantRecommendationRequest = {
  userLocation: {
    latitude: number;
    longitude: number;
  };
};

type RequestRestaurantRecommendationResponse = {
  restaurantRecommendationRequestId: number;
};

export const requestRestaurantRecommendation = async (
  request: RequestRestaurantRecommendationRequest
) => {
  const response = await api().post<RequestRestaurantRecommendationResponse>(
    API_PATH.REQUEST_RESTAUNRANT_RECOMMENDATION,
    { ...request }
  );

  return response.data;
};

type ListRecommendedRestaurantsRequest = {
  limit?: number;
};

type ListRecommendedRestaurantsResponse = {
  restaurants: RecommendedRestaurant[];
};

export const listRecommendedRestaurants = async (
  restaurantRecommendationRequestId: number,
  request: ListRecommendedRestaurantsRequest
) => {
  if (request.limit == undefined) {
    // default limit
    request.limit = 10;
  }

  const response = await api().get<ListRecommendedRestaurantsResponse>(
    API_PATH.LIST_RECOMMENDED_RESTAURANTS(restaurantRecommendationRequestId),
    { params: request }
  );
  return response.data;
};

type SelectRestaurantRecommendationsRequest = {
  // 음식점 추천 ID 목록
  restaurantRecommendationIDs: number[];
};

type SelectRestaurantRecommendationsResponse = {};

export const selectRestaurantRecommendations = async (
  restaurantRecommendationRequestId: number,
  request: SelectRestaurantRecommendationsRequest
) => {
  const response = await api().post<SelectRestaurantRecommendationsResponse>(
    API_PATH.SELECT_RESTAURANT_RECOMMENDATION(
      restaurantRecommendationRequestId
    ),
    { ...request }
  );
  return response.data;
};

type GetRestaurantRecommendationResultResponse = {
  results: RestaurantRecommendationResult[];
};

type RestaurantRecommendationResult = {
  restaurantRecommendationId: number;
  restaurant: RecommendedRestaurant;
};

export const getRestaurantRecommendationResult = async (
  restaurantRecommendationRequestId: number
) => {
  const response = await api().get<GetRestaurantRecommendationResultResponse>(
    API_PATH.GET_RESTAURANT_RECOMMENDATION_RESULT(
      restaurantRecommendationRequestId
    )
  );
  return response.data;
};

type RecommendedRestaurant = {
  // 음식점
  restaurant: RestaurantRecommendation;
  // 음식점 메뉴 목록
  menuItems: RestaurantMenu[];
  // 리뷰 목록
  review: RestaurantReview;
};

type RestaurantRecommendation = {
  restaurantRecommendationId: number;
  restaurantId: number;
  name: string;
  description: string;
  priceRangePerPerson: string;
  distance: string;
  businessHours: BusinessHour[];
  restaurantImageUrls: string[];
};

type BusinessHour = {
  // 요일 enum: DayOfWeek e.g. DAY_OF_WEEK_SUNDAY
  dayOfWeekEnum: DayOfWeek;
  // 시작 시간 e.g. 10:00
  openTime: string;
  // 마감 시간 e.g. 22:00
  closingTime: string;
  // 쉬는날 여부
  isClosedDay: boolean;
};

enum DayOfWeek {
  DAY_OF_WEEK_UNKNOWN,
  DAY_OF_WEEK_SUNDAY,
  DAY_OF_WEEK_MONDAY,
  DAY_OF_WEEK_TUESDAY,
  DAY_OF_WEEK_WEDNESDAY,
  DAY_OF_WEEK_THURSDAY,
  DAY_OF_WEEK_FRIDAY,
  DAY_OF_WEEK_SATURDAY,
}

type RestaurantMenu = {
  // 음식점 메뉴 ID
  restaurantMenuId: number;
  // 음식 사진 url
  imageUrl: string;
  // 메뉴명
  name: string;
  // 가격
  price: number;
  // 메뉴 설명
  description?: string;
};

type RestaurantReviewStatistics = {
  kakao?: RestaurantReviewKakaoStatistics;
  naver?: RestaurantReviewNaverStatistics;
};

type RestaurantReviewKakaoStatistics = {
  averageScore: number;
  count: number;
};

type RestaurantReviewNaverStatistics = {
  averageScore: number;
  count: number;
};

type RestaurantReviewItem = {
  reviewId: number;
  writerName: string;
  score: number;
  content: string;
  writtenAt: string;
};

type RestaurantReview = {
  statistics: RestaurantReviewStatistics;
  reviews: RestaurantReviewItem[];
  totalCount: number;
};
