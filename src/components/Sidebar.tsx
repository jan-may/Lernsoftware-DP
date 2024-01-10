import { SettingsForm } from "./SettingsForm";
import { CodeDisplay } from "./CodeDisplay";
import { CodeSelect } from "./CodeSelect";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import { fibCode, fibMemoCode, fibTabCode } from "../trees/fibonacci";
import { useAppSelector } from "../hooks/redux";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const Sidebar = () => {
  const { activeButton } = useAppSelector((store) => store.navbar);

  const noCode = `// no code to display`;

  const codeMap = {
    [ActivButton.recursiveTree]: fibCode,
    [ActivButton.topDownMemo]: fibMemoCode,
    [ActivButton.bottomUp]: fibTabCode,
    [ActivButton.problem]: noCode,
  };

  return (
    <Card className="p-2 m-2">
      <div className="sidbar-container">
        <div className="sidebar-code-wrapper">
          <CodeSelect />
          <CodeDisplay code={codeMap[activeButton]} language="cs" />
        </div>
        <SettingsForm />
        <div style={{ marginTop: "30px" }}></div>
      </div>
    </Card>
  );
};
