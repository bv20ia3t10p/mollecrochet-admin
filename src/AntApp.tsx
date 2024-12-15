import { App, ConfigProvider } from "antd";
import { IProp } from "./interfaces/IProp";

const AntApp: React.FC<IProp> = ({ children }) => {
  return <ConfigProvider theme={{
    token: {
      // Seed Token
      colorPrimary: '#9e1068',

      // Alias Token
      colorBgContainer: '#ffffff',
    },
  }}>
    <App>{children}</App></ConfigProvider>;
};

export default AntApp;