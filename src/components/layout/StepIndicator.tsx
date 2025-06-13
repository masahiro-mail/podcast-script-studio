import React from 'react';
import { Settings, Lightbulb, FileText, Download, Check } from 'lucide-react';
import { Step } from '@/types';

interface StepIndicatorProps {
  currentStep: Step;
  completedSteps?: Step[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  completedSteps = [] 
}) => {
  const steps = [
    {
      number: 1 as Step,
      title: '初期設定',
      description: 'キャラクター設定',
      icon: Settings,
    },
    {
      number: 2 as Step,
      title: 'テーマ決定',
      description: 'Podcastテーマ',
      icon: Lightbulb,
    },
    {
      number: 3 as Step,
      title: 'コンテンツ生成',
      description: '台本・要約作成',
      icon: FileText,
    },
    {
      number: 4 as Step,
      title: '最終出力',
      description: 'コピー・ダウンロード',
      icon: Download,
    },
  ];
  
  const getStepStatus = (stepNumber: Step) => {
    if (completedSteps.includes(stepNumber)) {
      return 'completed';
    } else if (stepNumber === currentStep) {
      return 'current';
    } else if (stepNumber < currentStep) {
      return 'completed';
    } else {
      return 'upcoming';
    }
  };
  
  const getStepClasses = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          container: 'text-primary-600',
          circle: 'bg-primary-600 border-primary-600 text-white',
          line: 'bg-primary-600',
        };
      case 'current':
        return {
          container: 'text-primary-600',
          circle: 'bg-white border-primary-600 text-primary-600 ring-4 ring-primary-100',
          line: 'bg-gray-300',
        };
      case 'upcoming':
        return {
          container: 'text-gray-400',
          circle: 'bg-white border-gray-300 text-gray-400',
          line: 'bg-gray-300',
        };
      default:
        return {
          container: 'text-gray-400',
          circle: 'bg-white border-gray-300 text-gray-400',
          line: 'bg-gray-300',
        };
    }
  };
  
  return (
    <div className="bg-white py-6 px-4 border-b border-gray-200">
      <div className="container mx-auto">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const status = getStepStatus(step.number);
              const classes = getStepClasses(status);
              const Icon = step.icon;
              const isCompleted = status === 'completed';
              
              return (
                <li key={step.number} className="relative flex-1">
                  <div className="flex items-center">
                    {/* ステップサークル */}
                    <div className="relative flex items-center justify-center">
                      <div className={`
                        flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                        ${classes.circle}
                      `}>
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                    
                    {/* ステップ情報 */}
                    <div className={`ml-3 min-w-0 flex-1 ${classes.container}`}>
                      <div className="text-sm font-medium">
                        ステップ {step.number}: {step.title}
                      </div>
                      <div className="text-xs opacity-75 hidden sm:block">
                        {step.description}
                      </div>
                    </div>
                    
                    {/* 接続線 */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-5 left-10 w-full">
                        <div className={`h-0.5 ${classes.line} transition-all duration-200`} />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
        
        {/* モバイル用簡易表示 */}
        <div className="md:hidden mt-4 text-center">
          <div className="text-sm text-gray-600">
            {currentStep} / {steps.length} ステップ
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { StepIndicator };