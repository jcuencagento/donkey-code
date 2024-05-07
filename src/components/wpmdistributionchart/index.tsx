import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BiAbacus, BiTerminal } from "react-icons/bi";
import { Score, User } from '@prisma/client';


const data = [
    {
      name: '0%',
      wpm: 60,
    },
    {
      name: '12.5%',
      wpm: 80,
    },
    {
      name: '25%',
      wpm: 30,
    },
    {
      name: '37.5%',
      wpm: 45,
    },
    {
      name: '50%',
      wpm: 40,
    },
    {
      name: '62.5%',
      wpm: 55,
    },
    {
      name: '75%',
      wpm: 60,
    },
    {
      name: '87.5%',
      wpm: 50,
    },
    {
      name: '100%',
      wpm: 35,
    },
];

interface WPMDistributionChartProps {
    users: User[] | undefined;
    scores: Score[] | undefined;
}

function generateNormalDistributionData(scores: Score[] | undefined) {
    const scores_wpm = scores?.map(score => score.wpm);
    scores_wpm?.sort((a: string, b: string) => parseInt(a) - parseInt(b));

    const numPoints = scores_wpm?.length || 1;
    const data : object[] = [];
    for (let i = 0; i < numPoints; i++) {
        const div: any = i / (numPoints - 1);
        const percentile = div.toFixed(2) * 100;
        const wpm = scores_wpm ? scores_wpm[i] : 50;
        if (i%3 === 0) {
            data.push({ name: `${percentile}%`, wpm });
        }
    }

    return data;
}

export default class WPMDistributionChart extends PureComponent<WPMDistributionChartProps> {
    render() {
        const { scores } = this.props;
        return (
            <div className="h-42 w-full">
                <div className='flex align-center justify-center m-auto'>
                    <BiAbacus size={36} className='mr-4' />
                    <h1 className='text-bold text-xl lg:text-2xl'>WPM Distribution</h1>
                </div>
                <ResponsiveContainer width="100%" height="100%" minHeight={'320px'}>
                    <AreaChart
                        width={500}
                        height={400}
                        data={generateNormalDistributionData(scores)}
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
                        <Area type="monotone" dataKey="wpm" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }
};
