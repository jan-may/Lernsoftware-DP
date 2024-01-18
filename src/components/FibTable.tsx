import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableRow,
} from "../components/ui/table";

let fibData = [
  { n: 0, f: 0 },
  { n: 1, f: 1 },
  { n: 2, f: 1 },
  { n: 3, f: 2 },
  { n: 4, f: 3 },
  { n: 5, f: 5 },
  { n: 6, f: 8 },
  { n: 7, f: 13 },
  { n: 8, f: 21 },
];

export function FibTable() {
  return (
    <Table className="max-w-[650px] mb-8">
      <TableCaption>Fibonacci Folge</TableCaption>
      <TableBody>
        <TableRow>
          {fibData.map((item) => (
            <TableCell key={item.n}>
              <InlineMath math={`f(${item.n})`} />
            </TableCell>
          ))}
          <TableCell>
            <InlineMath math={`f(...)`} />
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          {fibData.map((item) => (
            <TableCell key={item.n}>
              <InlineMath math={`${item.f}`} />
            </TableCell>
          ))}
          <TableCell>...</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
