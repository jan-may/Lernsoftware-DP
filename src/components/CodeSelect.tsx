import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { setSelectedProblem } from "../feautures/settings/settingsSlice";
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
    dispatch(setSelectedProblem(value));
  }, [value, dispatch]);

  return (
    <>
      <form>
        <div className="form-group-select">
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Problemauswahl" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fibonacci">Fibonacci</SelectItem>
              <SelectItem value="CanSum" disabled>
                CanSum
              </SelectItem>
              <SelectItem value="GridTraveler" disabled>
                GridTraveler
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </>
  );
};
