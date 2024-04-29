import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { BiTerminal } from "react-icons/bi";
import { Score } from '@prisma/client';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface TestTypesChartProps {
    scores: Score[] | undefined;
}

export default class TestTypesChart extends PureComponent<TestTypesChartProps> {
    render() {
        return (
            <div className='flex flex-col m-auto lg:flex-row'>
                <div className='flex flex-col m-auto'>
                    <div className='flex align-center justify-center m-auto -mb-24'>
                        <BiTerminal size={24} className='mr-2'/>
                        <h1 className='text-lg lg:text-xl'>Test durations...</h1>
                    </div>
                    <ResponsiveContainer width="100%" height="100%" minWidth={'420px'} minHeight={'420px'}>
                        <PieChart width={420} height={420}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className='flex flex-col'>
                    <div className='flex align-center justify-center m-auto -mb-24'>
                        <BiTerminal size={24} className='mr-2'/>
                        <h1 className='text-lg lg:text-xl'>Test types!</h1>
                    </div>
                    <ResponsiveContainer width="100%" height="100%" minWidth={'420px'} minHeight={'420px'}>
                        <PieChart width={420} height={420}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className='flex flex-col'>
                    <div className='flex align-center justify-center m-auto -mb-24'>
                        <BiTerminal size={24} className='mr-2'/>
                        <h1 className='text-lg lg:text-xl'>Test device...</h1>
                    </div>
                    <ResponsiveContainer width="100%" height="100%" minWidth={'420px'} minHeight={'420px'}>
                        <PieChart width={420} height={420}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
};
