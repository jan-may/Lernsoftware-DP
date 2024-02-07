import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Info } from "lucide-react";
import { CompilerResponse } from "../types/CompilerTypes";

type ResultTableProbs = {
  response: CompilerResponse;
};

function TableContent({
  text,
  value,
}: {
  text: string;
  value: string | number;
}) {
  return (
    <TableRow>
      <TableCell colSpan={1}>{text}</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
}

export function CompilerTable({ response }: ResultTableProbs) {
  const [showCompilerInfo, setShowCompilerInfo] = useState(false);

  response.filteredStdout = response.stdout
    .split("\n")
    .filter((line) => !line.startsWith("--TestBegin--") && line.trim())
    .join("\n");

  console.log(response.filteredStdout);

  return (
    <>
      <Button
        onClick={() => setShowCompilerInfo(!showCompilerInfo)}
        size="sm"
        variant="link"
        className="p-4 mt-2"
      >
        <Info size={18} className="mr-2" /> Compiler Info
        {showCompilerInfo ? " ausblenden" : " anzeigen"}
      </Button>
      <Table>
        {showCompilerInfo && (
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]">Field</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {showCompilerInfo && (
            <>
              <TableContent text="Runtime" value={response.language_name} />
              <TableContent
                text="Status_Code"
                value={`${response.status_id} (${response.status_msg})`}
              />
              <TableContent
                text="Compiler_Output"
                value={response.compile_output}
              />
              <TableContent text="Message" value={response.message} />
              <TableContent text="stdout" value={response.filteredStdout} />
              <TableContent text="stderr" value={response.stderr} />
              <TableContent text="Memory" value={response.memory + " bytes"} />
              <TableContent
                text="Wall_time"
                value={response.wall_time + " s"}
              />
            </>
          )}
        </TableBody>
      </Table>
    </>
  );
}
