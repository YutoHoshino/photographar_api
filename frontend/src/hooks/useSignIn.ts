import { useContext } from "react"
import { useHistory } from "react-router-dom"

// useContext
import { AuthContext } from "App"

// apis
import { signIn } from "apis/auth"

interface Props {
  email: string
  password: string
}

export const UseSignIn = (props: Props) => {

  const {email, password} = props

  const history = useHistory();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const params = { 
    user: { 
      email: email, 
      password: password 
    } 
  }

  signIn(params)
  .then(data => {
    setIsSignedIn(true)
    setCurrentUser(data.user)
    history.push("/")
  })
  
  return 
}