import React, { useMemo } from 'react';
import { Card, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { useTheme } from '../../../theme/ThemeContext';
import './ChartCard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
);

const baseOptions = (isDark) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 10,
        usePointStyle: true,
        color: isDark ? '#94a3b8' : '#64748b',
        font: { size: 11, family: 'inherit' },
      },
    },
    tooltip: {
      backgroundColor: isDark ? '#1e293b' : '#0f172a',
      padding: 10,
      cornerRadius: 8,
    },
  },
  scales: undefined,
});

export function ChartCard({ title, subtitle, children, extra, height = 280 }) {
  return (
    <Card className="chart-card" bordered={false} extra={extra}>
      <div className="chart-card__head">
        <div>
          <Typography.Title level={5} className="chart-card__title">
            {title}
          </Typography.Title>
          {subtitle && (
            <Typography.Text type="secondary" className="chart-card__sub">
              {subtitle}
            </Typography.Text>
          )}
        </div>
      </div>
      <div className="chart-card__body" style={{ height }}>
        {children}
      </div>
    </Card>
  );
}

export function LineChartWidget({ labels, datasets, fill = false }) {
  const { chartPalette, theme } = useTheme();
  const isDark = theme.algorithm === 'dark';

  const data = useMemo(
    () => ({
      labels,
      datasets: datasets.map((ds, i) => ({
        ...ds,
        borderColor: ds.borderColor || chartPalette[i % chartPalette.length],
        backgroundColor:
          ds.backgroundColor ||
          (fill ? `${chartPalette[i % chartPalette.length]}33` : chartPalette[i % chartPalette.length]),
        tension: 0.35,
        fill: fill || ds.fill,
        pointRadius: 2,
        borderWidth: 2.5,
      })),
    }),
    [labels, datasets, chartPalette, fill]
  );

  const options = {
    ...baseOptions(isDark),
    scales: {
      x: {
        grid: { color: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.04)' },
        ticks: { color: isDark ? '#94a3b8' : '#64748b' },
      },
      y: {
        grid: { color: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)' },
        ticks: { color: isDark ? '#94a3b8' : '#64748b' },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export function AreaChartWidget({ labels, datasets }) {
  return <LineChartWidget labels={labels} datasets={datasets} fill />;
}

export function BarChartWidget({ labels, datasets, stacked = false }) {
  const { chartPalette, theme } = useTheme();
  const isDark = theme.algorithm === 'dark';

  const data = useMemo(
    () => ({
      labels,
      datasets: datasets.map((ds, i) => ({
        ...ds,
        backgroundColor: ds.backgroundColor || chartPalette[i % chartPalette.length],
        borderRadius: 6,
        borderSkipped: false,
      })),
    }),
    [labels, datasets, chartPalette]
  );

  const options = {
    ...baseOptions(isDark),
    scales: {
      x: {
        stacked,
        grid: { display: false },
        ticks: { color: isDark ? '#94a3b8' : '#64748b' },
      },
      y: {
        stacked,
        grid: { color: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)' },
        ticks: { color: isDark ? '#94a3b8' : '#64748b' },
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export function DonutChartWidget({ labels, values }) {
  const { chartPalette, theme } = useTheme();
  const isDark = theme.algorithm === 'dark';

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: chartPalette.slice(0, labels.length),
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    ...baseOptions(isDark),
    cutout: '68%',
    plugins: {
      ...baseOptions(isDark).plugins,
      legend: {
        ...baseOptions(isDark).plugins.legend,
        position: 'right',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}

export function RadarChartWidget({ labels, datasets }) {
  const { chartPalette, theme } = useTheme();
  const isDark = theme.algorithm === 'dark';

  const data = {
    labels,
    datasets: datasets.map((ds, i) => ({
      ...ds,
      borderColor: chartPalette[i % chartPalette.length],
      backgroundColor: `${chartPalette[i % chartPalette.length]}33`,
      pointBackgroundColor: chartPalette[i % chartPalette.length],
      borderWidth: 2,
    })),
  };

  const options = {
    ...baseOptions(isDark),
    scales: {
      r: {
        angleLines: { color: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)' },
        grid: { color: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)' },
        pointLabels: { color: isDark ? '#cbd5e1' : '#475569', font: { size: 11 } },
        ticks: { display: false },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return <Radar data={data} options={options} />;
}

export function HeatmapWidget({ data, rowLabels, colLabels }) {
  const { chartPalette } = useTheme();
  const flat = data.flat();
  const max = Math.max(...flat, 1);

  return (
    <div className="heatmap">
      <div className="heatmap__cols">
        <span />
        {colLabels.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
      {data.map((row, ri) => (
        <div className="heatmap__row" key={rowLabels[ri]}>
          <span className="heatmap__ylab">{rowLabels[ri]}</span>
          {row.map((cell, ci) => {
            const intensity = cell / max;
            return (
              <div
                key={`${ri}-${ci}`}
                className="heatmap__cell"
                title={`${rowLabels[ri]} · ${colLabels[ci]}: ${cell}`}
                style={{
                  background: chartPalette[0],
                  opacity: 0.15 + intensity * 0.85,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
