import { Header } from "@/components/header";
import Map from "@/components/map";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center">
        <main className="flex-1 w-full max-w-md mt-4 flex flex-col">
          <div className="h-full">
            {/* 지도 컴포넌트 */}
            <Map />
          </div>

          {/* "주변 맛집 찾기" 버튼 */}
          <div className="mt-6">
            <Link href="/recommend">
              <button className="w-full py-3 bg-orange-600 text-white text-lg rounded-lg shadow">
                주변 맛집 찾기
              </button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
