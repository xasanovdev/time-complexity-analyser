import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import CodeComplexityAnalyzer, { ComplexityResult } from "../algorithms";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ComparisonResult {
  algorithm1: {
    code: string;
    result: ComplexityResult;
  };
  algorithm2: {
    code: string;
    result: ComplexityResult;
  };
  performanceData: Array<{
    input: number;
    algo1Time: number;
    algo2Time: number;
  }>;
}

export default function AlgorithmComparison() {
  const [algorithm1, setAlgorithm1] = useState(`function bubbleSort(arr) {
        let n = arr.length;
        for (let i = 0; i < n-1; i++) {
            for (let j = 0; j < n-i-1; j++) {
                if (arr[j] > arr[j+1]) {
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
        return arr;
    }`);
  const [algorithm2, setAlgorithm2] = useState(`function insertionSort(arr) {
        let n = arr.length;
        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i-1;
            while (j >= 0 && arr[j] > key) {
                arr[j+1] = arr[j];
                j = j-1;
            }
            arr[j+1] = key;
        }
        return arr;
    }`);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);

  const compareAlgorithms = () => {
    const result1 = CodeComplexityAnalyzer.analyzeCode(algorithm1);
    const result2 = CodeComplexityAnalyzer.analyzeCode(algorithm2);

    // Generate mock performance data
    const performanceData = Array.from({ length: 10 }, (_, i) => ({
      input: (i + 1) * 100,
      algo1Time: Math.pow(i + 1, 2) * 0.1,
      algo2Time: (i + 1) * 0.5,
    }));

    setComparison({
      algorithm1: { code: algorithm1, result: result1 },
      algorithm2: { code: algorithm2, result: result2 },
      performanceData,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Algorithm Comparison</h1>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Algorithm 1</h2>
          <Textarea
            value={algorithm1}
            onChange={(e) => setAlgorithm1(e.target.value)}
            placeholder="Paste first algorithm here..."
            className="h-48"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Algorithm 2</h2>
          <Textarea
            value={algorithm2}
            onChange={(e) => setAlgorithm2(e.target.value)}
            placeholder="Paste second algorithm here..."
            className="h-48"
          />
        </div>
      </div>

      <Button onClick={compareAlgorithms} className="mb-6">
        Compare Algorithms
      </Button>

      {comparison && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Algorithm 1 Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Time Complexity: {comparison.algorithm1.result.timeComplexity}</p>
                <p>Space Complexity: {comparison.algorithm1.result.spaceComplexity}</p>
                <p>Explanation: {comparison.algorithm1.result.explanation}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Algorithm 2 Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Time Complexity: {comparison.algorithm2.result.timeComplexity}</p>
                <p>Space Complexity: {comparison.algorithm2.result.spaceComplexity}</p>
                <p>Explanation: {comparison.algorithm2.result.explanation}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart width={800} height={400} data={comparison.performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="input" label={{ value: "Input Size", position: "bottom" }} />
                <YAxis label={{ value: "Time (ms)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="algo1Time" name="Algorithm 1" stroke="#8884d8" />
                <Line type="monotone" dataKey="algo2Time" name="Algorithm 2" stroke="#82ca9d" />
              </LineChart>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
