// Multi-client authentication system
import CryptoJS from 'crypto-js';

export interface Client {
  id: string;
  username: string;
  password: string;
  name: string;
  company: string;
  email: string;
  avatar?: string;
  tier: boolean; // true for progress dashboard, false for proposal dashboard
}

// Hash function
const hashPassword = (password: string): string => {
  return CryptoJS.SHA256(password).toString();
};

// Client database with different project details
export const clients: Client[] = [
  {
    id: 'client-a',
    username: 'Amit_kumar',
    password: hashPassword('stamix_luxe_llp2025'), 
    name: 'Amit Kumar',
    company: 'Stamix Luxe LLP',
    email: 'akmarwaha99@yahoo.in',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    tier: true // Progress dashboard
  },
  {
    id: 'client-b',
    username: 'client_b',
    password: hashPassword('ClientPass123!'),
    name: 'Michael Chen',
    company: 'InnovateNow Inc',
    email: 'michael.chen@innovatenow.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    tier: false // Proposal dashboard
  },
  {
    id: 'client-c',
    username: 'client_c',
    password: hashPassword('SecureClient456!'),
    name: 'Emma Rodriguez',
    company: 'FutureTech Labs',
    email: 'emma.rodriguez@futuretech.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    tier: false // Proposal dashboard
  }
];

// Session management
const SESSION_KEY = 'aida_corp_client_session';

export const authenticate = (username: string, password: string): Client | null => {
  const hashedPassword = hashPassword(password);
  const client = clients.find(c => c.username === username && c.password === hashedPassword);
  if (client) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(client));
    return client;
  }
  return null;
};

export const getCurrentClient = (): Client | null => {
  const sessionData = sessionStorage.getItem(SESSION_KEY);
  return sessionData ? JSON.parse(sessionData) : null;
};

export const logout = (): void => {
  sessionStorage.removeItem(SESSION_KEY);
};

export const isAuthenticated = (): boolean => {
  return getCurrentClient() !== null;
};
