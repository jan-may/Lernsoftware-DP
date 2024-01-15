import { useEffect, useState } from "react";
import {
  setCircleRadius,
  setInput,
  setSpeed,
  setHorizontalSpacing,
  setVerticalSpacing,
} from "../feautures/settings/settingsSlice";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { useToast } from "./ui/use-toast";

export const SettingsForm = () => {
  const { toast } = useToast();

  const dispatch = useAppDispatch();
  const { input, speed, circleRadius, verticalSpacing, horizontalSpacing } =
    useAppSelector((store) => store.settings);
  const [localDimensions, setLocalDimensions] = useState({
    horizontalSpacing: horizontalSpacing,
    verticalSpacing: verticalSpacing,
    circleRadius: circleRadius,
  });

  function getValueFromForm(
    form: HTMLFormElement,
    selector: string,
    isCheckbox: boolean = false
  ) {
    const element = form.querySelector(selector) as HTMLInputElement;
    if (!element) return null;
    if (isCheckbox) return element.checked;
    const value = parseInt(element.value, 10);
    return isNaN(value) ? null : value;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const newValue = getValueFromForm(form, '.form-input[type="number"]');
    if (newValue !== null) {
      dispatch(setInput(newValue as number));
      if ((newValue as number) > 30) {
        toast({
          title: "Input für rekursive Berechnung zu groß",
          description:
            "Ein recursiver Aufruf mit diesem Input bedeutet enormen Rechenaufwand. Bitte eine dynamisch programmierte Lösung zur Visualisierung verwenden.",
          variant: "destructive",
        });
      }
    }

    const newSpeed = getValueFromForm(form, '.form-input[name="speed"]');
    if (newSpeed !== null) {
      dispatch(setSpeed(newSpeed as number));
    }

    if (localDimensions.horizontalSpacing !== horizontalSpacing) {
      dispatch(
        setHorizontalSpacing(localDimensions.horizontalSpacing as number)
      );
    }

    if (localDimensions.verticalSpacing !== verticalSpacing) {
      dispatch(setVerticalSpacing(localDimensions.verticalSpacing as number));
    }

    if (localDimensions.circleRadius !== circleRadius) {
      dispatch(setCircleRadius(localDimensions.circleRadius as number));
    }
  }

  useEffect(() => {
    setLocalDimensions({
      horizontalSpacing: horizontalSpacing,
      verticalSpacing: verticalSpacing,
      circleRadius: circleRadius,
    });
  }, [verticalSpacing, horizontalSpacing, circleRadius]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-around">
        <div className="flex justify-between mb-1">
          <Label htmlFor="inputN" className="text-md">
            input-n
          </Label>
          <Input
            name="inputN2"
            id="inputN"
            className="w-20 form-input"
            type="number"
            defaultValue={input}
          />
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between mb-1">
          <Label htmlFor="speed" className="text-md">
            speed (ms)
          </Label>
          <Input
            className="w-20 form-input"
            type="number"
            name="speed"
            id="speed"
            defaultValue={speed}
          />
        </div>
        <div className="flex justify-between mb-1">
          <Label htmlFor="horizontalSpacing" className="text-md">
            x-spacing
          </Label>
          <Input
            name="horizontalSpacing"
            id="horizontalSpacing"
            className="w-20 form-input"
            type="number"
            value={Math.floor(localDimensions.horizontalSpacing)}
            onChange={(e) => {
              setLocalDimensions({
                ...localDimensions,
                horizontalSpacing: Number(e.target.value),
              });
            }}
          />
        </div>
        <div className="flex justify-between mb-1">
          <Label htmlFor="verticalSpacing" className="text-md">
            y-Spacing
          </Label>
          <Input
            name="verticalSpacing"
            id="verticalSpacing"
            className="w-20 form-input"
            type="number"
            value={Math.floor(localDimensions.verticalSpacing)}
            onChange={(e) => {
              setLocalDimensions({
                ...localDimensions,
                verticalSpacing: Number(e.target.value),
              });
            }}
          />
        </div>
        <div className="flex justify-between mb-1">
          <Label htmlFor="circleRadius" className="text-md">
            c-radius
          </Label>
          <Input
            name="circleRadius"
            id="circleRadius"
            className="w-20 form-input"
            type="number"
            value={Math.floor(localDimensions.circleRadius)}
            onChange={(e) => {
              setLocalDimensions({
                ...localDimensions,
                circleRadius: Number(e.target.value),
              });
            }}
          />
        </div>

        <Button className="form-submit-btn" type="submit">
          calculate
        </Button>
      </div>
    </form>
  );
};
