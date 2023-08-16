import React from "react";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/configStore";
import { Provider } from "react-redux";
import "./assets/css/base/root.css";
import "./reset_css.css";
import "react-toastify/dist/ReactToastify.css";

import AppRoutes from "./routes/AppRoutes";
import Progress from "./components/Progress";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <Progress />
    </Provider>
  );
}

export default App;
