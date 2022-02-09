type State =  {
  fetchState: String, 
  postList: Array<{
    id: number,
    caption: string,
    user_id: number,
    deleted: Date,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date
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