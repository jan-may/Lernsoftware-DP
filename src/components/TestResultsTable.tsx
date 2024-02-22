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

type ResultTableProps = {
  result: string;
  error?: string;
};

type Result = {
  input: string;
  status: string;
  output: string;
  expected: string;
  time: string;
};

export function TestResultsTable({ result, error }: ResultTableProps) {
  const [showAllTests, setShowAllTests] = useState(false);

  // get total time
  const TotalTime = result
    .split("\n")
    .filter((line) => line.startsWith("--TotalTime--"))
    .map((line) => line.split("--TotalTime--")[1])[0];

  const data: Result[] = result
    .split("\n")
    .filter((line) => line.startsWith("--TestBegin--") && line.trim())
    .map((line, _index) => {
      line.split("--TestBegin--");
      // delete whitespace
      line = line.replace(/\s+/g, " ");
      const parts = line.split(" ");

      return {
        input: parts[1],
        output: parts[3],
        expected: parts[2],
        status:
          parts[4] == "passed" ? parts[4] + " \u2705" : parts[4] + " \u274C",
        time: parts[5],
      };
    });

  // check last line

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
              <TableHead>Input</TableHead>
              <TableHead>Erwartet</TableHead>
              <TableHead>Output</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Zeit</TableHead>
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          <TableRow>
            <TableCell colSpan={1} className="py-1">
              <Button
                onClick={() => setShowAllTests(!showAllTests)}
                size="sm"
                variant="link"
                className="pl-0"
                disabled={error ? true : false}
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
                <TableCell className="py-1">{res.input}</TableCell>
                <TableCell className="py-1">{res.expected}</TableCell>
                <TableCell className="py-1">{res.output}</TableCell>
                <TableCell className="py-1">{res.status}</TableCell>
                <TableCell className="py-1">{res.time}</TableCell>
              </TableRow>
            ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={1}>Bestanden: </TableCell>
            <TableCell colSpan={2}>
              {total_passed}/{total}
            </TableCell>
            <TableCell colSpan={1}>
              {error
                ? "failed" + " \u274C"
                : total_passed === total
                ? "passed" + " \u2705"
                : "failed" + " \u274C"}
            </TableCell>
            <TableCell colSpan={1}>{TotalTime} </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
