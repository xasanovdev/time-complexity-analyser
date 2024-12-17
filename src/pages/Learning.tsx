import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const timeComplexityData = [
  {
    title: "O(1) - Constant Time",
    description: "Operations that always take the same amount of time regardless of input size.",
    examples: ["Array access by index", "Push/pop from stack", "Basic arithmetic operations"],
    code: "function constantTime(arr) {\n  return arr[0];\n}"
  },
  {
    title: "O(log n) - Logarithmic Time",
    description: "Operations where the input size is repeatedly divided.",
    examples: ["Binary search", "Finding power using divide and conquer", "Certain balanced tree operations"],
    code: "function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}"
  },
  {
    title: "O(n) - Linear Time",
    description: "Operations that process each input element once.",
    examples: ["Linear search", "Array traversal", "Finding maximum/minimum"],
    code: "function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}"
  },
  {
    title: "O(n²) - Quadratic Time",
    description: "Nested iterations over the input.",
    examples: ["Bubble sort", "Selection sort", "Simple matrix multiplication"],
    code: "function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}"
  }
];

const spaceComplexityData = [
  {
    title: "O(1) - Constant Space",
    description: "Uses a fixed amount of extra space regardless of input size.",
    examples: ["Variables", "Simple loops with fixed variables", "Math operations"]
  },
  {
    title: "O(n) - Linear Space",
    description: "Extra space grows linearly with input size.",
    examples: ["Creating an array copy", "Stack calls in recursive functions", "Hash tables"]
  },
  {
    title: "O(n²) - Quadratic Space",
    description: "Extra space grows quadratically with input size.",
    examples: ["2D arrays", "Adjacency matrices", "Dynamic programming tables"]
  }
];

export default function Learning() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Learning Resources</h1>

      <Tabs defaultValue="time" className="space-y-4">
        <TabsList>
          <TabsTrigger value="time">Time Complexity</TabsTrigger>
          <TabsTrigger value="space">Space Complexity</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="time">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Time Complexity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Time complexity is a measure of how the runtime of an algorithm grows with respect to its input size.
                  Here are the most common time complexities you'll encounter:
                </p>
                <Accordion type="single" collapsible className="w-full">
                  {timeComplexityData.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{item.title}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>{item.description}</p>
                          <div>
                            <strong>Common examples:</strong>
                            <ul className="list-disc list-inside">
                              {item.examples.map((example, i) => (
                                <li key={i}>{example}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>Example implementation:</strong>
                            <pre className="bg-gray-100 p-4 rounded-lg mt-2">
                              <code>{item.code}</code>
                            </pre>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="space">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Space Complexity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Space complexity measures the total amount of memory space used by an algorithm,
                  including both auxiliary space and space used by input.
                </p>
                <Accordion type="single" collapsible className="w-full">
                  {spaceComplexityData.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{item.title}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>{item.description}</p>
                          <div>
                            <strong>Common examples:</strong>
                            <ul className="list-disc list-inside">
                              {item.examples.map((example, i) => (
                                <li key={i}>{example}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="practice">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Practice Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Practice analyzing time and space complexity with these common algorithm problems.
                  Try to solve them and analyze their complexity before checking the solutions.
                </p>
                {/* Add practice problems here */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
