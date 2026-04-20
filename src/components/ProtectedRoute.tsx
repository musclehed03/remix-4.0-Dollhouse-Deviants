import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white font-mono text-xs tracking-widest uppercase">Verifying Access...</div>;
  }

  if (!user || !isAdmin) {
    // If not logged in as Sonja, send them to the Hub
    return <Navigate to="/hub" replace />;
  }

  return <>{children}</>;
};
