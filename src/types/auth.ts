export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Stored credentials in TypeScript file as requested
export const VALID_CREDENTIALS: LoginCredentials[] = [
  {
    email: 'admin@company.com',
    password: 'admin123'
  },
  {
    email: 'client@example.com', 
    password: 'client456'
  }
];