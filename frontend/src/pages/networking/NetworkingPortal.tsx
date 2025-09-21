import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Referrals from './Referrals';
import Recruitment from './Recruitment';
import Notifications from './Notifications';
import NetworkingLayout from '../../components/layouts/NetworkingLayout';

const NetworkingPortal: React.FC = () => {
  return (
    <NetworkingLayout>
      <Routes>
        <Route path="/" element={<Referrals />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </NetworkingLayout>
  );
};

export default NetworkingPortal;