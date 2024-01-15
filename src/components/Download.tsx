import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { save } from "@tauri-apps/api/dialog";
import { downloadDir } from "@tauri-apps/api/path";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { fibUnitTests } from "../trees/fibonacci";
// check if browser or tauri
const isTauri = window.__TAURI__;

const downloadDataTauri = async (dataUrl: any) => {
  const downloadDirPath = await downloadDir();
  const suggestedFilename = `fibUnitTests.cs`;
  // Save into the default downloads directory, like in the browser
  const filePath = await save({
    defaultPath: downloadDirPath + "/" + suggestedFilename,
  });

  try {
    await writeTextFile(
      { path: filePath!, contents: dataUrl },
      { dir: BaseDirectory.Download }
    );
    console.log("File saved");
  } catch (e) {
    console.log(e);
  }
};

const downloadDataBrowser = async (dataUrl: any) => {
  const link = document.createElement("a");
  link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(dataUrl);
  link.download = "fibUnitTests.cs";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const downloadData = async (dataUrl: any) => {
  isTauri ? downloadDataTauri(dataUrl) : downloadDataBrowser(dataUrl);
};

export const DownloadBtn = () => {
  return (
    <Button variant="secondary" onClick={() => downloadData(fibUnitTests)}>
      Download Testcases
      <Download className="ml-2 h-4 w-4" />
    </Button>
  );
};
