export const getTimeDifference = (endTimeMS) => {
  const nowMS = new Date().getTime();
  const difference = endTimeMS - nowMS;

  const _second = 1000;
  const _minute = _second * 60;
  const _hour = _minute * 60;
  const _day = _hour * 24;

  const day = Math.floor(difference / _day);
  const hour = Math.floor((difference % _day) / _hour);
  const min = Math.floor((difference % _hour) / _minute);
  const sec = Math.floor((difference % _minute) / _second);

  return {
    sec,
    min,
    hour,
    day,
  };
};
