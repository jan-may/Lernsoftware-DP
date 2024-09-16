import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import {
  Problem,
  setSelectedProblem,
} from "../feautures/settings/settingsSlice";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select";

export const CodeSelect = () => {
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedProblem(value as Problem));
  }, [value, dispatch]);

  return (
    <>
      <form>
        <div className="form-group-select tour-2">
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Problemauswahl" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fibonacci">Fibonacci</SelectItem>
              <SelectItem value="canSum">CanSum</SelectItem>
              <SelectItem value="gridTraveler">GridTraveler</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </>
  );
};
