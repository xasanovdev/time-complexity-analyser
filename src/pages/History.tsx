import { useState, useEffect } from "react";
import { ComplexityResult } from "../algorithms";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";

export default function History() {
  const [history, setHistory] = useState<Array<{
    code: string;
    result: ComplexityResult;
    timestamp: string;
  }>>([]);

  useEffect(() => {
    // In a real app, this would fetch from localStorage or a backend
    const mockHistory = [
      {
        code: "function example(n) { return n + 1; }",
        result: {
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
          explanation: "Simple constant time operation"
        },
        timestamp: new Date().toISOString()
      },
      // Add more mock data as needed
    ];
    setHistory(mockHistory);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analysis History</h1>
      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {history.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>Analysis #{index + 1}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg mb-4">
                  <code>{item.code}</code>
                </pre>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Time Complexity</h3>
                    <p>{item.result.timeComplexity}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Space Complexity</h3>
                    <p>{item.result.spaceComplexity}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold">Explanation</h3>
                  <p>{item.result.explanation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
