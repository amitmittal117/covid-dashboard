import React from 'react';
import { Table, Card, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../../services/api';

const { Title } = Typography;

const DataTable = () => {
    const { data: countries, isLoading } = useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountries,
    });

    const columns = [
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            sorter: (a, b) => a.country.localeCompare(b.country),
            render: (text, record) => (
                <div className="flex items-center gap-2">
                    <img
                        src={record.countryInfo.flag}
                        alt={text}
                        className="w-6 h-4 object-cover rounded-sm shadow-sm"
                    />
                    <span className="font-medium">{text}</span>
                </div>
            ),
        },
        {
            title: 'Total Cases',
            dataIndex: 'cases',
            key: 'cases',
            sorter: (a, b) => a.cases - b.cases,
            render: (val) => val.toLocaleString(),
            align: 'right',
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            sorter: (a, b) => a.active - b.active,
            render: (val) => val.toLocaleString(),
            align: 'right',
            responsive: ['md'],
        },
        {
            title: 'Recovered',
            dataIndex: 'recovered',
            key: 'recovered',
            sorter: (a, b) => a.recovered - b.recovered,
            render: (val) => val.toLocaleString(),
            align: 'right',
            responsive: ['sm'],
        },
        {
            title: 'Deaths',
            dataIndex: 'deaths',
            key: 'deaths',
            sorter: (a, b) => a.deaths - b.deaths,
            render: (val) => val.toLocaleString(),
            align: 'right',
        },
    ];

    return (
        <Card className="mt-6 shadow-sm">
            <Title level={4} className="mb-4">
                Global Statistics by Country
            </Title>
            <Table
                columns={columns}
                dataSource={countries}
                rowKey={(record) => record.countryInfo._id || record.country}
                loading={isLoading}
                pagination={{ pageSize: 10 }}
                scroll={{ x: true }}
            />
        </Card>
    );
};

export default DataTable;
