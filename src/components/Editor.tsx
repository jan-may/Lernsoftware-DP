import React, { useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { csharp } from "@replit/codemirror-lang-csharp";
import { EditorView } from "codemirror";
import { Button } from "./ui/button";
import { Code2, Play, RefreshCcw } from "lucide-react";
import { testCases } from "../trees/fibonacci";
import { getInitEditorCode, refactorPath } from "../utils/util";
import { TestResultsTable } from "./TestResultsTable";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setCode, setIsLoading } from "../feautures/editor/editorSlice";
import { Problem } from "../feautures/settings/settingsSlice";
import { useTheme } from "./theme-provider";
import { CompilerTable } from "./CompilerTable";
import { CompilerResponse } from "../types/CompilerTypes";
import { CompilerInfoBtn } from "./CompilerInfoBtn";
import { invoke } from "@tauri-apps/api/tauri";
import { EditorErrorMessage } from "./EditorErrorMessage";

const initResponse: CompilerResponse = {
  language_name: "",
  path: "",
  status: 0,
  stdout: "",
  filteredStdout: "",
  stderr: "",
  time: 0,
};

export function Editor() {
  const { theme } = useTheme();
  const { code, showCompilerInfo, isLoading } = useAppSelector(
    (store) => store.editor
  );
  const { selectedProblem } = useAppSelector((store) => store.settings);
  const dispatch = useAppDispatch();
  const [sourceClicked, setSourceClicked] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [codeRunResponse, setCodeRunResponse] = React.useState(initResponse);
  const [error, setError] = React.useState("");
  const [dotnetVersion, setDotnetVersion] = React.useState("");
  const [_projectPath, setProjectPath] = React.useState("");
  const onChange = React.useCallback((val: any, _viewUpdate: any) => {
    dispatch(setCode(val));
  }, []);

  function refreshValues() {
    setResult("");
    setCodeRunResponse(initResponse);
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
    // check if running in browser or tauri client
    // if in browser, show error message - code can only be run in client
    dispatch(setIsLoading(true));
    if (!window.__TAURI__) {
      setError(
        "Code kann nur im Client ausgeführt werden. Im Browser ist dies (noch) nicht möglich! Bitte laden Sie hierfür die dedizierte Desktop-App herunter. https://github.com/jan-may/Lernsoftware-DP/releases"
      );
      dispatch(setIsLoading(false));
      return;
    }

    try {
      refreshValues();

      // Fetch the .NET version and project path in parallel to optimize performance
      // This assumes that `get_dotnet_version` and `get_dotnet_project_path` do not depend on each other
      const [dotnetVersion, appdataPathUnrefactored] = await Promise.all([
        invoke<string>("get_dotnet_version"),
        invoke<string>("get_dotnet_project_path"),
      ]);

      // Early error handling if dotnetVersion starts with "Bitte"
      if (dotnetVersion.startsWith("Bitte")) {
        setError(dotnetVersion);
        return;
      }

      setDotnetVersion(dotnetVersion);

      const appdataPath = refactorPath(appdataPathUnrefactored); // only for windows ?
      setProjectPath(appdataPath);

      // Continue with the rest of the function only if the above condition is not met
      const fullCode = buildFullCode(codeText);

      await invoke<string>("write_file_content", { code: fullCode });
      const runProgResult = await invoke<string>("run_prog");
      const value = JSON.parse(runProgResult);

      const response: CompilerResponse = {
        language_name: ".NET SDK " + dotnetVersion,
        path: appdataPath,
        status: value.status,
        stdout: value.stdout,
        stderr: value.stderr,
        time: 0,
      };

      setCodeRunResponse(response);
      setResult(value.stdout);
    } catch (error) {
      console.error("Fehler beim Ausführen des Codes:", error);
      setError("Fehler beim Ausführen des Codes");
    } finally {
      dispatch(setIsLoading(false));
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
            {isLoading ? (
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
      <p>{dotnetVersion ? `.NET Version: ${dotnetVersion}` : ""}</p>
      {codeRunResponse.stderr && (
        <>
          <EditorErrorMessage title="Fehler" message={codeRunResponse.stderr} />
          <EditorErrorMessage
            title="Message"
            message={codeRunResponse.stdout}
          />
        </>
      )}
      {error && <p>{error}</p>}
      <div className="mt-4">
        {codeRunResponse !== initResponse && showCompilerInfo && (
          <CompilerTable response={codeRunResponse} />
        )}
      </div>
      {isLoading && <p>loading...</p>}
      {result && !codeRunResponse.stderr && (
        <TestResultsTable result={result} error={codeRunResponse.stderr} />
      )}
    </>
  );
}
