import React from 'react';
import { Heart, Github, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* 左側：製作者情報 */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>by Claude & Gemini</span>
          </div>
          
          {/* 中央：技術スタック */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Powered by React + Firebase + Gemini API
            </p>
          </div>
          
          {/* 右側：リンク */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            
            <a
              href="https://firebase.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Firebase</span>
            </a>
          </div>
        </div>
        
        {/* 下部：コピーライト */}
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Podcast Script Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };