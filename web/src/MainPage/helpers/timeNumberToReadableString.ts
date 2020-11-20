export function timeNumberToReadableString(time: number): string {
  let result: string = "";
  let minutes = time;
  let hours;
  if (time > 60) {
    minutes = time % 60;
    hours = Math.floor(time / 60);
  }

  if (hours) {
    result = hours + " hours";
    if (hours < 2) {
      result = hours + " hour";
    }
  }
  if (minutes !== 0 && hours) {
    result += " and " + minutes + " minutes";
  }

  if (!hours) {
    result = minutes + " minutes";
  }

  return result;
}
