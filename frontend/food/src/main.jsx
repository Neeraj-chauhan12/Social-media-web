import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { AppStore } from "./app/store.js";
import { useGetProfileQuery } from "./features/api/AuthApi.js";

const Custom = ({ children }) => {
  const { isLoading } = useGetProfileQuery();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <progress className="progress w-72"></progress>
      </div>
    );
  }
  return <>{children}</>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={AppStore}>
      <Custom>
        <App />
      </Custom>
    </Provider>
  </StrictMode>,
);    
