export interface User {
  id: string;
  email: string;
  username?: string;
  role: 'admin' | 'trainer' | 'staff';
  fullName?: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  error?: string;
}
