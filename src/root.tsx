import { Outlet } from "react-router";
import { Layout } from "./Layout/Layout";

const App = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default App;
