export interface User {
  id: number,
  name: string,
  email: string,
  image: { url?: string },
  created_at: Date,
  updated_at: Date,
}