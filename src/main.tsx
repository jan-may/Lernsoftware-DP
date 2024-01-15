import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { ThemeProvider } from "./components/theme-provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
