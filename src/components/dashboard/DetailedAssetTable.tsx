// src/components/dashboard/DetailedAssetTable.tsx
import React from 'react';
import { Circle } from 'lucide-react';

// PAGES_DOCUMENTATION.md 기반 목업 데이터
const detailedAssetData = [
    { type: '예금', totalAsset: 45000000, averageBalance: 4500000, ratio: 37.5, color: 'var(--primary)' },
    { type: '투자', totalAsset: 32000000, averageBalance: 3200000, ratio: 26.7, color: 'var(--secondary)' },
    { type: '부동산', totalAsset: 28000000, averageBalance: 2800000, ratio: 23.3, color: 'var(--light)' },
    { type: '가상자산', totalAsset: 15000000, averageBalance: 1500000, ratio: 12.5, color: 'var(--primary-dark)' },
];

export default function DetailedAssetTable() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
            {/* 헤더 */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900">자산 타입별 상세 통계</h3>
                <p className="text-sm text-gray-500">평균 잔액 및 총액</p>
            </div>
            
            {/* 테이블 */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    {/* 테이블 헤더 */}
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">자산 타입</th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">총 자산</th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">평균 Balance</th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">비율</th>
                        </tr>
                    </thead>
                    {/* 테이블 바디 */}
                    <tbody>
                        {detailedAssetData.map((item, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                {/* 자산 타입 */}
                                <td className="py-4 px-4">
                                    <div className="flex items-center">
                                        <Circle className="w-3 h-3 mr-3" fill={item.color} stroke={item.color} />
                                        <span className="font-medium text-gray-900">{item.type}</span>
                                    </div>
                                </td>
                                {/* 총 자산 */}
                                <td className="py-4 px-4 text-right text-gray-900">
                                    {item.totalAsset.toLocaleString()} ₩
                                </td>
                                {/* 평균 Balance */}
                                <td className="py-4 px-4 text-right text-gray-900">
                                    {item.averageBalance.toLocaleString()} ₩
                                </td>
                                {/* 비율 배지 */}
                                <td className="py-4 px-4 text-center">
                                    <span className="inline-flex px-3 py-1 rounded-lg text-sm" style={{ backgroundColor: 'var(--light)', color: 'var(--primary-dark)' }}>
                                        {item.ratio.toFixed(1)}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
