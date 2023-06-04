import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Example = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/stats2')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);

    console.log(data)

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {data.length > 0 && (
                    <>
                        <Line type="monotone" dataKey="frequency" stroke="#8884d8" activeDot={{ r: 8 }} />
                        
                    </>
                )}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Example;

