import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './register.module.css';


function Register() {
  function onFinish() {
    
  }
  return (
    <div className={styles.loginContainer}>
      
      <div className={styles.loginForm}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <h2>Cadastre-se e já monte seu deck</h2>
        <Form name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Por favor, insira seu login!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Login" />
          </Form.Item>
          <Form.Item name="name" rules={[{ required: true, message: 'Por favor, insira seu Nome!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Senha" />
          </Form.Item>
          <Form.Item name="repeat-password" rules={[{ required: true, message: 'Por favor, repita sua senha!' }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Repetir Senha" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginButton}>
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
