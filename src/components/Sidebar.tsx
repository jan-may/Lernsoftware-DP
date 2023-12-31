import { SettingsForm } from "./SettingsForm";
import { CodeDisplay } from "./CodeDisplay";
import { CodeSelect } from "./CodeSelect";

export const Sidebar = () => {
  const testCode = `function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}`;

  return (
    <div className="sidbar-container">
      <div className="sidebar-code-wrapper">
        <CodeSelect />
        <CodeDisplay code={testCode} language="javascript" />
      </div>
      <SettingsForm />
    </div>
  );
};
