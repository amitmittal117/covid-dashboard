import React from 'react';
import { Layout, Typography, theme } from 'antd';
import { Activity } from 'lucide-react';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const MainLayout = ({ children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="min-h-screen">
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#ffffff',
                    borderBottom: '1px solid #f0f0f0',
                    padding: '0 24px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                }}
            >
                <div className="flex items-center gap-2">
                    <Activity className="text-blue-600 w-8 h-8" />
                    <Title level={4} style={{ margin: 0, color: '#1f2937' }}>
                        COVID-19 Tracker
                    </Title>
                </div>
            </Header>
            <Content style={{ padding: '24px 48px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div
                    style={{
                        minHeight: 280,
                    }}
                >
                    {children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center', background: 'transparent' }}>
                COVID-19 Dashboard ©{new Date().getFullYear()} Created with Ant Design & React
            </Footer>
        </Layout>
    );
};

export default MainLayout;
