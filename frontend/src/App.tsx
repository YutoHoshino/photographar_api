import { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from "react-router-dom"

// CSSシート
import 'App.css'

// containers
import { SignUp } from 'containers/SignUp'
import { SignIn } from "containers/SignIn"
import { Posts } from "containers/Posts"
import { Post } from "containers/Post"
import { UserProfile } from "containers/UserProfile"
import { UserEdit } from "containers/UserEdit"

// interface
import { GetCurrentUserData } from 'interfaces/index'

// apis
import { getCurrentUser } from "apis/auth"

// グローバルで扱う変数・関数
export const AuthContext = createContext({} as {
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: GetCurrentUserData | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<GetCurrentUserData | undefined>>
})
export const PostContext = createContext({} as {
  isPosted: boolean
  setIsPosted: React.Dispatch<React.SetStateAction<boolean>>
})

const App = () => {

  // ログイン&ユーザー情報
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<GetCurrentUserData | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  // 投稿されたかどうかのuseStatue
  const [isPosted, setIsPosted] = useState<boolean>(false);

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

            <PostContext.Provider value={{ isPosted, setIsPosted }}>
              <Switch>

                <Route 
                  exact path="/" 
                  component={ Posts } 
                />

                <Route           
                  exact
                  path="/post/:postId"
                  render={({ match }) => <Post match={match}/> } 
                />

                <Route           
                  exact
                  path="/user/:userName"
                  render={({ match }) => <UserProfile match={match}/> } 
                />

                <Route           
                  exact
                  path={`/user/${currentUser?.name}/edit`}
                  component={ UserEdit } 
                />

              </Switch>
            </PostContext.Provider>

          </Switch>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;