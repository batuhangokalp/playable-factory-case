import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Login = lazy(() => import("./pages/Auth/Login"));

function App() {
  const storedAuth = JSON.parse(localStorage.getItem("storedUser"));

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {storedAuth ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
