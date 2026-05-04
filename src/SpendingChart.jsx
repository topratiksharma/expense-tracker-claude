import ReactECharts from 'echarts-for-react';

const PALETTE = ['#E8A020', '#2DD4A0', '#60A5FA', '#F47070', '#A78BFA', '#FB923C', '#34D399'];

function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

  const categories = Object.keys(expensesByCategory);
  const values = Object.values(expensesByCategory);

  if (categories.length === 0) {
    return (
      <div className="chart-container">
        <p className="chart-empty">No expense data to display.</p>
      </div>
    );
  }

  const option = {
    backgroundColor: 'transparent',
    color: PALETTE,
    title: {
      text: 'SPENDING BY CATEGORY',
      left: 'center',
      top: 12,
      textStyle: {
        fontSize: 10,
        fontWeight: '500',
        color: '#60708A',
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: 3,
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#181C28',
      borderColor: '#2A3048',
      borderWidth: 1,
      padding: [8, 14],
      textStyle: {
        color: '#E4E8F4',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
      },
      formatter: (params) => `${params[0].name}  <b>$${params[0].value.toLocaleString()}</b>`,
    },
    grid: {
      top: 52,
      bottom: 28,
      left: 64,
      right: 20,
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { lineStyle: { color: '#212638' } },
      axisTick: { show: false },
      axisLabel: {
        color: '#60708A',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '${value}',
        color: '#60708A',
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
      },
      splitLine: { lineStyle: { color: '#212638' } },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: 'Spending',
        type: 'bar',
        colorBy: 'data',
        data: values,
        barMaxWidth: 56,
        itemStyle: { borderRadius: [6, 6, 0, 0] },
        label: {
          show: true,
          position: 'top',
          formatter: '${c}',
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: '#E4E8F4',
        },
      },
    ],
  };

  return (
    <div className="chart-container">
      <ReactECharts option={option} style={{ height: 300 }} />
    </div>
  );
}

export default SpendingChart;
