import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AffiliatePage from './pages/AffiliatePage.tsx';
import CommunityPage from './pages/CommunityPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { SignupPage } from './pages/SignupPage.tsx';
import { DashboardPage } from './pages/DashboardPage.tsx';
import { SuccessPage } from './pages/SuccessPage.tsx';
import { PageCacheProvider } from './contexts/PageCacheContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PageCacheProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/affiliate" element={<AffiliatePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </PageCacheProvider>
    </BrowserRouter>
  </StrictMode>
);
