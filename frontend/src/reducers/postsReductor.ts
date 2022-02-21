type State =  {
  fetchState: String, 
  postList: Array<{ 
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
  }>
}


type Action = 
| {type: "FETCHING"} 
| {type: "FETCH_SUCCESS", payload: any}

export const postsReductor= (state :State, action :Action) => {
  switch (action.type) {
    case "FETCHING":
      return { 
        fetchState: state.fetchState = "LOADING",
        postList: []
      };
    case "FETCH_SUCCESS":
      return { 
        fetchState: state.fetchState = "OK",
        postList: action.payload,
      }
    default:
      throw new Error();
  }
}