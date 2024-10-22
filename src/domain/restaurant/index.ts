import { BusinessHour, makeDayOfWeek } from "@/api/api";
import { formatNumberWithCommas } from "@/utils/number";

export const makePriceRangePerPerson = (
  minimumPricePerPerson: number,
  maximumPricePerPerson: number
): string => {
  return `₩ ${formatNumberWithCommas(
    minimumPricePerPerson
  )}~${formatNumberWithCommas(maximumPricePerPerson)}`;
};

export const makeDistance = (distanceInMeters: number): string => {
  // 인간이 100m 를 걷는 시간 평균 72초 -> 80m를 1분으로 계산
  return `${distanceInMeters}m(도보 ${Math.ceil(distanceInMeters / 80)}분)`;
};

export const makeOpenTimeToday = (
  businessHours: BusinessHour[]
): string | undefined => {
  const now = new Date();

  const businessHourToday = businessHours.find(
    (businessHour) => businessHour.dayOfWeekEnum === makeDayOfWeek(now)
  );

  if (businessHourToday === undefined) {
    return undefined;
  }

  if (businessHourToday.isClosedDay) {
    return "오늘 휴무";
  }

  return `${businessHourToday.openTime}~${businessHourToday.closingTime}`;
};
