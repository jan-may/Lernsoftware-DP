import { useLayoutEffect } from "react";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Display } from "./components/Display";
import { Navbar } from "./components/Navbar";
import {
  exists,
  BaseDirectory,
  writeTextFile,
  createDir,
  readTextFile,
} from "@tauri-apps/api/fs";
import { path } from "@tauri-apps/api";
import { useAppDispatch } from "./hooks/redux";
import { setIsQuizCompleted, setIsTourCompleted } from "./feautures/io/ioSlice";

const BASEDIR = "com.jan.may";
const SAVEFILE = "save.txt";

const DefaultSaveData = {
  tourCompleted: false,
  quizCompleted: false,
};

function App() {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    const fetchData = async () => {
      const appDir = await path.appDataDir();
      const filePath = await path.join(appDir, BASEDIR);

      // create directory if it does not exist
      if (!(await exists(filePath))) {
        await createDir(filePath, { recursive: true });
      }

      // create save file if it does not exist
      if (!(await exists(SAVEFILE, { dir: BaseDirectory.AppData }))) {
        await writeTextFile(
          {
            path: SAVEFILE,
            contents: JSON.stringify(DefaultSaveData, null, 2),
          },
          { dir: BaseDirectory.AppData }
        );
      }
    };

    const readSaveFile = async () => {
      const contents = await readTextFile(SAVEFILE, {
        dir: BaseDirectory.AppData,
      });
      console.log(contents);
      const data = JSON.parse(contents);
      console.log(data);

      dispatch(setIsTourCompleted(data.tourCompleted));
      dispatch(setIsQuizCompleted(data.quizCompleted));
    };

    fetchData();
    // fetch data -> save file must exist at this point
    readSaveFile();

    // read save file data
  }, [dispatch]);

  return (
    <div className="container">
      <Sidebar />
      <Navbar />
      <Display />
    </div>
  );
}

export default App;
