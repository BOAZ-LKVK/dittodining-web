import { Header } from "@/components/header";
import Image from "next/image";

export default function RecommendationPage() {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center">
        <main className="flex-1 w-full bg-white p-4">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/food.png"
              alt="food"
              width={400}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="mt-4 text-gray-700 text-sm">
            <p className="text-orange-600 font-semibold">
              부드러운 치즈버거가 일품인 수제버거 전문점
            </p>
            <div className="flex space-x-2 mt-2">
              <h2 className="text-xl font-bold">덮밥집 목동점</h2>
              <p className="text-gray-500 mt-1">
                200m (도보 5분) |{" "}
                <a href="#" className="text-blue-600">
                  길찾기 바로가기
                </a>
              </p>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">리뷰</h3>
              <span className="mx-2">|</span>
              <span className="text-gray-700">카카오 4.3점(124)</span>
              <span className="text-gray-700">네이버 4.5점(242)</span>
            </div>
          </div>

          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <p className="font-bold">요아소비빠따정 ★★★★☆</p>
            <p className="text-gray-700 text-sm mt-1">
              진짜로 여기에서는 트리플치즈버거 드셔야합니다. 패티 육즙은 말할
              것도 없고, 일단 버거 번이 입을 정도로 부드러워요. 근데 이게 패티의
              육즙이랑 만난다? 그냥 게임 끝납니다.
            </p>
            <p className="text-gray-500 text-xs mt-2">2024.08.17</p>
          </div>
        </main>

        <footer className="w-full flex justify-between bg-white p-4 mb-4 fixed bottom-0 left-0 right-0">
          <button className="flex-1 py-2 text-center bg-gray-300 rounded-md mr-2">
            NO
          </button>
          <button className="flex-1 py-2 text-center bg-orange-600 text-white rounded-md">
            YES (0/3)
          </button>
        </footer>
      </div>
    </div>
  );
}
