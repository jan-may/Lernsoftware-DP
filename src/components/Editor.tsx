import React, { useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { csharp } from "@replit/codemirror-lang-csharp";
import { EditorView } from "codemirror";
import axios from "axios";
import { Button } from "./ui/button";
import { Code2, Play, RefreshCcw } from "lucide-react";
import { testCases } from "../trees/fibonacci";
import { base64Decode, base64Encode, getInitEditorCode } from "../utils/util";
import { TestResultsTable } from "./TestResultsTable";
import { judgeOptions } from "../utils/data";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setCode } from "../feautures/editor/editorSlice";
import { Problem } from "../feautures/settings/settingsSlice";
import { EditorErrorMessage } from "./EditorErrorMessage";
import { useTheme } from "./theme-provider";

export function Editor() {
  const { theme } = useTheme();
  const { code } = useAppSelector((store) => store.editor);
  const { selectedProblem } = useAppSelector((store) => store.settings);
  const dispatch = useAppDispatch();
  const [sourceClicked, setSourceClicked] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [compileError, setCompileError] = React.useState("");
  const [runtimeError, setRuntimeError] = React.useState("");
  const [error, setError] = React.useState("");
  const onChange = React.useCallback((val: any, _viewUpdate: any) => {
    dispatch(setCode(val));
  }, []);

  function refreshValues() {
    setResult("");
    setCompileError("");
    setRuntimeError("");
    setError("");
    setLoading(false);
  }

  function handleRefresh(problem: Problem) {
    refreshValues();
    dispatch(setCode(getInitEditorCode(problem)));
  }

  function buildFullCode(code: string) {
    // check if first line != "using System;"
    // if not, prepend "using System;"
    if (!code.startsWith("using System;")) {
      code = `using System; \n\n${code}`;
    }
    // check if testCases are already present
    // if not, append testCases
    if (!code.endsWith(testCases)) {
      code = `${code}${testCases}`;
    }
    return code;
  }

  function setNotFullCode(code: String) {
    // delete using System & delete testCases
    return code.replace("using System; \n\n", "").replace(testCases, "");
  }

  function handleShowCode() {
    if (sourceClicked) {
      setSourceClicked(false);
      dispatch(setCode(setNotFullCode(code)));
    } else {
      setSourceClicked(true);
      dispatch(setCode(buildFullCode(code)));
    }
  }

  // use memo to prevent rerender
  const handleRun = React.useCallback(
    (codeText: string) => {
      refreshValues();
      setLoading(true);

      const fullCode = buildFullCode(codeText);
      judgeOptions.data.source_code = base64Encode(fullCode);

      axios
        .request(judgeOptions)
        .then((response) => {
          console.log(response.data);
          if (response.data.status.id == 6) {
            setCompileError(base64Decode(response.data.compile_output));
          } else if (response.data.status.id == 11) {
            setRuntimeError(base64Decode(response.data.stderr));
          } else if (response.data.status.id == 5) {
            setRuntimeError(base64Decode(response.data.message));
          }
          if (response.data.stdout) {
            setResult(base64Decode(response.data.stdout));
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    },
    [code]
  );

  useEffect(() => {
    // init code if not set
    // have to check for Problem later
    if (!code) dispatch(setCode(getInitEditorCode(selectedProblem)));
  }, [dispatch]);

  return (
    <div className="relative">
      <CodeMirror
        value={code}
        height="350px"
        extensions={[
          csharp(),
          EditorView.contentAttributes.of({ style: "font-size: 14px" }),
        ]}
        basicSetup={{
          foldGutter: false,
          dropCursor: false,
          allowMultipleSelections: false,
          autocompletion: true,

          indentOnInput: false,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
        }}
        onChange={onChange}
        theme={theme === "dark" ? oneDark : "light"}
        className="mt-4 rounded-md border-2  w-full"
      />
      <div className="absolute top-1 right-1 h-7">
        <Button size="sm" variant="outline" onClick={handleShowCode}>
          <Code2 size={18} />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleRefresh(selectedProblem)}
        >
          <RefreshCcw size={18} />
        </Button>
        <Button size="sm" variant="outline" onClick={() => handleRun(code)}>
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 mr-4 bg-white"
                viewBox="0 0 24 24"
              ></svg>
              Processing...
            </>
          ) : (
            <Play size={18} />
          )}
        </Button>
      </div>
      <div className="mt-4">
        {loading ? (
          <p>loading...</p>
        ) : error ? (
          <EditorErrorMessage title="Fehler:" message={error} />
        ) : runtimeError ? (
          <EditorErrorMessage title="Laufzeitfehler:" message={runtimeError} />
        ) : compileError ? (
          <EditorErrorMessage title="Compilefehler:" message={compileError} />
        ) : (
          result && <TestResultsTable result={result} />
        )}
      </div>
    </div>
  );
}
