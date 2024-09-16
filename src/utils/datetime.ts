// TODO: 정규식과 같은 더 좋은 방법이 있다면 수정
export const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();

  // 월 추출 (0부터 시작하므로 +1 필요) -> 2자리로 포맷
  const month = String(date.getMonth() + 1).padStart(2, "0");

  // 일 추출 -> 2자리로 포맷
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};
