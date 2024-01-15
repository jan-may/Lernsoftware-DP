import { useEffect } from "react";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Display } from "./components/Display";
import { Navbar } from "./components/Navbar";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { setIsQuizCompleted, setIsTourCompleted } from "./feautures/io/ioSlice";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { Toaster } from "./components/ui/toaster";
import { Quiz } from "./components/Quiz";

const checkUserData = () => {
  const tourCompleted = localStorage.getItem("tourCompleted");
  const quizCompleted = localStorage.getItem("quizCompleted");
  return { tourCompleted, quizCompleted };
};

function App() {
  const dispatch = useAppDispatch();
  const { isQuizCompleted } = useAppSelector((state) => state.io);

  useEffect(() => {
    const { tourCompleted, quizCompleted } = checkUserData();
    if (tourCompleted) {
      dispatch(setIsTourCompleted(true));
    }
    if (quizCompleted) {
      dispatch(setIsQuizCompleted(true));
    }
  }, []);

  // if Quiz is not completed, show Quiz instead of main app
  if (!isQuizCompleted) {
    return <Quiz />;
  }

  // Main App
  return (
    <div className="container">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-100 min-h-screen rounded-lg border"
      >
        <ResizablePanel defaultSize={34} className="max-w-[350px]">
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle className=" w-2 " />
        <ResizablePanel defaultSize={66}>
          <Navbar />
          <Display />
          <Toaster />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
