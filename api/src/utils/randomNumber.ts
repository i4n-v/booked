export default function randomNumber(min: number, max: number) {
  const random = Math.random();
  const result = Math.floor(min + random * (max - min));
  return result;
}
