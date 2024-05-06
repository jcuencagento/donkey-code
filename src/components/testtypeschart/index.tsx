import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { BiTerminal } from "react-icons/bi";
import { Score } from '@prisma/client';

const reduceDurations = (data) => {
    const reducedData = data.reduce((acc, curr) => {
        switch (curr.gameDuration) {
            case '30':
                acc[0].value++;
            break;

            case '45':
                acc[1].value++;
            break;

            case '60':
                acc[2].value++;
            break;

            case '120':
                acc[3].value++;
            break;

            default:
            break;
        }

        return acc;
    },
    [
        { name: '30', value: 0 },
        { name: '45', value: 0 },
        { name: '60', value: 0 },
        { name: '120', value: 0 },
    ]);

    return reducedData;
};

const reduceGameTypes = (data) => {
    const reducedData = data.reduce((acc, curr) => {
        switch (curr.gameType) {
            case 'JavaScript':
                acc[0].value++;
            break;

            case 'Python':
                acc[1].value++;
            break;

            case 'English':
                acc[2].value++;
            break;

            case 'Spanish':
                acc[3].value++;
            break;

            case 'Quotes':
                acc[4].value++;
            break;

            default:
            break;
        }

        return acc;
    },
    [
        { name: 'JavaScript', value: 0 },
        { name: 'Python', value: 0 },
        { name: 'English', value: 0 },
        { name: 'Spanish', value: 0 },
        { name: 'Quotes', value: 0 },
    ]);

    return reducedData;
};

const reduceDevice = (data) => {
    const reducedData = data.reduce((acc, curr) => {
        console.log(curr.mobile);
        if (curr.mobile) {
            acc[0].value++;
        } else {
            acc[1].value++;
        }

        return acc;
    },
    [
        { name: 'Mobile', value: 0 },
        { name: 'PC', value: 0 },
    ]);

    return reducedData;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) {
        return;
    }

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
        const { scores } = this.props;

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
                                data={reduceDurations(scores)}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value">
                                {reduceDurations(scores).map((entry, index) => (
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
                                data={reduceGameTypes(scores)}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value">
                                {reduceGameTypes(scores).map((entry, index) => (
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
                                data={reduceDevice(scores)}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value">
                                {reduceDevice(scores).map((entry, index) => (
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
