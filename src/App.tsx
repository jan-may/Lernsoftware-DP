import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Display } from "./components/Display";

function App() {
  return (
    <div className="container">
      <Sidebar />
      <Display />
    </div>
  );
}

export default App;
