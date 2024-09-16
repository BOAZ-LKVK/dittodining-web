


// TODO: 좀 더 적절한 방법이 있다면 그 방법을 활용
export const formatNumberWithCommas = (num: number): string => {
  // 숫자를 문자열로 변환한 후, 정규식을 사용해 세 자리마다 쉼표를 삽입
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

