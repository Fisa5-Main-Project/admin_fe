// src/components/dashboard/DetailedAssetTable.tsx
import React from 'react';
import { Circle } from 'lucide-react';
import { DetailedAssetData } from '@/types/dashboard';
import { getAssetTypeColor, formatCurrency, formatPercentage, getAssetTypeDisplayName } from '@/utils/dashboardHelpers';

interface DetailedAssetTableProps {
    data: DetailedAssetData[];
}

export default function DetailedAssetTable({ data }: DetailedAssetTableProps) {
    // 데이터가 없거나 로딩 중일 때 표시할 UI
    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full flex justify-center items-center">
                <p className="text-gray-500">데이터를 불러오는 중입니다...</p>
            </div>
        );
    }

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
                        {data.map((item, index) => (
                            <tr key={item.type} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                {/* 자산 타입 */}
                                <td className="py-4 px-4">
                                    <div className="flex items-center">
                                        <Circle className="w-3 h-3 mr-3" fill={getAssetTypeColor(item.type)} stroke={getAssetTypeColor(item.type)} />
                                        <span className="font-medium text-gray-900">{getAssetTypeDisplayName(item.type)}</span>
                                    </div>
                                </td>
                                {/* 총 자산 */}
                                <td className="py-4 px-4 text-right text-gray-900">
                                    {formatCurrency(item.totalAsset)}
                                </td>
                                {/* 평균 Balance */}
                                <td className="py-4 px-4 text-right text-gray-900">
                                    {formatCurrency(item.averageBalance)}
                                </td>
                                {/* 비율 배지 */}
                                <td className="py-4 px-4 text-center">
                                    <span className="inline-flex px-3 py-1 rounded-lg text-sm bg-gray-100 text-gray-700">
                                        {formatPercentage(item.ratio)}
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
