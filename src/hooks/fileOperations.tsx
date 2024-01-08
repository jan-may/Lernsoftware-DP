import { useEffect } from "react";
import {
  exists,
  writeTextFile,
  readTextFile,
  createDir,
} from "@tauri-apps/api/fs";
import { path } from "@tauri-apps/api";
import { BaseDirectory } from "@tauri-apps/api/fs";

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
        await createDir(filePath, { recursive: true });
      }

      // Create save file if it does not exist
      if (!(await exists(SAVEFILE, { dir: BaseDirectory.AppData }))) {
        await writeTextFile(
          {
            path: SAVEFILE,
            contents: JSON.stringify(defaultData, null, 2),
          },
          { dir: BaseDirectory.AppData }
        );
      }

      // Read the save file data
      const contents = await readTextFile(SAVEFILE, {
        dir: BaseDirectory.AppData,
      });
      const data = JSON.parse(contents);
      dispatch(setIsTourCompleted(data.isTourCompleted || data.tourCompleted));
      dispatch(setIsQuizCompleted(data.isQuizCompleted || data.quizCompleted));
    }

    initSaveFile();
  }, [dispatch, setIsTourCompleted, setIsQuizCompleted]);
};
