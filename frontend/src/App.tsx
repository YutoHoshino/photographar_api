import { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from "react-router-dom"

// CSSシート
import 'App.css'

// containers
import { SignUp } from 'containers/SignUp'
import { SignIn } from "containers/SignIn"
import { Posts } from "containers/Posts"

// interface
import { GetCurrentUserData } from 'interfaces/index'

// apis
import { getCurrentUser } from "apis/auth"
import { Post } from "containers/Post"

// グローバルで扱う変数・関数
export const AuthContext = createContext({} as {
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: GetCurrentUserData | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<GetCurrentUserData | undefined>>
})

const App = () => {

  // ログイン&ユーザー情報
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<GetCurrentUserData | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  // ユーザー情報取得
  const handleGetCurrentUser = async () => {
    const data = await getCurrentUser()
    if (data) {
      setIsSignedIn(true)
      setCurrentUser(data.user)
    } else {
      console.log("No current user")
    }
    setLoading(false)
  }
  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])


  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        return <Redirect to="/signin" />
      }
    } else {
      return <></>
    }
  }
  
  return (
    <Router>
      <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
          <Switch>

            <Route 
              exact 
              path="/signup" 
              component={ SignUp } 
            />

            <Route 
              exact 
              path="/signin" 
              component={ SignIn } 
            />

            <Route 
              exact path="/" 
              component={ Posts } 
            />

            <Route           
              exact
              path="/post/:postId"
              render={({ match }) => <Post match={match}/> } 
            />

          </Switch>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;