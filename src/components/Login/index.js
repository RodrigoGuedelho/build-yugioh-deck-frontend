import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './login.module.css';
import auth from '../../services/Auth';
import { useRouter } from 'next/router';

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  function onFinish() {

  }

  async function loginApi() {
    const response  = await auth.login(login, password);
    if (response)
      router.push("/");
  }
  return (
    <div className={styles.loginContainer}>
      
      <div className={styles.loginForm}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        
        <h2>Fazer Login</h2>
        <Form name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Por favor, insira seu login!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon"
            />} value={login} onChange={(e) => setLogin(e.target.value)}  placeholder="Login" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" 
            value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginButton} onClick={loginApi}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
        <p>
          Ainda não tem uma conta?{' '}
          <Link href="/register">Registrar-se</Link>
        </p>
      </div>

      <div className={styles.bannerWhiteDragon}>
        <img id={styles.imgWhiteDragon} src="/white-dragon.png" />
      </div>
    </div>
  );
}

export default Login;
