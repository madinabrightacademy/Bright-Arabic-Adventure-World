import React from 'react';
import { Home, Compass, Gamepad2, User, BookOpen } from 'lucide-react';

export type NavTab = 'home' | 'learn' | 'world' | 'games' | 'profile';

interface NavigationProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'Beranda', icon: Home, badge: null },
    { id: 'learn' as NavTab, label: 'Belajar', icon: BookOpen, badge: null },
    { id: 'world' as NavTab, label: 'Dunia', icon: Compass, badge: '8 Pulau' },
    { id: 'games' as NavTab, label: 'Game', icon: Gamepad2, badge: '29 Game' },
    { id: 'profile' as NavTab, label: 'Profil', icon: User, badge: null },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200/80 px-2 py-1.5 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all active:scale-90 relative ${
                isActive ? 'text-teal-700 font-extrabold' : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div
                className={`w-10 h-7 rounded-full flex items-center justify-center transition-all ${
                  isActive ? 'bg-teal-100 text-teal-700' : 'text-slate-500'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] leading-tight mt-0.5">{tab.label}</span>

              {tab.badge && (
                <span className="absolute -top-1 right-2 bg-amber-400 text-amber-950 text-[9px] font-black px-1.5 py-0.2 rounded-full scale-90">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
