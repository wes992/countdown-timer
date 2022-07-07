export const getTimeDifference = (endTimeMS, startTimeMS) => {
  const nowMS = new Date().getTime();
  let _startTimeMS = startTimeMS || nowMS;
  const difference = endTimeMS - _startTimeMS;

  const _second = 1000;
  const _minute = _second * 60;
  const _hour = _minute * 60;
  const _day = _hour * 24;

  const day = Math.floor(difference / _day);
  const hour = Math.floor((difference % _day) / _hour);
  const min = Math.floor((difference % _hour) / _minute);
  const sec = Math.floor((difference % _minute) / _second);

  return {
    sec: cleanValue(sec),
    min: cleanValue(min),
    hour: cleanValue(hour),
    day: cleanValue(day),
  };
};

export const cleanValue = (value) => {
  return value > 0 ? value : 0;
};

export const getCountdownProgress = (countdown) => {
  const now = new Date().getTime();

  const countDownLength =
    Number(new Date(countdown.date).getTime()) - Number(countdown.createdAt);

  const timeElapsed = Number(now) - Number(countdown.createdAt);

  const currentProgress = Math.round((timeElapsed / countDownLength) * 100);

  return currentProgress <= 100 ? currentProgress : 100;
};

export const getFinishedText = () => {
  const finishedTexts = [
    "Woohoo, you made it!",
    "The wait is over",
    "This is going to be fun!",
    "Buckle up, here we go!",
  ];

  const randomIndex = Math.floor(Math.random() * finishedTexts.length);
  return finishedTexts[randomIndex];
};
