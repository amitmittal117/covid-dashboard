import React from 'react';
import { Card, Col, Row, Statistic, Skeleton } from 'antd';
import { Users, Activity, Heart, Skull } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, prefix, color, loading, icon: Icon, today }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow h-full">
            <Skeleton loading={loading} active paragraph={{ rows: 1 }}>
                <div className="flex items-start justify-between">
                    <Statistic
                        title={<span className="text-gray-500 font-medium">{title}</span>}
                        value={value}
                        valueStyle={{ color: '#1f2937', fontWeight: 600 }}
                        prefix={prefix}
                    />
                    <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
                        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                    </div>
                </div>
                {today !== undefined && (
                    <div className="mt-4 flex items-center gap-2 text-sm">
                        <span className="font-medium text-gray-500">Today:</span>
                        <span className="font-semibold text-blue-600">+{today.toLocaleString()}</span>
                    </div>
                )}
            </Skeleton>
        </Card>
    </motion.div>
);

const StatsCards = ({ data, loading }) => {
    if (!data && !loading) return null;

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
                <StatCard
                    title="Total Cases"
                    value={data?.cases}
                    color="bg-blue-500"
                    icon={Users}
                    loading={loading}
                    today={data?.todayCases}
                />
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <StatCard
                    title="Active Cases"
                    value={data?.active}
                    color="bg-yellow-500"
                    icon={Activity}
                    loading={loading}
                />
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <StatCard
                    title="Recovered"
                    value={data?.recovered}
                    color="bg-green-500"
                    icon={Heart}
                    loading={loading}
                    today={data?.todayRecovered}
                />
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <StatCard
                    title="Deaths"
                    value={data?.deaths}
                    color="bg-red-500"
                    icon={Skull}
                    loading={loading}
                    today={data?.todayDeaths}
                />
            </Col>
        </Row>
    );
};

export default StatsCards;
