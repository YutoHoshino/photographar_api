// apis
import { signOut } from "apis/auth"

export const SignOut = async () => {
  return await signOut()
  .then((data) => {
  })
}