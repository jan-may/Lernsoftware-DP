import { SettingsForm } from "./SettingsForm";
import { CodeDisplay } from "./CodeDisplay";
import { CodeSelect } from "./CodeSelect";
import { useAppSelector } from "../hooks/redux";
import { ActivButton } from "../feautures/navbar/navbarSlice";

export const Sidebar = () => {
  const { activeButton } = useAppSelector((store) => store.navbar);

  const fibCode = `public static int Fib(int n)
{
  if (n <= 1) return n;
  return Fib(n - 1) + Fib(n - 2);
}`;

  const fibMemoCode = `public static int Fib(int n)
{
  int[] memo = new int[n + 1];
  return Fib(n, memo);
}
  
private static int Fib(int n, int[] memo)
{
  if (n <= 1) return n;
  if (memo[n] != 0) return memo[n];
  memo[n] = Fib(n - 1, memo) + Fib(n - 2, memo);
  return memo[n];
}`;

  const noCode = `
  // no code to display

`;

  return (
    <div className="sidbar-container">
      <div className="sidebar-code-wrapper">
        <CodeSelect />
        <CodeDisplay
          code={
            activeButton === ActivButton.recursiveTree
              ? fibCode
              : activeButton === ActivButton.topDownMemo
              ? fibMemoCode
              : noCode
          }
          language="cs"
        />
      </div>
      <SettingsForm />
    </div>
  );
};
