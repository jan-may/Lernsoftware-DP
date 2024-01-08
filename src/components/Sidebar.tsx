import { SettingsForm } from "./SettingsForm";
import { CodeDisplay } from "./CodeDisplay";
import { CodeSelect } from "./CodeSelect";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import {
  setIsQuizCompleted,
  setIsTourCompleted,
} from "../feautures/io/ioSlice";
import { useSaveFile } from "../hooks/fileOperations";
import { BaseDirectory, writeTextFile } from "@tauri-apps/api/fs";
import { fibCode, fibMemoCode, fibTabCode } from "../trees/fibonacci";

const SAVEFILE = "save.txt";

export const Sidebar = () => {
  const { activeButton } = useAppSelector((store) => store.navbar);
  const isTourCompleted = useAppSelector((state) => state.io.isTourCompleted);
  const isQuizCompleted = useAppSelector((state) => state.io.isQuizCompleted);
  const dispatch = useAppDispatch();
  function handleCompleteQuiz() {
    const data = {
      isTourCompleted: isTourCompleted,
      isQuizCompleted: !isQuizCompleted,
    };
    handleSave(data);
    dispatch(setIsQuizCompleted(!isQuizCompleted));
  }

  function handleCompleteTour() {
    const data = {
      isTourCompleted: !isTourCompleted,
      isQuizCompleted: isQuizCompleted,
    };
    handleSave(data);
    dispatch(setIsTourCompleted(!isTourCompleted));
  }
  async function handleSave(data: any) {
    await writeTextFile(
      {
        path: SAVEFILE,
        contents: JSON.stringify(data, null, 2),
      },
      { dir: BaseDirectory.AppData }
    );
    console.log("saved");
  }

  const noCode = `// no code to display`;

  const codeMap = {
    [ActivButton.recursiveTree]: fibCode,
    [ActivButton.topDownMemo]: fibMemoCode,
    [ActivButton.bottomUp]: fibTabCode,
    [ActivButton.problem]: noCode,
  };

  useSaveFile(dispatch, setIsTourCompleted, setIsQuizCompleted, {
    tourCompleted: false,
    quizCompleted: false,
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const appDir = await path.appDataDir();
  //     const filePath = await path.join(appDir, BASEDIR);

  //     // create directory if it does not exist
  //     if (!(await exists(filePath))) {
  //       await createDir(filePath, { recursive: true });
  //     }

  //     // create save file if it does not exist
  //     if (!(await exists(SAVEFILE, { dir: BaseDirectory.AppData }))) {
  //       await writeTextFile(
  //         {
  //           path: SAVEFILE,
  //           contents: JSON.stringify(
  //             { isTourCompleted: false, isQuizCompleted: false },
  //             null,
  //             2
  //           ),
  //         },
  //         { dir: BaseDirectory.AppData }
  //       );
  //     }
  //   };

  //   const readSaveFile = async () => {
  //     const contents = await readTextFile(SAVEFILE, {
  //       dir: BaseDirectory.AppData,
  //     });
  //     const data = JSON.parse(contents);
  //     dispatch(setIsTourCompleted(data.isTourCompleted));
  //     dispatch(setIsQuizCompleted(data.isQuizCompleted));
  //   };

  //   fetchData();
  //   readSaveFile();
  // }, [dispatch]);

  return (
    <div className="sidbar-container">
      <div className="sidebar-code-wrapper">
        <CodeSelect />
        <CodeDisplay code={codeMap[activeButton]} language="cs" />
      </div>
      <SettingsForm />
      <div style={{ marginTop: "30px" }}>
        <button onClick={() => handleCompleteQuiz()}>complete Quiz</button>
        <button onClick={() => handleCompleteTour()}>complete Tour</button>
      </div>
    </div>
  );
};
