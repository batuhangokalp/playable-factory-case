import { Form, Input, Modal } from "antd";
import React from "react";

const UpdateToDoListModal = ({
  isModalVisible,
  setIsModalVisible,
  form,
  handleSubmit,
}) => {
  return (
    <Modal
      title="Update Task"
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Task"
          name="task"
          rules={[{ required: true, message: "Please input the task!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Image (Link)" name="image">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateToDoListModal;
