import React, { useMemo } from 'react';
import { Card, Spin, Empty, Typography, Radio } from 'antd';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { fetchHistoricalData } from '../../services/api';
import dayjs from 'dayjs';

const { Title } = Typography;

const ChartsContainer = ({ country }) => {
    const [days, setDays] = React.useState(30);

    const { data, isLoading } = useQuery({
        queryKey: ['historical', country, days],
        queryFn: () => fetchHistoricalData(country, days),
    });

    const chartData = useMemo(() => {
        if (!data) return [];

        let timeline = data;
        if (country !== 'all') {
            if (data.timeline) {
                timeline = data.timeline;
            } else {
                // Sometimes the API returns an array for countries, or structure might vary
                // But usually for single country it returns { country:..., timeline: {...} }
                // If data is null or message, handle it
                return [];
            }
        }

        // timeline structure: { cases: { date: val }, deaths: { date: val }, recovered: { date: val } }
        // We need to transform it to [{ date, cases, deaths, recovered }]

        const dates = Object.keys(timeline.cases || {});
        return dates.map((date) => ({
            date: dayjs(date).format('MMM D'),
            cases: timeline.cases[date],
            deaths: timeline.deaths[date],
            recovered: timeline.recovered[date],
        }));
    }, [data, country]);

    if (isLoading) {
        return (
            <div className="flex justify-center p-12">
                <Spin size="large" />
            </div>
        );
    }

    if (!chartData.length) {
        return (
            <Card className="mt-6">
                <Empty description="No historical data available for this selection" />
            </Card>
        );
    }

    return (
        <Card className="mt-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <Title level={4} style={{ margin: 0 }}>
                    Spread Trends
                </Title>
                <Radio.Group
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    buttonStyle="solid"
                >
                    <Radio.Button value={30}>30 Days</Radio.Button>
                    <Radio.Button value={90}>3 Months</Radio.Button>
                    <Radio.Button value={365}>1 Year</Radio.Button>
                    <Radio.Button value="all">All Time</Radio.Button>
                </Radio.Group>
            </div>

            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="cases"
                            stroke="#3b82f6"
                            fillOpacity={1}
                            fill="url(#colorCases)"
                            name="Cases"
                        />
                        <Area
                            type="monotone"
                            dataKey="recovered"
                            stroke="#22c55e"
                            fillOpacity={1}
                            fill="url(#colorRecovered)"
                            name="Recovered"
                        />
                        <Area
                            type="monotone"
                            dataKey="deaths"
                            stroke="#ef4444"
                            fillOpacity={1}
                            fill="url(#colorDeaths)"
                            name="Deaths"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default ChartsContainer;
