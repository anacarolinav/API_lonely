import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Example = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/stats1')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="items.items.0.0.items.7.items.0.value.text" />
                <YAxis />
                <Tooltip />
                <Legend />
                {data.length > 0 && (
                    <Bar dataKey="frequency" fill="#8884d8" />
                )}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Example;




