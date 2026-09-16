import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, TestDriveScanData } from '../types';
import {
  getStoredUser,
  saveUser,
  getStoredTestDriveData,
  saveTestDriveData,
  createMockUser,
  createDemoUser,
} from './auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  testDriveData: TestDriveScanData | null;
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  googleLogin: () => Promise<{ success: boolean; error?: string }>;
  demoLogin: () => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  recordTestDriveScan: (data: TestDriveScanData) => void;
  completeOnboarding: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [testDriveData, setTestDriveData] = useState<TestDriveScanData | null>(() => getStoredTestDriveData());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Keep localStorage in sync if user changes
    saveUser(user);
  }, [user]);

  const recordTestDriveScan = (data: TestDriveScanData) => {
    setTestDriveData(data);
    saveTestDriveData(data);
  };

  const signup = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Simulate brief network latency for realistic UX
    await new Promise((res) => setTimeout(res, 500));

    if (!email || !email.includes('@')) {
      setIsLoading(false);
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (!password || password.length < 8) {
      setIsLoading(false);
      return { success: false, error: 'Password must be at least 8 characters.' };
    }

    const newUser = createMockUser(email);
    setUser(newUser);
    saveUser(newUser);
    setIsLoading(false);
    return { success: true };
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 450));

    if (!email || !email.includes('@')) {
      setIsLoading(false);
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (!password || password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    // Check if we have an existing stored user with this email
    const existing = getStoredUser();
    if (existing && existing.email.toLowerCase() === email.toLowerCase()) {
      setUser(existing);
      setIsLoading(false);
      return { success: true };
    }

    // Otherwise create or log into account
    const loggedUser: User = {
      ...createMockUser(email),
      hasCompletedOnboarding: true, // existing user login default
    };
    setUser(loggedUser);
    saveUser(loggedUser);
    setIsLoading(false);
    return { success: true };
  };

  const googleLogin = async (): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 600));

    const googleEmail = 'alex.founder@gmail.com';
    const googleUser: User = {
      ...createMockUser(googleEmail, 'Alex Founder'),
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    };

    setUser(googleUser);
    saveUser(googleUser);
    setIsLoading(false);
    return { success: true };
  };

  const demoLogin = async (): Promise<void> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));
    const demo = createDemoUser();
    setUser(demo);
    saveUser(demo);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    saveUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      saveUser(updated);
      return updated;
    });
  };

  const completeOnboarding = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated: User = {
        ...prev,
        ...data,
        hasCompletedOnboarding: true,
      };
      saveUser(updated);
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        testDriveData,
        signup,
        login,
        googleLogin,
        demoLogin,
        logout,
        updateUser,
        recordTestDriveScan,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
