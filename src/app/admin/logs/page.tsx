// src/app/(main)/logs/page.tsx
import React from 'react';
import KibanaDashboard from '@/components/logs/KibanaDashboard'; // KibanaDashboard 컴포넌트 임포트

export default function LogsPage() {
  const kibanaUrl = "http://localhost:5601"; // 로컬 Kibana URL

  return (
    <div className="flex flex-col gap-4 h-full">

      {/* Kibana 대시보드 임베드 */}
      <KibanaDashboard kibanaUrl={kibanaUrl} />
    </div>
  );
}
