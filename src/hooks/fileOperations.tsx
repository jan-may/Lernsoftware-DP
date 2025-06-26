import { useEffect } from "react";
import {
  exists,
  writeTextFile,
  readTextFile,
  mkdir
} from "@tauri-apps/plugin-fs";
import { path } from "@tauri-apps/api";

const BASEDIR = "com.jan.may";
const SAVEFILE = "save.txt";

export const useSaveFile = (
  dispatch: any,
  setIsTourCompleted: any,
  setIsQuizCompleted: any,
  defaultData: any
) => {
  useEffect(() => {
    async function initSaveFile() {
      const appDir = await path.appDataDir();
      const filePath = await path.join(appDir, BASEDIR);

      // Create directory if it does not exist
      if (!(await exists(filePath))) {
        await mkdir(filePath, { recursive: true });
      }

      // Create save file if it does not exist
      const saveFilePath = await path.join(await path.appDataDir(), BASEDIR, SAVEFILE);
      if (!(await exists(saveFilePath))) {
        await writeTextFile(
          saveFilePath,
          JSON.stringify(defaultData, null, 2)
        );
      }

      // Read the save file data
      const contents = await readTextFile(saveFilePath);
      const data = JSON.parse(contents);
      dispatch(setIsTourCompleted(data.isTourCompleted || data.tourCompleted));
      dispatch(setIsQuizCompleted(data.isQuizCompleted || data.quizCompleted));
    }

    initSaveFile();
  }, [dispatch, setIsTourCompleted, setIsQuizCompleted]);
};
