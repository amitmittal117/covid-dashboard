import React, { useMemo } from 'react';
import { Card, Spin, Empty, Typography, Radio } from 'antd';
import {
    ComposedChart,
    Area,
    Line,
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
                return [];
            }
        }

        const dates = Object.keys(timeline.cases || {});
        const sortedDates = dates.sort((a, b) => new Date(a) - new Date(b));

        // Calculate daily new cases and Rt
        const processedData = sortedDates.map((date, index) => {
            const cases = timeline.cases[date];
            const deaths = timeline.deaths[date];
            const recovered = timeline.recovered[date];

            // Calculate daily new cases
            const prevCases = index > 0 ? timeline.cases[sortedDates[index - 1]] : cases;
            const newCases = Math.max(0, cases - prevCases);

            return {
                dateStr: date,
                date: dayjs(date).format('MMM D'),
                cases,
                deaths,
                recovered,
                newCases,
            };
        });

        // Calculate 7-day moving average and Rt
        return processedData.map((item, index, array) => {
            // Need at least 7 days for moving average
            if (index < 6) return { ...item, rt: null };

            const getAvg = (idx) => {
                const slice = array.slice(idx - 6, idx + 1);
                const sum = slice.reduce((acc, curr) => acc + curr.newCases, 0);
                return sum / 7;
            };

            const currentAvg = getAvg(index);
            // Compare with 4 days ago (serial interval approx)
            const prevAvgIndex = index - 4;

            let rt = null;
            if (prevAvgIndex >= 6) {
                const prevAvg = getAvg(prevAvgIndex);
                if (prevAvg > 0) {
                    rt = currentAvg / prevAvg;
                }
            }

            return {
                ...item,
                rt: rt ? parseFloat(rt.toFixed(2)) : null,
            };
        });
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
                    Spread Trends & Estimated Rt
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
                    <ComposedChart
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            domain={[0, 5]}
                            allowDataOverflow={true}
                            label={{ value: 'Rt (Transmission Rate)', angle: -90, position: 'insideRight' }}
                        />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend />
                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="cases"
                            stroke="#3b82f6"
                            fillOpacity={1}
                            fill="url(#colorCases)"
                            name="Total Cases"
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="rt"
                            stroke="#ff7300"
                            strokeWidth={2}
                            dot={false}
                            name="Estimated Rt"
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default ChartsContainer;
