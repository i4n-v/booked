function randomNumbers(min: number, max: number, total: number) {
  const numbers: Set<number> = new Set();

  while (numbers.size < total) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(randomNum);
  }

  return Array.from(numbers);
}

export default randomNumbers;
