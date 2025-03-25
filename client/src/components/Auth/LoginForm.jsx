import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const LoginForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        const { user, token } = response.data;
        message.success("Giriş başarılı");
        form.resetFields();

        localStorage.setItem("storedUser", JSON.stringify(user));
        localStorage.setItem("storedToken", token);
        // window.location = "/";
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        message.error("Kullanıcı Bilgileri Yanlış");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="xl:px-20 px-10 xl:w-1/2 w-full flex flex-col h-full justify-center">
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
            label="E-mail"
            name={"email"}
            rules={[
              {
                required: true,
                message: "E-mail Alanı Boş Bırakılamaz",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Şifre"
            name={"password"}
            rules={[
              {
                required: true,
                message: "Şifre Alanı Boş Bırakılamaz",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name={"remember"} valuePropName="checked">
            <div className="flex justify-between items-center">
              <Checkbox>Remember me</Checkbox>
              <Link>Forgot Password?</Link>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
              loading={loading}
            >
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </Spin>
      <div className="flex justify-center left-0 bottom-10 w-full">
        Henüz bir hesabınız yok mu?&nbsp;
        <Link to="/register" className="text-blue-600">
          Şimdi kaydol
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
