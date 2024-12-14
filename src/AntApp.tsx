import { App } from "antd";
import { IProp } from "./interfaces/IProp";

const AntApp: React.FC<IProp> = ({ children }) => {
  return <App>{children}</App>;
};

export default AntApp;