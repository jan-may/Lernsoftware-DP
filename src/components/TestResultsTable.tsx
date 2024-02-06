import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Microscope } from "lucide-react";

type ResultTableProbs = {
  result: string;
};

type Result = {
  input: string;
  status: string;
  output: string;
  expected: string;
};

export function TestResultsTable({ result }: ResultTableProbs) {
  const [showAllTests, setShowAllTests] = useState(false);
  const data: Result[] = result
    .split("\n")
    .filter((line) => line.trim())
    .map((line, _index) => {
      const parts = line.split(" ");
      return {
        input: parts[0],
        output: parts[2],
        expected: parts[1],
        status:
          parts[3] == "passed" ? parts[3] + " \u2705" : parts[3] + " \u274C",
      };
    });

  const total_passed = data.filter((res) =>
    res.status.includes("passed")
  ).length;
  const total = data.length;

  return (
    <>
      <Table>
        {showAllTests && (
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]">Test#</TableHead>
              <TableHead>Input</TableHead>
              <TableHead>Erwartet</TableHead>
              <TableHead>Output</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          <TableRow>
            <TableCell colSpan={1}>
              <Button
                onClick={() => setShowAllTests(!showAllTests)}
                size="sm"
                variant="link"
                className="pl-0"
              >
                <Microscope size={18} className="mr-2" /> Testbericht
                {showAllTests ? " ausblenden" : " anzeigen"}
              </Button>
            </TableCell>
            <TableCell colSpan={4}></TableCell>
          </TableRow>
          {showAllTests &&
            data.map((res, i) => (
              <TableRow key={i + 1}>
                <TableCell className="py-1">{i + 1}</TableCell>
                <TableCell className="py-1">{res.input}</TableCell>
                <TableCell className="py-1">{res.expected}</TableCell>
                <TableCell className="py-1">{res.output}</TableCell>
                <TableCell className="py-1">{res.status}</TableCell>
              </TableRow>
            ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={1}>Bestanden: </TableCell>
            <TableCell colSpan={3}>
              {total_passed}/{total}
            </TableCell>
            <TableCell colSpan={1}>
              {total_passed === total
                ? "passed" + " \u2705"
                : "failed" + " \u274C"}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
