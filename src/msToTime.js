export default function(milliseconds) {
  const minutes = Math.trunc(milliseconds / 60000);
  let seconds = Math.trunc(milliseconds / 1000) % 60;
  let centiseconds = Math.trunc(milliseconds / 10) % 100;

  // Add leading zeros
  centiseconds = ("0" + centiseconds).substr(-2);
  if (minutes > 0 && seconds < 10) {
    seconds = "0" + seconds;
  }

  return minutes === 0 ? `${seconds}.${centiseconds}` : `${minutes}:${seconds}.${centiseconds}`;
}