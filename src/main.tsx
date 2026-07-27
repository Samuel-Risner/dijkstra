import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.tsx";
import Dijkstra from "./dijkstra.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App
      dijkstra={ new Dijkstra() }
    />
  </StrictMode>
);
