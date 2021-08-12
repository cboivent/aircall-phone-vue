
export const capitalize = (value: string): string => {
  if (!value) {
    return '';
  }
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const convertMillisecondsToHumanReadableTime = (ms: number): string => {
  const hours = Math.floor(ms / 3600000); // 1 Hour = 36000 Milliseconds
  const minutes = Math.floor((ms % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds
  const seconds = Math.floor(((ms % 360000) % 60000) / 1000); // 1 Second = 1000 Milliseconds

  //
  let s = '';
  if (hours > 0) {
    s += `${hours} hour` + (hours > 1 ? 's' : '');
  }
  if (minutes > 0) {
    s += ` ${minutes} minute` + (minutes > 1 ? 's' : '');
  }
  if (seconds > 0) {
    s += ` ${seconds} second` + (seconds > 1 ? 's' : '');
  }
  return s.trim();
};

export const formatPhoneNumber = (str: string): string => {
  const result = (str.length > 3) ? '(' + str.substr(0,3) + ') ' + str.substr(3, str.length) : str
  return result
}
