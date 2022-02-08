// サインアップ（送信系）
export interface SignUpData {
  user : {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}

// サインイン（送信系）
export interface SignInData {
  user : {
  email: string
  password: string
  }
}

// 新規投稿（送信系）
export interface PostData {
  append: {
    caption: string,
    images: File[]
  }
}

// ユーザー（UseState系）
export interface User {
  id: number
  name: string
  email: string
  image?: string
}