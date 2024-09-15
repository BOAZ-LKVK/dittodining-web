import axios, { AxiosRequestConfig } from "axios";

// TODO: Replace with actual API base URL using environment variables
const API_BASE_URL = "localhost:8080";

const API_PATH = {
  REQUEST_RESTAUNRANT_RECOMMENDATION: "/api/recommendation",
  LIST_RECOMMENDED_RESTAURANTS: (restaurantRecommendationRequestID: number) =>
    `/api/recommendation/${restaurantRecommendationRequestID}/restaurants`,
  SELECT_RESTAURANT_RECOMMENDATION: (
    restaurantRecommendationRequestID: number
  ) => `/api/recommendation/${restaurantRecommendationRequestID}/select`,
  GET_RESTAURANT_RECOMMENDATION_RESULT: (
    restaurantRecommendationRequestID: number
  ) => `/api/recommendation/${restaurantRecommendationRequestID}/result`,
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

export const requestRestaurantRecommendation = async () => {
  const response = await api().post(
    API_PATH.REQUEST_RESTAUNRANT_RECOMMENDATION
  );
  return response.data;
};

export const listRecommendedRestaurants = async (
  restaurantRecommendationRequestID: number
) => {
  const response = await api().get(
    API_PATH.LIST_RECOMMENDED_RESTAURANTS(restaurantRecommendationRequestID)
  );
  return response.data;
};

export const selectRestaurantRecommendation = async (
  restaurantRecommendationRequestID: number
) => {
  const response = await api().post(
    API_PATH.SELECT_RESTAURANT_RECOMMENDATION(restaurantRecommendationRequestID)
  );
  return response.data;
};

export const getRestaurantRecommendationResult = async (
  restaurantRecommendationRequestID: number
) => {
  const response = await api().get(
    API_PATH.GET_RESTAURANT_RECOMMENDATION_RESULT(
      restaurantRecommendationRequestID
    )
  );
  return response.data;
};
