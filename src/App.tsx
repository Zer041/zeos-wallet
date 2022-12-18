import "./App.css";
import { RouterConfig } from "./navigation/router-config";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <RouterConfig />
      <Outlet />
    </div>
  );
}

export default App;
