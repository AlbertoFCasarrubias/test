export interface User {
  email: string;
  id: number;
  role: string;
  datos: {
    active: boolean;
    address: string;
    balance: number;
    birthday: string;
    country: string;
    created_at: string;
    id: number;
    name: string;
    phone: string;
    size: string;
    updated_at: string;
    user_id: number;
  }
}
