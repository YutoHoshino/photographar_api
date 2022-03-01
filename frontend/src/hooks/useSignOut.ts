// apis
import { signOut } from "apis/auth"

export const UseSignOut = async () => {
  return await signOut()
  .then((data) => {
  })
}