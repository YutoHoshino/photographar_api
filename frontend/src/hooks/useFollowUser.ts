import { useEffect, useState } from "react"

// apis
import { UserAll } from "apis/user";

// interface
import { User } from "interfaces/apis/User";

export const useFollowUser = () => {

  const [FollowUsers, setFollowUsers] = useState<Array<User>>();

  useEffect(() => {
    UserAll()
    .then((data) => {
      setFollowUsers(data.users)
    })
  },[])

  return FollowUsers
}