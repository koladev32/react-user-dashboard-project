export type User = {
  id?: number; // Optional because it's not required to create a user
  name: string;
  email: string;
  username: string;
  city: string;
  phone?: string;
  website?: string;
};
