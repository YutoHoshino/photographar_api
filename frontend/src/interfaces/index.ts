// サインアップ（axios送信系）
export interface SendSignUpData {
  user : {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}

// サインイン（axios送信系）
export interface SendSignInData {
  user : {
  email: string
  password: string
  }
}

// カレントユーザー情報（UseState系）
export interface GetCurrentUserData {
  id: number
  name: string
  email: string
  image?: {
    url: string
  }
}


// 投稿データ（UseState系）
export interface GetPostdata {
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
      image?: {
        url: string
      },
      post_id: number,
      created_at: Date,
      updated_at: Date,
  }>,
  user: {
    id: number,
    name: string,
    email: string,
    image?: {
      url: string
    },
    created_at: Date,
    updated_at: Date,
  }
}

// 投稿Swipper（Swipperデータ）
export interface PhotosSwipper {
  height: string,
  photos: Array<{
    id: number,
    image?: {
      url: string
    },
    post_id: number,
    created_at: Date,
    updated_at: Date,
  }>,
}