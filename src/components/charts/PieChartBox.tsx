"use client"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";


const data = [
    { name: "Mobile", value: 400, color: "#0088FE" },
    { name: "Desktop", value: 300, color: "#00C49F" },
    { name: "Laptop", value: 300, color: "#FFBB28" },
    { name: "Tablet", value: 200, color: "#FF8042" },
];

const PieChartBox = () => {
    return (
        <div className="pieChartBox h-full flex flex-col justify-between">
            <h1 className="text-2xl">Leads by Source</h1>
            <div className="chart flex item-center justify-center w-full h-full">
                <ResponsiveContainer width="99%" height={300}>
                    <PieChart>
                        <Tooltip
                            contentStyle={{ background: "white", borderRadius: "5px" }}
                        />
                        <Pie
                            data={data}
                            innerRadius={"70%"}
                            outerRadius={"90%"}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((item) => (
                                <Cell key={item.name} fill={item.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="options flex justify-center items-center gap-2 text-sm flex-wrap flex-initial">
                {data.map((item) => (
                    <div className="option flex flex-col items-center gap-2" key={item.name}>
                        <div className="title flex gap-2 items-center">
                            <div className="dot w-[10px] h-[10px] rounded-full" style={{ backgroundColor: item.color }} />
                            <span>{item.name}</span>
                        </div>
                        <span>{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChartBox;
