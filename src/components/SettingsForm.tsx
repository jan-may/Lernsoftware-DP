import { useEffect, useState } from "react";
import {
  setCircleRadius,
  setInput,
  setSpeed,
  setHorizontalSpacing,
  setVerticalSpacing,
} from "../feautures/settings/settingsSlice";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { set } from "zod";

export const SettingsForm = () => {
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
    <form className="settings-form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">input-n</label>
        <input
          name="inputN2"
          className="form-input"
          type="number"
          defaultValue={input}
        />
      </div>
      <div className="form-group">
        <label className="form-label">speed (ms)</label>
        <input
          className="form-input"
          type="number"
          name="speed"
          defaultValue={speed}
        />
      </div>
      <div className="form-group">
        <label className="form-label">x-spacing</label>
        <input
          name="horizontalSpacing"
          className="form-input"
          type="number"
          defaultValue={Math.floor(localDimensions.horizontalSpacing)}
          value={Math.floor(localDimensions.horizontalSpacing)}
          onChange={(e) => {
            setLocalDimensions({
              ...localDimensions,
              horizontalSpacing: parseInt(e.target.value),
            });
          }}
        />
      </div>
      <div className="form-group">
        <label className="form-label">y-Spacing</label>
        <input
          name="verticalSpacing"
          className="form-input"
          type="number"
          defaultValue={Math.floor(localDimensions.verticalSpacing)}
          value={Math.floor(localDimensions.verticalSpacing)}
          onChange={(e) => {
            setLocalDimensions({
              ...localDimensions,
              verticalSpacing: parseInt(e.target.value),
            });
          }}
        />
      </div>
      <div className="form-group">
        <label className="form-label">c-radius</label>
        <input
          name="circleRadius"
          className="form-input"
          type="number"
          defaultValue={Math.floor(localDimensions.circleRadius)}
          value={Math.floor(localDimensions.circleRadius)}
          onChange={(e) => {
            setLocalDimensions({
              ...localDimensions,
              circleRadius: parseInt(e.target.value),
            });
          }}
        />
      </div>
      <button className="form-submit-btn" type="submit">
        calculate
      </button>
    </form>
  );
};
