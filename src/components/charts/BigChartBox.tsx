"use client"
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [
    {
        name: "Sun",
        books: 4000,
        drpower: 2400,
        ketoguru: 2400,
    },
    {
        name: "Mon",
        books: 3000,
        drpower: 1398,
        ketoguru: 2210,
    },
    {
        name: "Tue",
        books: 2000,
        drpower: 9800,
        ketoguru: 2290,
    },
    {
        name: "Wed",
        books: 2780,
        drpower: 3908,
        ketoguru: 2000,
    },
    {
        name: "Thu",
        books: 1890,
        drpower: 4800,
        ketoguru: 2181,
    },
    {
        name: "Fri",
        books: 2390,
        drpower: 3800,
        ketoguru: 2500,
    },
    {
        name: "Sat",
        books: 3490,
        drpower: 4300,
        ketoguru: 2100,
    },
];

const BigChartBox = () => {
    return (
        <div className="bigChartBox w-full h-full flex flex-col justify-between">
            <h1 className="text-[24px]">Revenue Analytics</h1>
            <div className="chart w-full h-[300px]">
                <ResponsiveContainer width="99%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="ketoguru"
                            name="Keto Guru"
                            stackId="1"
                            stroke="#8884d8"
                            fill="#8884d8"
                        />
                        <Area
                            type="monotone"
                            dataKey="drpower"
                            name="Dr. Power"
                            stackId="1"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                        />
                        <Area
                            type="monotone"
                            dataKey="books"
                            stackId="1"
                            stroke="#ffc658"
                            fill="#ffc658"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BigChartBox;
