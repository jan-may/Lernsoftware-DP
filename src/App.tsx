import { useEffect } from "react";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Display } from "./components/Display";
import { Navbar } from "./components/Navbar";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { setIsQuizCompleted, setIsTourCompleted } from "./feautures/io/ioSlice";
import { Toaster } from "./components/ui/toaster";
import { Quiz } from "./components/Quiz";
import { Tour } from "./components/Tour";

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
    <div className="flex w-100vw">
      <div className="w-[350px]">
        <Sidebar />
      </div>
      <div className="w-[calc(100vw-350px)]">
        <Navbar />
        <Display />
        <Toaster />
        {!checkUserData().tourCompleted && <Tour />}
      </div>
    </div>
  );
}

export default App;
