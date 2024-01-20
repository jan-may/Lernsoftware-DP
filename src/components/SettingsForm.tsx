import { useEffect, useState } from "react";
import {
  setCircleRadius,
  setInput,
  setInputText,
  setSpeed,
  setHorizontalSpacing,
  setVerticalSpacing,
  ActionCreators,
} from "../feautures/settings/settingsSlice";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { ActivButton } from "../feautures/navbar/navbarSlice";

interface LocalDimensions {
  horizontalSpacing: number;
  verticalSpacing: number;
  circleRadius: number;
}

const actionCreators: ActionCreators = {
  input: setInput,
  speed: setSpeed,
  horizontalSpacing: setHorizontalSpacing,
  verticalSpacing: setVerticalSpacing,
  circleRadius: setCircleRadius,
};

export const SettingsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((store) => store.settings);
  const { activeButton } = useAppSelector((store) => store.navbar);
  const [localDimensions, setLocalDimensions] = useState<LocalDimensions>({
    horizontalSpacing: settings.horizontalSpacing,
    verticalSpacing: settings.verticalSpacing,
    circleRadius: settings.circleRadius,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    [
      "input",
      "speed",
      "verticalSpacing",
      "horizontalSpacing",
      "circleRadius",
    ].forEach((field) => {
      const value = getValueFromForm(form, `.form-input[name="${field}"]`);
      if (value !== null) {
        const actionCreator = actionCreators[field as keyof ActionCreators];
        if (actionCreator) {
          dispatch(actionCreator(value));
        }
        if (field === "input") {
          dispatch(setInputText(value.toString()));
        }
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      dispatch(setInputText(value.toString()));
    }
  };

  useEffect(() => {
    setLocalDimensions({
      horizontalSpacing: settings.horizontalSpacing,
      verticalSpacing: settings.verticalSpacing,
      circleRadius: settings.circleRadius,
    });
  }, [settings]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof LocalDimensions
  ) => {
    setLocalDimensions({ ...localDimensions, [field]: Number(e.target.value) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <div>
          <Field
            name="input"
            label="input"
            defaultValue={settings.input.toString()}
            onChange={(e) => handleInputChange(e)}
          />
          <Separator className="my-2" />
          <Field
            name="speed"
            label="speed (ms)"
            defaultValue={settings.speed.toString()}
          />
          <Field
            key="verticalSpacing"
            name="verticalSpacing"
            label="x-spacing"
            value={Math.floor(localDimensions.verticalSpacing).toString()}
            onChange={(e) => handleChange(e, "verticalSpacing")}
          />
          <Field
            key="horizontalSpacing"
            name="horizontalSpacing"
            label="y-spacing"
            value={Math.floor(localDimensions.horizontalSpacing).toString()}
            onChange={(e) => handleChange(e, "horizontalSpacing")}
          />
          <Field
            key="circleRadius"
            name="circleRadius"
            label="circle-size"
            value={Math.floor(localDimensions.circleRadius).toString()}
            onChange={(e) => handleChange(e, "circleRadius")}
          />
        </div>
        <Button
          type="submit"
          className="absolute bottom-2 w-[calc(100%-16px)]"
          disabled={activeButton === ActivButton.problem}
        >
          {activeButton === ActivButton.problem
            ? "Implementierung wählen"
            : `run ${settings.functionName}(${settings.inputText})`}
        </Button>
      </div>
    </form>
  );
};

interface FieldProps {
  name: string;
  label: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = ({ name, label, ...props }) => (
  <div className="flex justify-between mb-1">
    <Label htmlFor={name} className="text-md">
      {label}
    </Label>
    <Input
      {...props}
      name={name}
      id={name}
      className="w-20 form-input"
      type="number"
    />
  </div>
);

function getValueFromForm(
  form: HTMLFormElement,
  selector: string
): number | null {
  const element = form.querySelector(selector) as HTMLInputElement | null;
  return element ? parseInt(element.value, 10) : null;
}
