import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BiAlarmSnooze, BiTerminal } from "react-icons/bi";
import { Score } from '@prisma/client';


const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
];

interface WPMOverTimeChartProps {
    scores: Score[] | undefined;
}

export default class WPMOverTimeChart extends PureComponent<WPMOverTimeChartProps> {
    render() {
        const { scores } = this.props;

        // Perform calculations with scores to generate data
        return (
            <div className="h-42 w-full">
                <div className='flex align-center justify-center m-auto'>
                    <BiAlarmSnooze size={36} className='mr-4' />
                    <h1 className='text-bold text-xl lg:text-2xl'>WPM Over Time</h1>
                </div>
                <ResponsiveContainer width="100%" height="100%" minHeight={'320px'}>
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }
};
