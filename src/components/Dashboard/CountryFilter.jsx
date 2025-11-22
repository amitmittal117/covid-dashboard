import React from 'react';
import { Select, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../../services/api';

const { Option } = Select;

const CountryFilter = ({ value, onChange }) => {
    const { data: countries, isLoading } = useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountries,
    });

    return (
        <Select
            showSearch
            value={value}
            placeholder="Select a country"
            optionFilterProp="children"
            onChange={onChange}
            className="w-full md:w-64"
            size="large"
            loading={isLoading}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            <Option value="all">Global</Option>
            {countries?.map((country) => (
                <Option key={country.countryInfo._id || country.country} value={country.country}>
                    <div className="flex items-center gap-2">
                        <img
                            src={country.countryInfo.flag}
                            alt={country.country}
                            className="w-5 h-3 object-cover rounded-sm"
                        />
                        {country.country}
                    </div>
                </Option>
            ))}
        </Select>
    );
};

export default CountryFilter;
