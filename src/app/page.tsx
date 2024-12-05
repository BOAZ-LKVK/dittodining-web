"use client";
import { LoadingIcon } from "@/assets/icons/LoadingIcon";
import { Header } from "@/components/header";
import { useHomePage } from "@/hooks/use-home-page";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function Home() {
  const { isAvailableLocation, setIsAvailableLocation, onClickStartButton, userLocation, setUserLocation, isLoading } = useHomePage();

  const onDrag = (map: kakao.maps.Map) => {
    const center = map.getCenter();

    setUserLocation({
      latitude: center.getLat(),
      longitude: center.getLng(),
    });
  };

  return (
    <div className="flex flex-col w-full h-dvh bg-white items-center">
      <Header />

      <div className="text-center px-4 flex-2">
        <p className="mt-2 text-xl font-semibold text-gray-800 text-secondary">
          현재 위치를 선택하고 <br />
          주변 맛집을 찾아보세요!
        </p>
      </div>

      <main className="flex flex-col flex-grow w-full max-w-md mt-6 rounded-lg overflow-auto">
        <div className="flex-1 bg-gray-200 w-full relative">
          <div className="w-full h-full">
            <Map
              center={{ lat: userLocation.latitude, lng: userLocation.longitude }}
              className="w-full h-full"
              onDrag={onDrag}
            >
              <MapMarker position={{ lat: userLocation.latitude, lng: userLocation.longitude }}>
              </MapMarker>
            </Map>
            {!isLoading &&
              <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                <LoadingIcon />
                <span className="sr-only">Loading...</span>
              </div>
            }

            {!isAvailableLocation && (
              <div className="z-10 absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
                onClick={() => { setIsAvailableLocation(true) }}>
                <p className="text-white text-lg font-semibold text-center px-4">
                  현재 위치는 지원하지 않는 지역입니다. <br />
                  다른 위치를 선택해주세요.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-2">
          <button
            className="w-full py-4 bg-orange-600 text-white text-lg rounded-b-lg shadow"
            onClick={onClickStartButton}
            disabled={!isAvailableLocation}
          >
            주변 맛집 찾기
          </button>
        </div>
      </main >
    </div >
  );
}
