type PerformanceResult = {
  timeComplexity: string;
  spaceComplexity: string;
  executionTimes: number[];
  memoryUsage: number[];
  inputSizes: number[];
};

export class AlgorithmAnalyzer {
  private static readonly ITERATIONS = 5;
  private static readonly INPUT_SIZES = [100, 1000, 10000, 100000];

  static analyze(
    algorithm: (input: any) => any,
    generateInput: (size: number) => any
  ): PerformanceResult {
    const executionTimes: number[] = [];
    const memoryUsage: number[] = [];
    const inputSizes = [...AlgorithmAnalyzer.INPUT_SIZES];

    // Measure performance for different input sizes
    for (const size of inputSizes) {
      const { avgTime, avgMemory } = this.measurePerformance(
        algorithm,
        generateInput,
        size
      );
      executionTimes.push(avgTime);
      memoryUsage.push(avgMemory);
    }

    return {
      timeComplexity: this.determineTimeComplexity(inputSizes, executionTimes),
      spaceComplexity: this.determineSpaceComplexity(inputSizes, memoryUsage),
      executionTimes,
      memoryUsage,
      inputSizes,
    };
  }

  private static measurePerformance(
    algorithm: (input: any) => any,
    generateInput: (size: number) => any,
    size: number
  ): { avgTime: number; avgMemory: number } {
    let totalTime = 0;
    let totalMemory = 0;

    for (let i = 0; i < this.ITERATIONS; i++) {
      const input = generateInput(size);

      // Use browser performance API
      const startTime = performance.now();

      algorithm(input);

      const endTime = performance.now();

      // Estimate memory usage (browser limitations)
      const estimatedMemory = this.estimateMemoryUsage(input);

      totalTime += endTime - startTime;
      totalMemory += estimatedMemory;
    }

    return {
      avgTime: totalTime / this.ITERATIONS,
      avgMemory: totalMemory / this.ITERATIONS,
    };
  }

  // Rough estimation of memory usage
  private static estimateMemoryUsage(input: any): number {
    try {
      // Approximate memory usage based on input size
      return JSON.stringify(input).length;
    } catch {
      return 0;
    }
  }

  // Rest of the methods remain the same as in previous implementation
  private static determineTimeComplexity(
    sizes: number[],
    times: number[]
  ): string {
    const growthRates = this.calculateGrowthRates(sizes, times);
    return this.determineBigONotation(growthRates);
  }

  private static determineSpaceComplexity(
    sizes: number[],
    memory: number[]
  ): string {
    const growthRates = this.calculateGrowthRates(sizes, memory);
    return this.determineBigONotation(growthRates);
  }

  private static calculateGrowthRates(
    sizes: number[],
    measurements: number[]
  ): number[] {
    const growthRates: number[] = [];
    for (let i = 1; i < measurements.length; i++) {
      const rate =
        Math.log(measurements[i] / measurements[i - 1]) /
        Math.log(sizes[i] / sizes[i - 1]);
      growthRates.push(rate);
    }
    return growthRates;
  }

  private static determineBigONotation(growthRates: number[]): string {
    const avgGrowth = growthRates.reduce((a, b) => a + b) / growthRates.length;

    if (avgGrowth <= 0.1) return "O(1)";
    if (avgGrowth <= 1.2) return "O(log n)";
    if (avgGrowth <= 1.5) return "O(n)";
    if (avgGrowth <= 2.2) return "O(n log n)";
    if (avgGrowth <= 2.5) return "O(n²)";
    if (avgGrowth <= 3.5) return "O(n³)";
    return "O(2ⁿ)";
  }
}
