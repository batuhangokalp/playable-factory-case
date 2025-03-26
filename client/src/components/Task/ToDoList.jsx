import { useEffect, useState } from "react";
import { Input, Button, List, Typography } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskAsync,
  fetchTaskAsync,
  createTaskAsync,
} from "../../redux/taskSlice";

const ToDoList = () => {
  const dispatch = useDispatch();
  const taskItems = useSelector((state) => state.task.items);

  const [task, setTask] = useState("");

  useEffect(() => {
    dispatch(fetchTaskAsync());
  }, [dispatch]);

  const handleCreateTask = () => {
    if (!task.trim()) return;
    dispatch(createTaskAsync({ task }));
    setTask("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">To-Do List</h2>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Add new task.."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateTask}
        >
          Add
        </Button>
      </div>
      <div
        className="task-list-container"
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        <List
          bordered
          dataSource={taskItems}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => dispatch(deleteTaskAsync(item._id))}
                />,
              ]}
            >
              <Typography.Text>{item.task}</Typography.Text>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ToDoList;
