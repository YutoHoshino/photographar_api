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


// 投稿Swipper（Swipperデータ）
export interface PhotosSwipper {
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


// いいね（containersに渡すprops）
export interface LikeProps {
  postId: number,
  likesCount :number, 
  e: any,
}

// いいね（送信系）
export interface LikeIdProps {
  post_id: number
}

