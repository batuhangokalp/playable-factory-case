import { Badge, Popconfirm } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  FileDoneOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const taskItems = useSelector((state) => state.task.items);
  const doneTasks = useSelector((state) => state.task.doneTasks);

  const handleExit = () => {
    localStorage.removeItem("storedUser");
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to={"/"}>
            <h2 className="text-xl font-bold">PLAYABLE</h2>
            <h2 className="text-xl font-bold">FACTORY</h2>
          </Link>
        </div>
        <div
          className="header-search flex-1 flex justify-center"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        ></div>
        <div className="menu-links flex justify-between items-center gap-7 md:static fixed z-50 bottom-0 left-0 md:w-auto w-full bg-white md:bg-transparent md:border-t-0 border-t md:px-0 px-4 py-1">
          <Link
            to={"/"}
            className={`header-link ${
              pathname === "/" && "active-header-link"
            }`}
          >
            <HomeOutlined className="header-link-icon" />
            <span className="header-link-span">Home</span>
          </Link>
          <Badge count={taskItems?.length} className="md:flex hidden">
            <Link
              to={"/tasks"}
              className={`header-link ${
                pathname === "/tasks" && "active-header-link"
              }`}
            >
              <FileOutlined className="header-link-icon" />
              <span className="header-link-span">Tasks</span>
            </Link>
          </Badge>
          <Badge count={doneTasks?.length} className="md:flex hidden">
            <Link
              to={"/done"}
              className={`header-link ${
                pathname === "/done" && "active-header-link"
              }`}
            >
              <FileDoneOutlined className="header-link-icon" />
              <span className="header-link-span">Done</span>
            </Link>
          </Badge>

          <Popconfirm
            title="Logout"
            description="Are you sure you want to logout?"
            okText="Yes"
            cancelText="No"
            onConfirm={handleExit}
          >
            <div className="header-link cursor-pointer">
              <LogoutOutlined className="header-link-icon" />
              <span className="header-link-span">Logout</span>
            </div>
          </Popconfirm>
        </div>
        <Badge count={taskItems?.length} className="md:hidden flex">
          <Link to={"/tasks"} className="header-link">
            <FileOutlined className="text-2xl mb-2" />
            <span className="header-link-span">Tasks</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
