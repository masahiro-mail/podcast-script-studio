import React, { useState } from 'react';
import { FileText, Type, FileCheck, MessageSquare } from 'lucide-react';
import { ContentField } from '@/types';
import { useGenerationStore } from '@/store';

interface ContentTabsProps {
  children: (activeTab: ContentField, setActiveTab: (tab: ContentField) => void) => React.ReactNode;
}

const ContentTabs: React.FC<ContentTabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ContentField>('script');
  const { generatedContent, isGenerating } = useGenerationStore();
  
  const tabs = [
    {
      id: 'script' as ContentField,
      label: '台本',
      icon: FileText,
      description: 'メイン台本',
    },
    {
      id: 'title' as ContentField,
      label: 'タイトル',
      icon: Type,
      description: 'Podcastタイトル',
    },
    {
      id: 'summary' as ContentField,
      label: '要約',
      icon: FileCheck,
      description: '概要欄用',
    },
    {
      id: 'snsPost' as ContentField,
      label: 'SNS投稿',
      icon: MessageSquare,
      description: '告知用ポスト',
    },
  ];
  
  const getTabStatus = (tabId: ContentField) => {
    const hasContent = generatedContent[tabId].length > 0;
    const isCurrentlyGenerating = isGenerating[tabId];
    
    if (isCurrentlyGenerating) return 'generating';
    if (hasContent) return 'completed';
    return 'empty';
  };
  
  const getTabClasses = (tabId: ContentField) => {
    const isActive = activeTab === tabId;
    // const status = getTabStatus(tabId);
    
    let baseClasses = 'relative flex-1 flex flex-col items-center p-4 border-b-2 transition-all duration-200 cursor-pointer';
    
    if (isActive) {
      baseClasses += ' border-primary-500 bg-primary-50 text-primary-700';
    } else {
      baseClasses += ' border-transparent hover:border-gray-300 hover:bg-gray-50 text-gray-600 hover:text-gray-800';
    }
    
    return baseClasses;
  };
  
  const getStatusIndicator = (tabId: ContentField) => {
    const status = getTabStatus(tabId);
    
    switch (status) {
      case 'generating':
        return <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>;
      case 'completed':
        return <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"></div>;
      default:
        return <div className="absolute top-2 right-2 w-2 h-2 bg-gray-300 rounded-full"></div>;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* タブナビゲーション */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={getTabClasses(tab.id)}
              >
                {getStatusIndicator(tab.id)}
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-sm font-medium">{tab.label}</span>
                <span className="text-xs opacity-75 hidden sm:block">{tab.description}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* タブコンテンツ */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {children(activeTab, setActiveTab)}
      </div>
      
      {/* 進行状況サマリー */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tabs.map((tab) => {
          const status = getTabStatus(tab.id);
          const content = generatedContent[tab.id];
          
          return (
            <div
              key={tab.id}
              className="bg-white border border-gray-200 rounded-lg p-3 text-center"
            >
              <div className="text-sm font-medium text-gray-700">{tab.label}</div>
              <div className="text-xs text-gray-500 mt-1">
                {status === 'generating' && '生成中...'}
                {status === 'completed' && `${content.length}文字`}
                {status === 'empty' && '未生成'}
              </div>
              <div className="mt-2">
                {status === 'generating' && <div className="w-full h-1 bg-yellow-200 rounded-full"><div className="h-1 bg-yellow-500 rounded-full animate-pulse" style={{width: '60%'}}></div></div>}
                {status === 'completed' && <div className="w-full h-1 bg-green-500 rounded-full"></div>}
                {status === 'empty' && <div className="w-full h-1 bg-gray-200 rounded-full"></div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { ContentTabs };