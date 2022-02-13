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

}

// ユーザー（UseState系）
export interface User {
  id: number
  name: string
  email: string
  image?: {
    url: string
  }
}

// 新規投稿（送信系）
export interface Post {
  post: {
    id: number,
    caption: string,
    user_id: number,
    deleted: Date,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date
  },
  photos: Array<{
      id: number,
      image: any,
      post_id: number,
      created_at: Date,
      updated_at: Date,
  }>,
  user: {
    id: number,
    name: string,
    email: string,
    image: any,
    created_at: Date,
    updated_at: Date,
  }
}