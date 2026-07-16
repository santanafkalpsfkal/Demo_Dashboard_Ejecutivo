import React, { useState } from 'react';
import { Button, Space, Tag, message } from 'antd';
import { DownloadOutlined, FileExcelOutlined, FilePdfOutlined } from '@ant-design/icons';
import PageHeader from '../components/common/PageHeader';
import EnterpriseTable, { RowActions } from '../components/tables/EnterpriseTable';
import { reportsCatalog, COMPANY } from '../../data/mock/executiveData';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import './module.css';

function downloadDemoExcel(report) {
  const rows = [
    ['Reporte', report.name],
    ['Área', report.area],
    ['Actualizado', report.actualizado],
    ['Generado por', COMPANY.product],
    [],
    ['Indicador', 'Valor', 'Variación'],
    ['Ingresos', '2148000', '+8.1%'],
    ['Utilidad', '1161600', '+15.6%'],
    ['NPS', '72', '+5.0'],
    ['Cumplimiento', '94.2%', '+1.1%'],
  ];
  const csv = rows.map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${report.id}_${report.name.replace(/\s+/g, '_')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  message.success('Exportación Excel (CSV) simulada');
}

function downloadDemoPdf(report) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(COMPANY.product, 14, 18);
  doc.setFontSize(11);
  doc.text('by SCKora Systems', 14, 26);
  doc.setFontSize(14);
  doc.text(report.name, 14, 40);
  doc.setFontSize(10);
  doc.text(`Área: ${report.area}  ·  Actualizado: ${report.actualizado}`, 14, 48);
  autoTable(doc, {
    startY: 56,
    head: [['Indicador', 'Valor', 'Variación']],
    body: [
      ['Ingresos', '$2,148,000', '+8.1%'],
      ['Utilidad', '$1,161,600', '+15.6%'],
      ['Clientes activos', '1,186', '+4.2%'],
      ['NPS', '72', '+5.0'],
      ['Cumplimiento', '94.2%', '+1.1%'],
    ],
  });
  doc.setFontSize(9);
  doc.text('Desarrollado por SCKora Systems — Demo Dashboard Ejecutivo', 14, doc.internal.pageSize.height - 12);
  doc.save(`${report.id}.pdf`);
  message.success('PDF exportado');
}

export default function Reports() {
  const [loadingId, setLoadingId] = useState(null);

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 90 },
    { title: 'Reporte', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    {
      title: 'Área',
      dataIndex: 'area',
      filters: [...new Set(reportsCatalog.map((r) => r.area))].map((a) => ({ text: a, value: a })),
      onFilter: (v, r) => r.area === v,
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      render: (t) => (
        <Tag icon={t === 'PDF' ? <FilePdfOutlined /> : <FileExcelOutlined />} color={t === 'PDF' ? 'red' : 'green'}>
          {t}
        </Tag>
      ),
    },
    { title: 'Actualizado', dataIndex: 'actualizado' },
    {
      title: 'Exportar',
      key: 'export',
      render: (_, r) => (
        <Space>
          <Button
            size="small"
            icon={<FilePdfOutlined />}
            loading={loadingId === `${r.id}-pdf`}
            onClick={() => {
              setLoadingId(`${r.id}-pdf`);
              setTimeout(() => {
                downloadDemoPdf(r);
                setLoadingId(null);
              }, 400);
            }}
          >
            PDF
          </Button>
          <Button
            size="small"
            icon={<DownloadOutlined />}
            loading={loadingId === `${r.id}-xls`}
            onClick={() => {
              setLoadingId(`${r.id}-xls`);
              setTimeout(() => {
                downloadDemoExcel(r);
                setLoadingId(null);
              }, 400);
            }}
          >
            Excel
          </Button>
        </Space>
      ),
    },
    { title: '', key: 'a', width: 100, render: () => <RowActions /> },
  ];

  return (
    <div className="module-page" data-tour="page-reports">
      <PageHeader
        title="Reportes"
        subtitle="Catálogo de reportes ejecutivos con exportación PDF y Excel simulada."
        breadcrumb={['SCKora', 'Reportes']}
      />
      <EnterpriseTable
        title="Reportes descargables"
        columns={columns}
        dataSource={reportsCatalog}
        searchPlaceholder="Buscar reporte o área..."
      />
    </div>
  );
}
