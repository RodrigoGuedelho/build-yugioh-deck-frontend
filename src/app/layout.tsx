
"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';
import auth from '../services/Auth';
import { useEffect, useState } from 'react';
const inter = Inter({ subsets: ['latin'] })
import { Breadcrumb, Layout, theme } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
const { Header, Content, Footer } = Layout;

interface MenuItem {
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuProps['items'] = [
    {
      label: (
        <a target="_blank" rel="Logout" onClick={auth.logout}>
          Logout
        </a>
      ),
      key: '0',
    },
  ];
 
  useEffect(() => {
    if (!auth.isAuthenticated())
      router.push("/login")
    
  }, [])

  useEffect(()=> {
    if (localStorage)
      setUserName(auth.getNameUser().toString().toUpperCase())
  }, [])

  function navigateHomePage() {
    router.push("/")
  }

  return (
    <Layout className="layout">
      
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="layout-logo" >
          <Image src={'/logo.png'}
            alt="Logo" width={150} height={70} onClick={navigateHomePage}/>  
        </div> 

        <Header className='dropdown-menu-logout'>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <UserOutlined />
                {userName}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>
      </Header>
      
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ background: colorBgContainer }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Rodrigo Guedelho ©2023 Created by Ant UED</Footer>
    </Layout>
  )
}
