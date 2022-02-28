import { useContext, useEffect, useState } from "react";

// useContext
import { PostContext } from "App";

// apis
import { postGetData } from "apis/post";

// interface
import { PostData } from "interfaces/Posts";

export const useAllPosts = () => {

  const { isPosted, setIsPosted } = useContext(PostContext)

  const [Posts, setPosts] = useState<Array<PostData>>();

  useEffect(() => {
    postGetData()
    .then((data) => {
      setPosts(data.posts)
    })
    setIsPosted(false)
  }, [isPosted])

  return Posts
}