import { followCreate, followDelete } from "apis/follow"

// interface
import { FollowHook } from "interfaces/hooks/FollowHook"

export const UseFollow = (props :FollowHook) => {
  
  const { OtherUser, e, setIsFollowed, isFollowed } = props

  const data = {UserId: OtherUser.id}

  const element = e.currentTarget

  if (element.id == "follow") {

    followCreate(data)
    .then((data) => {
      element.id = "followed"
      element.textContent = "フォロー中"
    })
    .catch((error) => {
      console.log(error)
    })

  } else {

    followDelete(data)
    .then((data) => {
      element.id = "follow"
      element.textContent = "フォローする"
    })
    .catch((error) => {
      console.log(error)
    })

  }
  setIsFollowed(!isFollowed)
}