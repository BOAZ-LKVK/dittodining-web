export type Restaurant = {
  rastaurantId: string;
  name: string;
  // 캐치프레이즈 e.g. 부드러운 치즈버거가 일품인 수제버거 전문점
  catchphrase: string;
  // 인당 가격대 e.g. ₩7,000 ~ ₩10,000
  priceRangePerPerson: string;
  // 거리 e.g. 200m (도보 5분)
  distance: string;
  imageUrl: string;
  // TODO: 위도, 경도 추가
};
