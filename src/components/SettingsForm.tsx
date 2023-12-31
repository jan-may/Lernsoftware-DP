import {
  setInput,
  setSpeed,
  setMemo,
} from "../feautures/settings/settingsSlice";
import { useAppSelector, useAppDispatch } from "../hooks/redux";

export const SettingsForm = () => {
  const dispatch = useAppDispatch();
  const { input, speed, memo } = useAppSelector((store) => store.settings);

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

    const memoValue = getValueFromForm(
      form,
      '.form-input[type="checkbox"]',
      true
    );
    if (memoValue !== null) {
      dispatch(setMemo(memoValue as boolean));
    }

    const newSpeed = getValueFromForm(form, '.form-input[name="speed"]');
    if (newSpeed !== null) {
      dispatch(setSpeed(newSpeed as number));
    }
  }

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
        <label className="form-label">memo</label>
        <input
          className="form-input"
          type="checkbox"
          name="memo"
          defaultChecked={memo}
        />
      </div>
      <div className="form-group">
        <label className="form-label">x-spacing</label>
        <input className="form-input" type="number" />
      </div>
      <div className="form-group">
        <label className="form-label">y-Spacing</label>
        <input className="form-input" type="number" />
      </div>
      <div className="form-group">
        <label className="form-label">c-radius</label>
        <input className="form-input" type="number" />
      </div>
      <button className="form-submit-btn" type="submit">
        calculate
      </button>
    </form>
  );
};
