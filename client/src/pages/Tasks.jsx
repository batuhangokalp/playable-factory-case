import { useState, useEffect } from "react";
import { Button, Popconfirm, Space, Table, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskAsync,
  fetchTaskAsync,
  markTaskAsDone,
  updateTaskAsync,
} from "../redux/taskSlice";
import Header from "../components/Header";
import UpdateToDoListModal from "../components/Task/UpdateToDoListModal";

const Tasks = () => {
  const dispatch = useDispatch();
  const taskItems = useSelector((state) => state.task.items);

  useEffect(() => {
    dispatch(fetchTaskAsync());
  }, [dispatch]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [form] = Form.useForm();

  const handleUpdateClick = (task) => {
    setCurrentTask(task);
    form.setFieldsValue({
      task: task?.task,
      image: task?.image,
    });
    setIsModalVisible(true);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedTask = { ...currentTask, ...values };

        dispatch(
          updateTaskAsync({ taskId: currentTask._id, body: updatedTask })
        );

        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  const handleDoneClick = (taskId) => {
    dispatch(markTaskAsDone(taskId));
    dispatch(deleteTaskAsync(taskId));
  };
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
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            style={{ backgroundColor: "green", borderColor: "green" }}
            onClick={() => handleDoneClick(record._id)}
          >
            Done
          </Button>
          <Button type="primary" onClick={() => handleUpdateClick(record)}>
            Update
          </Button>
          <Popconfirm
            title="Delete Task"
            description="Are you sure you want to delete task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => dispatch(deleteTaskAsync(record._id))}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Header />
      <div className="px-24 overflow-y-auto">
        <Table
          rowKey={(record) => record._id}
          dataSource={taskItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x: 1200,
            y: 500,
          }}
        />
      </div>
      <UpdateToDoListModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        form={form}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Tasks;
