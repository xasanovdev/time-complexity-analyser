
const analyzeArraySort = () => {
  // Analyze built-in array sort
  const result = AlgorithmAnaly.analyze(
    (arr: number[]) => arr.sort((a, b) => a - b),
    (size: number) =>
      Array.from({ length: size }, () => Math.floor(Math.random() * size))
  );

  console.log("Time Complexity:", result.timeComplexity);
  console.log("Space Complexity:", result.spaceComplexity);
  console.log("Execution Times (ms):", result.executionTimes);
  console.log("Memory Usage (bytes):", result.memoryUsage);
};

analyzeArraySort();
