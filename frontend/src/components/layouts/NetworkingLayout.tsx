import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, Bell, Link } from 'lucide-react';

interface NetworkingLayoutProps {
  children: React.ReactNode;
}

const NetworkingLayout: React.FC<NetworkingLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-blue-900 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-9 w-9 text-yellow-400" />
            <div>
              <h1 className="text-2xl font-bold font-['Poppins']">Networking</h1>
              <p className="text-blue-200 text-sm">Referrals, recruitment and job updates</p>
            </div>
          </div>
          <div>
            <button onClick={() => navigate('/')} className="text-blue-100 text-sm hover:text-white">Home</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
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
          </section>

          <aside>
            <div className="bg-white rounded-2xl shadow p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Job Notifications</h4>
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

            <div className="mt-6 bg-white rounded-2xl shadow p-6">
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Link className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Alumni Directory</span>
                  </div>
                  <button className="text-sm text-blue-600">Open</button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Career Portal</span>
                  </div>
                  <button className="text-sm text-blue-600">Open</button>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-blue-900 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200">© 2025 Punjab Engineering Institute</p>
        </div>
      </footer>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default NetworkingLayout;
