"use client";
import { Header } from "@/components/header";
import Map from "@/components/map";
import { SESSION_STORAGE_KEY } from "@/components/session-storage";
import Link from "next/link";

export default function Home() {
  const onClickStartButton = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY.selectedRestaurantIds);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white h-screen">
      <Header />
      <div className="flex flex-col items-center h-full w-full">
        <main className="flex flex-col w-full max-w-md mt-4 h-full">
          <div className="flex-1">
            {/* 지도 컴포넌트 */}
            <Map />
          </div>

          {/* "주변 맛집 찾기" 버튼 */}
          <div className="flex-2">
            <Link href="/recommend">
              <button
                className="w-full py-3 bg-orange-600 text-white text-lg rounded-b-lg shadow"
                onClick={onClickStartButton}
              >
                주변 맛집 찾기
              </button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
