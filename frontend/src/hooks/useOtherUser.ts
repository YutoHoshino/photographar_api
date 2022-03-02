import { useEffect, useState } from "react"

// apis
import { UserAll } from "apis/user";

// interface
import { User } from "interfaces/get/User";

export const useOtherUser = () => {

  const [OtherUsers, setOtherUsers] = useState<Array<User>>();

  useEffect(() => {
    UserAll()
    .then((data) => {
      setOtherUsers(data.users)
    })
  },[])

  return OtherUsers
}