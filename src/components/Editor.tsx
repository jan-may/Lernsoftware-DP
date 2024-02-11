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
import { CompilerTable } from "./CompilerTable";
import { CompilerResponse } from "../types/CompilerTypes";

const initResponse: CompilerResponse = {
  memory: 0,
  language_name: "",
  compile_output: "",
  message: "",
  status_id: 0,
  status_msg: "",
  stdout: "",
  filteredStdout: "",
  stderr: "",
  time: 0,
  wall_time: 0,
  wall_time_limit: 0,
};

export function Editor() {
  const { theme } = useTheme();
  const { code } = useAppSelector((store) => store.editor);
  const { selectedProblem } = useAppSelector((store) => store.settings);
  const dispatch = useAppDispatch();
  const [sourceClicked, setSourceClicked] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [apiResponse, setApiResponse] = React.useState(initResponse);
  const [error, setError] = React.useState("");
  const onChange = React.useCallback((val: any, _viewUpdate: any) => {
    dispatch(setCode(val));
  }, []);

  function refreshValues() {
    setResult("");
    setLoading(false);
    setApiResponse(initResponse);
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

      console.log(apiResponse);

      axios
        .request(judgeOptions)
        .then((response) => {
          console.log(response.data);

          const result = response.data.stdout
            ? base64Decode(response.data.stdout)
            : "";

          const test = {
            memory: response.data.memory,
            language_name: response.data.language.name,
            compile_output: response.data.compile_output
              ? base64Decode(response.data.compile_output)
              : "",
            message: response.data.message
              ? base64Decode(response.data.message)
              : "",
            status_id: response.data.status.id,
            status_msg: response.data.status.description,
            stdout: result,
            stderr: response.data.stderr
              ? base64Decode(response.data.stderr)
              : "",
            time: response.data.time,
            wall_time: response.data.wall_time,
            wall_time_limit: response.data.wall_time_limit,
          };
          setApiResponse(test);
          setResult(result);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setApiResponse({
            ...apiResponse,
            message: "Error: " + error.message,
          });
          setError(error.message);
          setLoading(false);
        });
    },
    [code]
  );

  useEffect(() => {
    // init code if not set
    // have to check for Problem later
    if (!code) dispatch(setCode(getInitEditorCode(selectedProblem)));
  }, [dispatch]);

  React.useEffect(() => {
    console.log(apiResponse);
  }, [apiResponse]);

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
      <div className="absolute top-1 right-1 h-7 tour-4">
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
        {apiResponse !== initResponse && (
          <CompilerTable response={apiResponse} />
        )}
        {loading ? (
          <p>loading...</p>
        ) : apiResponse.stderr ? (
          <EditorErrorMessage title="Fehler:" message={error} />
        ) : apiResponse.status_id == 5 ? (
          <EditorErrorMessage
            title="Laufzeitfehler:"
            message={apiResponse.message}
          />
        ) : apiResponse.status_id == 6 ? (
          <EditorErrorMessage
            title="Compilefehler:"
            message={apiResponse.compile_output}
          />
        ) : (
          <>{result && <TestResultsTable result={result} />}</>
        )}
      </div>
    </div>
  );
}
