import { useEffect } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearDoneTasks, fetchTaskAsync } from "../redux/taskSlice";
import Header from "../components/Header";

const Done = () => {
  const dispatch = useDispatch();
  const doneTasks = useSelector((state) => state.task.doneTasks);

  useEffect(() => {
    dispatch(fetchTaskAsync());
  }, [dispatch]);

  const columns = [
    {
      title: "Image",
      key: "image",
      width: "150px",
      render: (text, record) =>
        record?.image ? (
          <img
            src={record?.image}
            alt="img"
            className="w-full h-16 object-fill"
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Task",
      key: "task",
      render: (text, record) => record?.task || "Undefined",
    },
  ];

  return (
    <>
      <Header />
      <div className="px-24 overflow-y-auto">
        <Table
          rowKey={(record) => record._id}
          dataSource={doneTasks}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x: 1200,
            y: 300,
          }}
        />
        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            danger
            onClick={() => dispatch(clearDoneTasks())}
          >
            Clear All
          </Button>
        </div>
      </div>
    </>
  );
};

export default Done;
