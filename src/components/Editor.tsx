import React, { useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { csharp } from "@replit/codemirror-lang-csharp";
import { EditorView } from "codemirror";
import { Button } from "./ui/button";
import { Code2, Play, RefreshCcw } from "lucide-react";
import { testCases } from "../trees/fibonacci";
import { getInitEditorCode } from "../utils/util";
import { TestResultsTable } from "./TestResultsTable";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setCode } from "../feautures/editor/editorSlice";
import { Problem } from "../feautures/settings/settingsSlice";
import { useTheme } from "./theme-provider";
import { CompilerTable } from "./CompilerTable";
import { CompilerResponse } from "../types/CompilerTypes";
import { CompilerInfoBtn } from "./CompilerInfoBtn";
import { invoke } from "@tauri-apps/api/tauri";

const initResponse: CompilerResponse = {
  language_name: "",
  compile_output: "",
  message: "",
  status: 0,
  stdout: "",
  filteredStdout: "",
  stderr: "",
  time: 0,
};

export function Editor() {
  const { theme } = useTheme();
  const { code, showCompilerInfo } = useAppSelector((store) => store.editor);
  const { selectedProblem } = useAppSelector((store) => store.settings);
  const dispatch = useAppDispatch();
  const [sourceClicked, setSourceClicked] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [apiResponse, setApiResponse] = React.useState(initResponse);
  const [_error, _setError] = React.useState("");
  const [dotnetVersion, setDotnetVersion] = React.useState("");
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
    setSourceClicked(false);
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

  const handleRunCode = async (codeText: string) => {
    refreshValues();
    setLoading(true);

    // Asynchronously check for dotnet version
    const val = await invoke<string>("get_dotnet_version");
    setDotnetVersion(val);
    if (val.startsWith("Bitte")) {
      _setError(val);
      setLoading(false);
      return; // Early return to prevent executing the rest of the code
    }

    // Continue with the rest of the function only if the above condition is not met
    const fullCode = buildFullCode(codeText);
    try {
      await invoke<string>("write_file_content", { code: fullCode });
      const val = await invoke<string>("run_prog");
      const value = JSON.parse(val);
      const result = value.stdout;
      // setRustResult(result);
      setLoading(false);
      const test = {
        language_name: ".NET SDK " + dotnetVersion,
        compile_output: "",
        message: "",
        status: value.status,
        stdout: value.stdout,
        stderr: value.stderr,
        time: 0,
      };
      setApiResponse({ ...test });
      setResult(result);
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the write or run operations
    }
  };

  useEffect(() => {
    // init code if not set
    // have to check for Problem later
    if (!code) dispatch(setCode(getInitEditorCode(selectedProblem)));
  }, [dispatch]);

  return (
    <>
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
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleRunCode(code)}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 mr-4 bg-white border-[1.5px] border-black"
                  viewBox="0 0 24 24"
                ></svg>
                Processing...
              </>
            ) : (
              <Play size={18} />
            )}
          </Button>
        </div>

        <CompilerInfoBtn disabled={result != "" ? false : true} />
      </div>
      <p>{dotnetVersion}</p>
      <div className="mt-4">
        {apiResponse !== initResponse && showCompilerInfo && (
          <CompilerTable response={apiResponse} />
        )}
      </div>
      {loading && <p>loading...</p>}
      {result && (
        <TestResultsTable result={result} error={apiResponse.stderr} />
      )}
    </>
  );
}
