import { useEffect, useState } from "react";

type Params = {
  placeName: string,
  latitude: number,
  longitude: number
  userLocation: {
    latitude: number | null;
    longitude: number | null;
  } | null
}

export const KakaoMapLink = ({ userLocation, placeName, latitude, longitude }: Params) => {
  const kakaoMapUrl = userLocation?.latitude && userLocation?.longitude
    ? `https://map.kakao.com/link/from/내위치,${userLocation.latitude},${userLocation.longitude}/to/${placeName},${latitude},${longitude}`
    : `https://map.kakao.com/link/to/${placeName},${latitude},${longitude}`;

  return (
    <a href={kakaoMapUrl} target="_blank" rel="noopener noreferrer">
      {placeName} 길찾기
    </a>
  );
};
