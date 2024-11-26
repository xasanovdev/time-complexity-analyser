import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { ComplexityResult } from "../algorithms";
import { Separator } from "./ui/separator";

interface CodeComplexityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: ComplexityResult;
}

export function CodeComplexityDialog({
  isOpen,
  onClose,
  data,
}: CodeComplexityDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Code Complexity Analysis Results</DialogTitle>
          <DialogDescription>
            Review the complexity analysis of your code below.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow">
          <div className="space-y-4 p-4">
            <ComplexityOverview
              timeComplexity={data.timeComplexity}
              spaceComplexity={data.spaceComplexity}
            />
            <Separator />
            <CodeDetails details={data.details} />
            <Separator />
            <Recommendations recommendations={data.recommendations} />
            <Separator />
            <CodeStructure structure={data.codeStructure} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function ComplexityOverview({
  timeComplexity,
  spaceComplexity,
}: {
  timeComplexity: string;
  spaceComplexity: string;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Complexity Overview</h3>
      <div className="flex space-x-4">
        <Badge variant="outline" className="text-sm">
          Time Complexity: {timeComplexity}
        </Badge>
        <Badge variant="outline" className="text-sm">
          Space Complexity: {spaceComplexity}
        </Badge>
      </div>
    </div>
  );
}

function CodeDetails({ details }: { details: ComplexityResult["details"] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Code Details</h3>
      <ul className="space-y-2">
        {details.map((detail, index) => (
          <li key={index} className="flex items-start space-x-2">
            <span className="mt-1">
              {detail.type === "loop" ? (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              ) : (
                <Info className="h-5 w-5 text-blue-500" />
              )}
            </span>
            <div>
              <p className="font-medium">
                Line {detail.line}: {detail.type}
              </p>
              <p className="text-sm text-gray-600">{detail.impact}</p>
              <p className="text-sm">{detail.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Recommendations({ recommendations }: { recommendations: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
      <ul className="space-y-2">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="flex items-start space-x-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
            <span>{recommendation}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CodeStructure({
  structure,
}: {
  structure: ComplexityResult["codeStructure"];
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Code Structure</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-medium">Loops: {structure.loops}</p>
          <p className="font-medium">Nested Loops: {structure.nestedLoops}</p>
        </div>
        <div>
          <p className="font-medium">
            Recursive Functions: {structure.recursiveFunctions.length}
          </p>
          <p className="font-medium">Conditions: {structure.conditions}</p>
        </div>
      </div>
    </div>
  );
}
