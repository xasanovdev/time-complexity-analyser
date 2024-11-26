import * as ts from "typescript";

interface ComplexityDetail {
  line: number;
  type: string;
  impact: string;
  description: string;
}

export interface ComplexityResult {
  timeComplexity: string;
  spaceComplexity: string;
  details: ComplexityDetail[];
  recommendations: string[];
  codeStructure: {
    loops: number;
    nestedLoops: number;
    recursiveFunctions: string[];
    conditions: number;
  };
}

class CodeComplexityAnalyzer {
  private sourceFile: ts.SourceFile;
  private details: ComplexityDetail[] = [];
  private loopStack: number[] = [];
  private maxNestedLoopLevel = 0;
  private recursiveFunctions: string[] = [];
  private conditionCount = 0;
  private variableCount = 0;

  constructor(code: string) {
    this.sourceFile = ts.createSourceFile(
      "temp.ts",
      code,
      ts.ScriptTarget.Latest,
      true
    );
  }

  private analyzeNode(node: ts.Node, functionContext?: string): void {
    switch (node.kind) {
      case ts.SyntaxKind.ForStatement:
      case ts.SyntaxKind.ForInStatement:
      case ts.SyntaxKind.ForOfStatement:
      case ts.SyntaxKind.WhileStatement:
      case ts.SyntaxKind.DoStatement:
        this.handleLoopNode(node);
        break;

      case ts.SyntaxKind.IfStatement:
      case ts.SyntaxKind.SwitchStatement:
        this.handleConditionNode(node);
        break;

      case ts.SyntaxKind.VariableDeclaration:
        this.variableCount++;
        break;

      case ts.SyntaxKind.FunctionDeclaration:
        this.handleFunctionNode(node as ts.FunctionDeclaration);
        break;

      case ts.SyntaxKind.Block:
        ts.forEachChild(node, (childNode) =>
          this.analyzeNode(childNode, functionContext)
        );
        break;
    }

    ts.forEachChild(node, (childNode) =>
      this.analyzeNode(childNode, functionContext)
    );
  }

  private handleLoopNode(node: ts.Node): void {
    this.loopStack.push(this.loopStack.length + 1);
    this.maxNestedLoopLevel = Math.max(
      this.maxNestedLoopLevel,
      this.loopStack.length
    );

    const lineNumber = this.getLineNumber(node);
    this.details.push({
      line: lineNumber,
      type: "loop",
      impact: this.getLoopComplexity(this.loopStack.length),
      description: `Nested loop at level ${this.loopStack.length}`,
    });

    ts.forEachChild(node, (childNode) => this.analyzeNode(childNode));
    this.loopStack.pop();
  }

  private handleConditionNode(node: ts.Node): void {
    this.conditionCount++;
    const lineNumber = this.getLineNumber(node);
    this.details.push({
      line: lineNumber,
      type: "condition",
      impact: "Increases code complexity",
      description: "Conditional statement detected",
    });
  }

  private handleFunctionNode(node: ts.FunctionDeclaration): void {
    const functionName = node.name?.getText() || "anonymous";
    const isRecursive = this.checkRecursion(node, functionName);

    if (isRecursive) {
      this.recursiveFunctions.push(functionName);
      this.details.push({
        line: this.getLineNumber(node),
        type: "recursion",
        impact: "Potentially exponential complexity O(2^n)",
        description: `Recursive function detected: ${functionName}`,
      });
    }

    ts.forEachChild(node, (childNode) =>
      this.analyzeNode(childNode, functionName)
    );
  }

  private checkRecursion(
    node: ts.FunctionDeclaration,
    functionName: string
  ): boolean {
    let isRecursive = false;

    const checkForRecursion = (searchNode: ts.Node) => {
      if (ts.isCallExpression(searchNode)) {
        const calledFunction = searchNode.expression.getText();
        if (calledFunction === functionName) {
          isRecursive = true;
        }
      }
      ts.forEachChild(searchNode, checkForRecursion);
    };

    ts.forEachChild(node.body!, checkForRecursion);
    return isRecursive;
  }

  private getLineNumber(node: ts.Node): number {
    return (
      this.sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1
    );
  }

  private getLoopComplexity(nestingLevel: number): string {
    if (nestingLevel === 1) return "Linear complexity O(n)";
    return `Polynomial complexity O(n^${nestingLevel})`;
  }

  private determineTimeComplexity(): string {
    if (this.recursiveFunctions.length > 0) return "O(2^n)";
    if (this.maxNestedLoopLevel > 1) return `O(n^${this.maxNestedLoopLevel})`;
    if (this.maxNestedLoopLevel === 1) return "O(n)";
    return "O(1)";
  }

  private determineSpaceComplexity(): string {
    if (this.recursiveFunctions.length > 0) return "O(n)";
    if (this.variableCount > 10) return "O(n)";
    return "O(1)";
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];

    if (this.maxNestedLoopLevel > 1) {
      recommendations.push(
        "Reduce nested loops to improve algorithmic complexity"
      );
    }

    if (this.recursiveFunctions.length > 0) {
      recommendations.push(
        "Convert recursive functions to iterative implementations",
        `Recursive functions detected: ${this.recursiveFunctions.join(", ")}`
      );
    }

    if (this.variableCount > 10) {
      recommendations.push(
        "Optimize variable usage to reduce memory footprint"
      );
    }

    if (this.conditionCount > 5) {
      recommendations.push("Consider refactoring complex conditional logic");
    }

    return recommendations;
  }

  analyze(): ComplexityResult {
    this.analyzeNode(this.sourceFile);

    return {
      timeComplexity: this.determineTimeComplexity(),
      spaceComplexity: this.determineSpaceComplexity(),
      details: this.details.filter(
        (detail, index, self) =>
          index === self.findIndex((d) => d.line === detail.line)
      ),

      recommendations: this.generateRecommendations(),
      codeStructure: {
        loops: this.loopStack.length,
        nestedLoops: this.maxNestedLoopLevel,
        recursiveFunctions: this.recursiveFunctions,
        conditions: this.conditionCount,
      },
    };
  }

  static analyzeCode(code: string): ComplexityResult {
    const analyzer = new CodeComplexityAnalyzer(code);
    return analyzer.analyze();
  }
}

export default CodeComplexityAnalyzer;
