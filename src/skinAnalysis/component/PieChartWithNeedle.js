import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const RADIAN = Math.PI / 180;

const drawNeedle = (value, maxValue, cx, cy, iR, oR, color) => {
  if (typeof value !== 'number' || value < 0 || value > maxValue) {
    console.warn(`Invalid value: ${value}. Needle rendering skipped.`);
    return null;
  }

  const totalSections = maxValue + 1;
  const anglePerSection = 180 / totalSections;
  const angle = 180 - anglePerSection * (value + 0.5); // 바늘은 중앙 각

  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * angle);
  const cos = Math.cos(-RADIAN * angle);
  const r = 5;

  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key="needle-base" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path key="needle-path" d={`M${xba} ${yba} L${xbb} ${ybb} L${xp} ${yp} Z`} fill={color} />,
  ];
};

const getColorForLevel = (index, maxValue) => {
  const gradient = [
    '#c40000', // 6 (deep red)
    '#ea2c2c', // 5 (red)
    '#f16a24', // 4 (dark orange)
    '#f9ae3d', // 3 (orange)
    '#ffe259', // 2 (yellow)
    '#d6e94e', // 1 (yellow-green)
    '#7ddf64', // 0 (green)
  ];
  return gradient[index] || '#ccc';
};

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index, value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const angle = (180 - midAngle) * RADIAN;
  const x = cx + radius * Math.cos(angle);
  const y = cy - radius * Math.sin(angle);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="14px"
      fill="#333"
      fontWeight="bold"
    >
      {index}
    </text>
  );
};

const PieChartWithNeedle = ({ value, maxValue = 5, title }) => {
  const safeValue = typeof value === 'number' && !isNaN(value)
    ? Math.max(0, Math.min(value, maxValue))
    : 0;

  const width = 400;
  const height = 300;
  const cx = 200;
  const cy = 200;
  const iR = 60;
  const oR = 100;

  const data = Array.from({ length: maxValue + 1 }, (_, i) => ({
    name: `${i}`,
    value: 1,
    fill: getColorForLevel(i, maxValue),
  }));

  return (
    <div style={{ textAlign: 'center' }}>
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          dataKey="value"
          cx={cx}
          cy={cy}
          startAngle={0}
          endAngle={180}
          innerRadius={iR}
          outerRadius={oR}
          stroke="none"
          labelLine={false}
          label={renderLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        {drawNeedle(safeValue, maxValue, cx, cy, iR, oR, '#222')}
      </PieChart>
    </div>
  );
};

export default PieChartWithNeedle;