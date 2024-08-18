// API로 받아온 배열 형식의 날짜를 ISO 형식(UTC 날짜 문자열)으로 변환합니다.
export const convertArrayToUTCDate = (dateArray) => {
  // 형식 유효성 검증
  if (!Array.isArray(dateArray) || dateArray.length < 3) {
    return "Invalid Date";
  }

  const [year, month, day, hour = 0, minute = 0, second = 0] = dateArray;
  const utcDate = new Date(
    Date.UTC(year, month - 1, day, hour, minute, second)
  );

  // ISO 형식으로 변환하여 날짜와 시간을 함께 출력합니다.(마이크로초 포함)
  const isoString = utcDate.toISOString();
  const formattedDate = isoString.replace("T", " ").substring(0, 19);

  return formattedDate;
};
