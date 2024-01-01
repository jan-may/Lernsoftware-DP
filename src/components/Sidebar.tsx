import { SettingsForm } from "./SettingsForm";
import { CodeDisplay } from "./CodeDisplay";
import { CodeSelect } from "./CodeSelect";

export const Sidebar = () => {
  const testCode = `public static int Fib(int n)
  {
    if (n <= 1) return n;
    return Fib(n - 1) + Fib(n - 2);
  }`;

  return (
    <div className="sidbar-container">
      <div className="sidebar-code-wrapper">
        <CodeSelect />
        <CodeDisplay code={testCode} language="cs" />
      </div>
      <SettingsForm />
    </div>
  );
};
