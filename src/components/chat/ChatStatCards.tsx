// src/components/chat/ChatStatCards.tsx
'use client';

import { MessageSquare, User, Clock, Calendar } from 'lucide-react';
import React from 'react';

// 아이콘 이름을 실제 컴포넌트와 매핑하는 객체
const iconMap = {
  MessageSquare,
  User,
  Clock,
  Calendar,
};

// 개별 카드에 대한 타입 정의

interface CardData {

  title: string;

  value: string;

  changeInfo: string;

  changeColor: 'green' | 'gray' | 'red'; // 'red' 타입 추가

  icon: keyof typeof iconMap;

  iconBgColor: string;

  iconColor: string;

}



interface ChatStatCardsProps {

  stats: CardData[];

}



// 개별 통계 카드를 렌더링하는 내부 컴포넌트

const StatCard: React.FC<{ card: CardData }> = ({ card }) => {

  const IconComponent = iconMap[card.icon];



  // changeColor에 따라 클래스를 동적으로 결정

  const changeColorClass = {

    green: 'text-green-600',

    red: 'text-red-600',

    gray: 'text-gray-500',

  }[card.changeColor];



  return (

    <div className="bg-white rounded-2xl p-6 border border-gray-200">

      <div className="flex items-center gap-3 mb-4">

        <div

          className="w-10 h-10 rounded-xl flex items-center justify-center"

          style={{ backgroundColor: card.iconBgColor }}

        >

          {IconComponent && <IconComponent className="w-5 h-5" style={{ color: card.iconColor }} />}

        </div>

        <span className="text-sm font-medium text-gray-600">{card.title}</span>

      </div>

      <div className="text-2xl font-semibold text-gray-900 mb-1">{card.value}</div>

      <div className={`text-xs font-medium ${changeColorClass}`}>

        {card.changeInfo}

      </div>

    </div>

  );

};

export default function ChatStatCards({ stats }: ChatStatCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} card={stat} />
      ))}
    </div>
  );
}
