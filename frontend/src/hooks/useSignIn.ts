import { useContext } from "react"
import { useHistory } from "react-router-dom"

// useContext
import { AuthContext } from "App"

// apis
import { signIn } from "apis/auth"
import { client } from "apis/client"

interface Props {
  email: string
  password: string
}

export const UseSignIn = async (props: Props) => {

  const {email, password} = props

  const history = useHistory();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const params = { 
    user: { 
      email: email, 
      password: password 
    } 
  }

  await client.post("signin", params)
  .then(res => {
    setIsSignedIn(true)
    setCurrentUser(res.data.user)
    history.push("/")
    return 
  })
  .catch ((e) => console.error(e))
}