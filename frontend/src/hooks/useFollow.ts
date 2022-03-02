import { useContext } from "react"

import { followCreate, followDelete } from "apis/follow"

import { FollowContext } from "App"

// interface
import { FollowHook } from "interfaces/hooks/FollowHook"

export const UseFollow = (props :FollowHook) => {

  const { setisFollowed } = useContext(FollowContext)
  
  const { OtherUser, e } = props
  const data = {UserId: OtherUser.id}

  const element = e.currentTarget

  if (element.id == "follow") {

    followCreate(data)
    .then((data) => {
      element.id = "followed"
      element.textContent = "フォロー中"
      setisFollowed(true)
    })
    .catch((error) => {
      console.log(error)
    })

  } else {

    followDelete(data)
    .then((data) => {
      element.id = "follow"
      element.textContent = "フォローする"
      setisFollowed(true)
    })
    .catch((error) => {
      console.log(error)
    })

  }
}