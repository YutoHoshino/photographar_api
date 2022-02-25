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
  },
  likes: Array<{
    id:number,
    user_id: number,
  }>,
  comments: Array<{
    id:number,
    text: string,
    user: {
      id: number,
      name: string,
      image?: {
        url: string
      },
    }
  }>,
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

// カレントユーザー情報（UseState系）
export interface GetUserShowData {
  user: {
    id: number
    name: string
    email: string
    image?: {
      url: string
    }
  },
  posts: Array<{
    post: {
      id: number
      caption: string
      user_id: number
      deleted: string
      deleted_at: Date,
      created_at: Date,
      updated_at: Date,
    },
    photos: Array<{
      id: number
      image: {
        url: string
      }
    }>
  }>,
  like_posts: Array<{
    post: {
      id: number,
    },
    photos: Array<{
      id: number
      image: {
        url: string
      }
    }>
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

