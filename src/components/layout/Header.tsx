import React from 'react';
import { Mic2, User } from 'lucide-react';

interface HeaderProps {
  userId?: string | null;
}

const Header: React.FC<HeaderProps> = ({ userId }) => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* ロゴ・タイトル */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <Mic2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Podcast Script Studio
              </h1>
              <p className="text-sm text-gray-600">
                AIキャラクター台本生成ツール
              </p>
            </div>
          </div>
          
          {/* ユーザー情報 */}
          <div className="flex items-center space-x-3">
            {userId && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">
                  ID: {userId.substring(0, 8)}...
                </span>
              </div>
            )}
            
            {/* 将来的な機能拡張用 */}
            <div className="text-xs text-gray-400 hidden lg:block">
              v1.0.0
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };