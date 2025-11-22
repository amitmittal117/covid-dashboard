import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './components/Dashboard/Dashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Inter, sans-serif',
            colorPrimary: '#1890ff',
          },
        }}
      >
        <MainLayout>
          <Dashboard />
        </MainLayout>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
