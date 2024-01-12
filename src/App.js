import { RouterProvider } from "react-router-dom";

import publicRoutes from "./components/Routes/Routes";
import "./App.css";

const App = () => {
  return <RouterProvider router={publicRoutes} />;
};

export default App;
