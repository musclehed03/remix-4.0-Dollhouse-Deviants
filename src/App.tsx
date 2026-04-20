/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import Hub from './pages/Hub';
import SplashScreen from './pages/SplashScreen';
import SplashGate from './pages/SplashGate';
import VaultGate from './pages/VaultGate';
import AdminDashboard from './pages/AdminDashboard';
import Vault from './pages/Vault';
import Studio from './pages/Studio';
import { ProtectedRoute } from './components/ProtectedRoute';
import Boutique from './pages/Boutique';
import Creations from './pages/Creations';
import Circuit from './pages/Circuit';
import Echoes from './pages/Echoes';
import About from './pages/About';
import OurStory from './pages/OurStory';
import Support from './pages/Support';
import Compliance from './pages/Compliance';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Safety from './pages/Safety';
import UserProfile from './pages/UserProfile';
import TrevorBanner from './components/TrevorBanner';
import AccessibilityMenu from './components/AccessibilityMenu';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import SensoryAdvisory from './components/SensoryAdvisory';

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Artificial delay to let the cinematic finish (2.5 seconds)
    const timer = setTimeout(() => setAppReady(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!appReady) return <LoadingScreen />;

  return (
    <AccessibilityProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <TrevorBanner />
          <AccessibilityMenu />
          <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/gate" element={<SplashGate />} />
          <Route path="/vault-gate" element={<VaultGate />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/studio" element={
            <ProtectedRoute>
              <Studio />
            </ProtectedRoute>
          } />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/creations" element={<Creations />} />
          <Route path="/circuit" element={<Circuit />} />
          <Route path="/echoes" element={<Echoes />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/support" element={<Support />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </AccessibilityProvider>
  );
}
