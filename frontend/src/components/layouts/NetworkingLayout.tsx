import React, { useState } from 'react';
import { Users, Briefcase, Bell } from 'lucide-react';

interface NetworkingLayoutProps {
  children?: React.ReactNode;
}

type TabKey = 'referrals' | 'recruitment' | 'notifications';

const NetworkingLayout: React.FC<NetworkingLayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('referrals');

  const nav = [
    { key: 'referrals' as TabKey, name: 'Referrals', icon: Users },
    { key: 'recruitment' as TabKey, name: 'Recruitment', icon: Briefcase },
    { key: 'notifications' as TabKey, name: 'Notifications', icon: Bell },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'referrals':
        return (
          <div>
            <div className="bg-white rounded-2xl shadow p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Referrals</h2>
                <button className="text-sm text-blue-600">Create referral</button>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border border-gray-100 rounded-lg flex items-start justify-between">
                    <div>
                      <div className="font-medium">Referral {i} — Company {i}</div>
                      <div className="text-sm text-gray-500">Referred by: Alumni {i}</div>
                    </div>
                    <div className="text-sm text-gray-500">2 candidates</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'recruitment':
        return (
          <div>
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recruitment</h2>
                <button className="text-sm text-blue-600">Post a job</button>
              </div>
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4 border border-gray-100 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Job Title {i}</div>
                        <div className="text-sm text-gray-500">Company {i} — Full-time</div>
                      </div>
                      <div className="text-sm text-gray-500">Remote</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div>
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Job Notifications</h2>
                <div className="text-sm text-gray-400">5 new</div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">New job: Role {i}</div>
                      <div className="text-xs text-gray-500">Company {i} — posted 1d ago</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-100">
                <button className="w-full bg-blue-900 text-white py-2 rounded-lg">View all notifications</button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-yellow-400" />
            <div>
              <h1 className="text-xl font-bold font-['Poppins']">Networking</h1>
              <p className="text-blue-200 text-sm">Referrals · Recruitment · Jobs</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {nav.map((item) => {
              const Icon = item.icon;
              const selected = activeTab === item.key;
              return (
                <li key={item.key}>
                  <button
                    onClick={() => setActiveTab(item.key)}
                    className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selected ? 'bg-yellow-500 text-white' : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-800">
          <div className="text-sm text-blue-200">Quick Links</div>
          <div className="mt-3 space-y-2">
            <button className="text-blue-100 hover:text-white w-full text-left">Alumni Directory</button>
            <button className="text-blue-100 hover:text-white w-full text-left">Career Portal</button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {renderContent()}
        {/* allow children below content if provided */}
        {children}
      </div>
    </div>
  );
};

export default NetworkingLayout;
