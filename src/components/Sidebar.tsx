import { SettingsForm } from "./SettingsForm";
import { CodeDisplay } from "./CodeDisplay";
import { CodeSelect } from "./CodeSelect";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import { fibCode, fibMemoCode, fibTabCode } from "../trees/fibonacci";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setBluredCode } from "../feautures/settings/settingsSlice";

import { Card } from "./ui/card";
import { useEffect } from "react";

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { activeButton } = useAppSelector((store) => store.navbar);

  const noCode = `// no code to display`;

  const codeMap = {
    [ActivButton.recursiveTree]: fibCode,
    [ActivButton.topDownMemo]: fibMemoCode,
    [ActivButton.bottomUp]: fibTabCode,
    [ActivButton.problem]: noCode,
  };

  useEffect(() => {
    activeButton === ActivButton.problem
      ? dispatch(setBluredCode(false))
      : dispatch(setBluredCode(true));
  }, [activeButton, dispatch]);

  return (
    <Card className="p-2 m-2 fixed tour-7">
      <div style={{ minHeight: "calc(100vh - 37px)" }}>
        <CodeSelect />
        <CodeDisplay code={codeMap[activeButton]} language="cs" />
        <SettingsForm />
        <div style={{ marginTop: "30px" }}></div>
      </div>
    </Card>
  );
};
