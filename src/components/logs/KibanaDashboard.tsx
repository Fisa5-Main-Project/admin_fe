// admin_FE/src/components/logs/KibanaDashboard.tsx
'use client';

import React from 'react';

interface KibanaDashboardProps {
  kibanaUrl: string;
}

/**
 * Kibana 대시보드를 iframe으로 임베드하여 표시하는 클라이언트 컴포넌트입니다.
 * @param {KibanaDashboardProps} props - 임베드할 Kibana 대시보드의 URL
 * @returns {JSX.Element}
 */
export default function KibanaDashboard({ kibanaUrl }: KibanaDashboardProps) {
  return (
    <div className="flex-1 w-full h-[calc(100vh-100px)] border border-gray-200 rounded-2xl overflow-hidden">
      <iframe
        src={kibanaUrl}
        title="Kibana Dashboard"
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}
