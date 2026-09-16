import { User, TestDriveScanData } from '../types';

const STORAGE_KEY_USER = 'leadpilot_auth_user';
const STORAGE_KEY_TEST_DRIVE = 'leadpilot_test_drive_data';

export const getStoredTestDriveData = (): TestDriveScanData | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEST_DRIVE);
    if (!raw) return null;
    return JSON.parse(raw) as TestDriveScanData;
  } catch {
    return null;
  }
};

export const saveTestDriveData = (data: TestDriveScanData): void => {
  try {
    localStorage.setItem(STORAGE_KEY_TEST_DRIVE, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save test drive scan data:', err);
  }
};

export const getStoredUser = (): User | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

export const saveUser = (user: User | null): void => {
  try {
    if (!user) {
      localStorage.removeItem(STORAGE_KEY_USER);
    } else {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    }
  } catch (err) {
    console.error('Failed to save auth user:', err);
  }
};

export const createMockUser = (email: string, name?: string): User => {
  const testDrive = getStoredTestDriveData();
  const baseName = name || email.split('@')[0].replace(/[._-]/g, ' ');
  const formattedName = baseName.charAt(0).toUpperCase() + baseName.slice(1);

  return {
    id: `user-${Date.now()}`,
    email,
    name: formattedName,
    businessName: testDrive?.businessName || (testDrive?.industry ? `${formattedName}'s ${testDrive.industry}` : 'Premier Local Services'),
    industry: testDrive?.industry || 'Dental Clinics',
    location: testDrive?.city || 'Austin, TX',
    searchRadius: '25 miles',
    targetCustomer: 'Local homeowners & professionals seeking verified service',
    targetLeadCount: '100',
    hasCompletedOnboarding: false,
    createdAt: new Date().toISOString(),
    avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
  };
};

export const createDemoUser = (): User => {
  return {
    id: 'user-demo-sarah',
    email: 'sarah.jenkins@metrosmile.com',
    name: 'Dr. Sarah Jenkins',
    businessName: 'Metro Smile Dental Arts',
    industry: 'Dental Clinics',
    location: 'Austin, TX',
    searchRadius: '25 miles',
    targetCustomer: 'Patients needing cosmetic dentistry, clear aligners & restorative care',
    targetLeadCount: '100',
    hasCompletedOnboarding: true,
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
  };
};
