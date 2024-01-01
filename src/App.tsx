import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Display } from "./components/Display";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="container">
      <Sidebar />
      <Navbar />
      <Display />
    </div>
  );
}

export default App;
