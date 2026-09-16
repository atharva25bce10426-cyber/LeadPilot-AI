import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import { ProtectedRoute, PublicAuthRoute } from './components/ProtectedRoute';
import { AppLayout } from './components/AppLayout';

import { LandingPage } from './pages/LandingPage';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Onboarding } from './pages/Onboarding';
import { AgentSetup } from './pages/AgentSetup';
import { Dashboard } from './pages/Dashboard';
import { LeadsList } from './pages/LeadsList';
import { LeadDetail } from './pages/LeadDetail';
import { AiAgentView } from './pages/AiAgentView';
import { Campaigns } from './pages/Campaigns';
import { Appointments } from './pages/Appointments';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Marketing Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication Routes */}
          <Route
            path="/signup"
            element={
              <PublicAuthRoute>
                <Signup />
              </PublicAuthRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicAuthRoute>
                <Login />
              </PublicAuthRoute>
            }
          />

          {/* Onboarding & Agent Setup Sequence */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute requireOnboardingComplete={false}>
                <Onboarding />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent/setup"
            element={
              <ProtectedRoute requireOnboardingComplete={false}>
                <AgentSetup />
              </ProtectedRoute>
            }
          />

          {/* Authenticated Application Hub & Management Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <LeadsList />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/:id"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <LeadDetail />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AiAgentView />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaigns"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Campaigns />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Appointments />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Settings />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
