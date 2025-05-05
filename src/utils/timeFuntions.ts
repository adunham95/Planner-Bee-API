export function getTimeFifteenMinutesFromNow(): Date {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 15);
  return now;
}
