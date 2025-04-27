import React, { useState } from 'react';
import { Shield, Bell, Settings, HelpCircle, User, LogOut, ChevronDown, UserCircle, Mail, AlertCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);

  const notifications = [
    { id: 1, title: "New High Severity Incident", time: "5m ago" },
    { id: 2, title: "System Update Available", time: "1h ago" },
    { id: 3, title: "Weekly Report Ready", time: "2h ago" }
  ];

  const closeAllMenus = () => {
    setShowNotifications(false);
    setShowUserMenu(false);
    setShowHelpMenu(false);
  };

  const toggleMenu = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    currentState: boolean
  ) => {
    closeAllMenus();
    setter(!currentState);
  };

  return (
    <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400/10 rounded-lg">
              <Shield size={24} className="text-amber-400" />
            </div>
            <span className="text-xl font-semibold text-amber-400">AI Safety</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button 
                className="p-2 text-gray-400 hover:text-amber-400 transition-colors relative"
                onClick={() => toggleMenu(setShowNotifications, showNotifications)}
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-300">Notifications</h3>
                  </div>
                  {notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className="px-4 py-3 hover:bg-gray-700/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-1 bg-amber-400/10 rounded">
                          <AlertCircle size={16} className="text-amber-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-300">{notification.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-2 border-t border-gray-700 mt-1">
                    <button className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Help Menu */}
            <div className="relative">
              <button 
                className="p-2 text-gray-400 hover:text-amber-400 transition-colors"
                onClick={() => toggleMenu(setShowHelpMenu, showHelpMenu)}
              >
                <HelpCircle size={20} />
              </button>
              
              {showHelpMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 animate-fadeIn">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700/50 transition-colors">
                    Documentation
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700/50 transition-colors">
                    FAQs
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700/50 transition-colors">
                    Contact Support
                  </button>
                </div>
              )}
            </div>

            <button className="p-2 text-gray-400 hover:text-amber-400 transition-colors">
              <Settings size={20} />
            </button>

            <div className="w-px h-6 bg-gray-700 mx-2"></div>

            {/* User Menu */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
                onClick={() => toggleMenu(setShowUserMenu, showUserMenu)}
              >
                <User size={18} />
                <span className="text-sm">Account</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                      <UserCircle size={32} className="text-amber-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-300">John Doe</p>
                        <p className="text-xs text-gray-500">john@example.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700/50 transition-colors flex items-center gap-2">
                    <UserCircle size={16} />
                    Profile Settings
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700/50 transition-colors flex items-center gap-2">
                    <Mail size={16} />
                    Messages
                  </button>
                  <div className="border-t border-gray-700 mt-1 pt-1">
                    <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700/50 transition-colors flex items-center gap-2">
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;