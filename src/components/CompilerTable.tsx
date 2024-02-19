import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { CompilerResponse } from "../types/CompilerTypes";

type ResultTableProps = {
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

export function CompilerTable({ response }: ResultTableProps) {
  if (response.status === 0) {
    // if no error filter out debug infos and Testcases to show user stdout
    response.filteredStdout = response.stdout
      .split("\n")
      .slice(3, -5)
      .filter((line) => !line.startsWith("--TestBegin--") && line.trim())
      .join("\n");
  } else {
    // if error show error message
    response.filteredStdout = response.stdout
      .split("\n")
      .filter((line) => !line.startsWith("--TestBegin--") && line.trim())
      .join("\n");
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">Field</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <>
            <TableContent text="Runtime" value={response.language_name} />
            <TableContent text="Status_Code" value={`${response.status}`} />
            <TableContent
              text="Compiler_Output"
              value={response.compile_output}
            />
            <TableContent text="Message" value={response.message} />
            <TableContent text="stdout" value={response.filteredStdout} />
            <TableContent text="stderr" value={response.stderr} />
          </>
        </TableBody>
      </Table>
    </>
  );
}
