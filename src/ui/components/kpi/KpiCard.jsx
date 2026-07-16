import React, { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  TrophyOutlined,
  TeamOutlined,
  ProjectOutlined,
  UserOutlined,
  PercentageOutlined,
  FunnelPlotOutlined,
  SmileOutlined,
  CheckCircleOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../../theme/ThemeContext';
import './KpiCard.css';

const ICONS = {
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  TrophyOutlined,
  TeamOutlined,
  ProjectOutlined,
  UserOutlined,
  PercentageOutlined,
  FunnelPlotOutlined,
  SmileOutlined,
  CheckCircleOutlined,
  RocketOutlined,
};

function formatValue(value, prefix = '', suffix = '') {
  if (typeof value === 'number' && value >= 1000 && !suffix.includes('%')) {
    return `${prefix}${value.toLocaleString('es-CO')}${suffix}`;
  }
  if (typeof value === 'number' && Number.isInteger(value) === false) {
    return `${prefix}${value.toLocaleString('es-CO', { maximumFractionDigits: 1 })}${suffix}`;
  }
  return `${prefix}${typeof value === 'number' ? value.toLocaleString('es-CO') : value}${suffix}`;
}

function AnimatedNumber({ value, prefix, suffix, duration = 900 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const from = 0;
    const to = Number(value) || 0;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  const rounded =
    Number(value) % 1 !== 0 ? Math.round(display * 10) / 10 : Math.round(display);
  return <span>{formatValue(rounded, prefix, suffix)}</span>;
}

function MiniSpark({ data = [], color }) {
  const { theme } = useTheme();
  const w = 88;
  const h = 32;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / Math.max(data.length - 1, 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={w} height={h} className="kpi-spark" aria-hidden>
      <polyline
        fill="none"
        stroke={color || theme.custom.accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export default function KpiCard({
  title,
  value,
  prefix = '',
  suffix = '',
  trend = 0,
  comparison,
  color,
  icon,
  spark = [],
  loading = false,
}) {
  const Icon = ICONS[icon] || DollarOutlined;
  const up = trend >= 0;

  return (
    <Card className={`kpi-card ${loading ? 'is-loading' : ''}`} bordered={false}>
      <div className="kpi-card__top">
        <div className="kpi-card__icon" style={{ background: `${color}22`, color }}>
          <Icon />
        </div>
        <MiniSpark data={spark} color={color} />
      </div>
      <Typography.Text className="kpi-card__label">{title}</Typography.Text>
      <Typography.Title level={3} className="kpi-card__value">
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
      </Typography.Title>
      <div className={`kpi-card__trend ${up ? 'up' : 'down'}`}>
        {up ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        <span>{Math.abs(trend).toFixed(1)}%</span>
        {comparison && <em>{comparison}</em>}
      </div>
    </Card>
  );
}
