import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './register.module.css';
import userService from '@/services/UserService';
import type { NotificationPlacement } from 'antd/es/notification/interface';

function Register() {
  const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const Context = React.createContext({ name: 'Default' });
  function onFinish() {
    
  }

  async function save() {
    try {
      const response = await userService.registerAccount(login, name, password, repeatPassword);
      openNotificationSuccess("Cadastro realizado com sucesso.");
    } catch (error: any) {
      openNotificationError(error.message);
    }
  }

  function openNotificationError (message: string) {
    const placement: NotificationPlacement = 'topRight';
    api.error({
      message: `Notification`,
      description:  message,
      placement,
    });
  };

  function openNotificationSuccess (message: string) {
    const placement: NotificationPlacement = 'topRight';
    api.success({
      message: `Notification`,
      description:  message,
      placement,
    });
  };
  return (
    <div className={styles.loginContainer}>
      {contextHolder}
      <div className={styles.loginForm}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <h2>Cadastre-se e já monte seu deck</h2>
        <Form name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Por favor, insira seu login!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} 
            value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Login" />
          </Form.Item>
          <Form.Item name="name" rules={[{ required: true, message: 'Por favor, insira seu Nome!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} 
            value={name} onChange={(e) => setName(e.target.value)}placeholder="Name" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} 
            value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" />
          </Form.Item>
          <Form.Item name="repeat-password" rules={[{ required: true, message: 'Por favor, repita sua senha!' }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} 
            value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} type="password" placeholder="Repetir Senha" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginButton} 
            onClick={save}>
              Salvar
            </Button>
          </Form.Item>

        </Form>
        <p>
          Entre na sua conta{' '}
          <Link href="/login">Login</Link>
        </p>
      </div>

      <div className={styles.bannerDarkMagician}>
        <img id={styles.darkMagician} src="/dark-magician.png" />
      </div>
    </div>
  );
}

export default Register;
