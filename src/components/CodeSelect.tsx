import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select";

export const CodeSelect = () => {
  return (
    <>
      <form>
        <div className="form-group-select">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Problemauswahl" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Fibonacci</SelectItem>
              <SelectItem value="dark">CanSum</SelectItem>
              <SelectItem value="system">GridTraveler</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </>
  );
};
