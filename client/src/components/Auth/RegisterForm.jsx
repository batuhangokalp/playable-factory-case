import { Button, Form, Input, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      const user = response.data;
      if (response.status === 201) {
        message.success("Kayıt başarıyla oluşturuldu");
        form.resetFields();
        localStorage.setItem("storedUser", JSON.stringify(user));
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="xl:px-20 px-10 xl:w-1/2 w-full flex flex-col h-full justify-center relative">
      <h1 className="text-center text-4xl font-bold mb-5">PLAYABLE</h1>
      <h1 className="text-center text-4xl font-bold mb-2">FACTORY</h1>
      <Spin
        spinning={loading}
        size="large"
        className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10"
      >
        <Form
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name={"username"}
            rules={[
              {
                required: true,
                message: "Required Field",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="E-mail"
            name={"email"}
            rules={[
              {
                required: true,
                message: "Required Field",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name={"password"}
            rules={[
              {
                required: true,
                message: "Required Field",
              },
              {
                min: 6,
                message: "At least 6 characters",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Comfirm Password"
            name={"passwordAgain"}
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Required Field",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords must be the same!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Spin>
      <div className="flex justify-center absolute left-0 bottom-10 w-full">
        Do you have an account?&nbsp;
        <Link to="/login" className="text-blue-600">
          Login Now!
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
