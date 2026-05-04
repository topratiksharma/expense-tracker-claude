import ReactECharts from 'echarts-for-react';

function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

  const categories = Object.keys(expensesByCategory);
  const values = Object.values(expensesByCategory);

  const option = {
    title: {
      text: 'Spending by Category',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'normal' },
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => `${params[0].name}: $${params[0].value}`,
    },
    xAxis: {
      type: 'category',
      data: categories,
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: '${value}' },
    },
    series: [
      {
        name: 'Spending',
        type: 'bar',
        colorBy: 'data',
        data: values,
        label: {
          show: true,
          position: 'top',
          formatter: '${c}',
        },
      },
    ],
  };

  if (categories.length === 0) {
    return (
      <div className="chart-container">
        <p className="chart-empty">No expense data to display.</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <ReactECharts option={option} style={{ height: 360 }} />
    </div>
  );
}

export default SpendingChart;
