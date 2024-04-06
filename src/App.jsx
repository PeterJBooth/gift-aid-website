import "./global.css";
import "./App.css";
import { MainPage } from "./pages/MainPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { InfoPage } from "./pages/InfoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/what-is-gift-aid" element={<InfoPage />} />
          <Route path="/*" element={<Navigate to="/." />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
