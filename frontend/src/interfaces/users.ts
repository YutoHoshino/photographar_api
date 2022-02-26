// ユーザー一覧
export interface UsersProps {
  users: Array<{
    id: number
    name: string
    email: string
    image?: {
      url: string
    }
  }> 
}