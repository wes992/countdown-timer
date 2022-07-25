import dayjs from "dayjs";

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
    Number(new Date(countdown.endDate).getTime()) -
    Number(new Date(countdown.createdAt).getTime());

  const timeElapsed = Number(now) - Number(countdown.createdAt);

  const currentProgress = Math.round((timeElapsed / countDownLength) * 100);

  return currentProgress <= 100 ? currentProgress : 100;
};

const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

export const getFinishedText = () => {
  const finishedTexts = [
    "Woohoo, you made it!",
    "The wait is over!",
    "This is going to be fun!",
    "Buckle up, here we go!",
  ];

  return finishedTexts[getRandomIndex(finishedTexts)];
};

export const getBackgroundImage = () => {
  const options = [
    "linear-gradient(to bottom right, red, blue)",
    "linear-gradient(to bottom right, white, steelblue)",
    "linear-gradient(to bottom right, purple, coral)",
  ];

  return options[getRandomIndex(options)];
};

export const formatDate = (date, format = "MMM D, YYYY") => {
  return dayjs(date).format(format);
};
