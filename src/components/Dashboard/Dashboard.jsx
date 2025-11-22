import React, { useState } from 'react';
import { Typography } from 'antd';
import StatsCards from './StatsCards';
import CountryFilter from './CountryFilter';
import ChartsContainer from './ChartsContainer';
import DataTable from './DataTable';
import { useQuery } from '@tanstack/react-query';
import { fetchGlobalStats, fetchCountryStats } from '../../services/api';

const { Title, Text } = Typography;

const Dashboard = () => {
    const [selectedCountry, setSelectedCountry] = useState('all');

    const { data: stats, isLoading } = useQuery({
        queryKey: ['stats', selectedCountry],
        queryFn: () =>
            selectedCountry === 'all'
                ? fetchGlobalStats()
                : fetchCountryStats(selectedCountry),
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <Title level={2} style={{ margin: 0 }}>
                        {selectedCountry === 'all' ? 'Global Overview' : selectedCountry}
                    </Title>
                    <Text type="secondary">
                        Real-time COVID-19 statistics and analysis
                    </Text>
                </div>
                <CountryFilter
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                />
            </div>

            <StatsCards data={stats} loading={isLoading} />

            <ChartsContainer country={selectedCountry} />

            <DataTable />
        </div>
    );
};

export default Dashboard;
