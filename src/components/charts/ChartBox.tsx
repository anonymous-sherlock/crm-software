"use client"
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
    color: string;
    title: string;

    dataKey: string;
    number: number | string;
    percentage: number;
    chartData: object[];
};

const ChartBox = ({ chartData, color, dataKey, number, percentage, title }: Props) => {
    return (
        <div className="flex flex-col h-full xs-mob:flex-row">
            <div className="flex-[3] flex flex-col justify-between gap-5">
                <div className="flex text-[14px] items-center gap-2 ">

                    <span>{title}</span>
                </div>
                <h1 className="text-[20px]">{number}</h1>
                <Link href="/" style={{ color: color }}>
                    View all
                </Link>
            </div>
            <div className="flex-[2] flex flex-col justify-between">
                <div className="h-full w-full">
                    <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={chartData}>
                            <Tooltip
                                contentStyle={{ background: "transparent", border: "none" }}
                                labelStyle={{ display: "none" }}
                                position={{ x: 10, y: 70 }}
                            />
                            <Line
                                type="monotone"
                                dataKey={dataKey}
                                stroke={color}
                                strokeWidth={2}
                                dot={false}

                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-col text-right">
                    <span
                        className="font-bold text:[16px] xxl:text-[20px]"
                        style={{ color: percentage < 0 ? "tomato" : "limegreen" }}
                    >
                        {percentage}%
                    </span>
                    <span className="text-[14]">this month</span>
                </div>
            </div>
        </div>
    );
};

export default ChartBox;