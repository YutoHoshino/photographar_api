import { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from "react-router-dom"

// CSSシート
import 'App.css'

// pages
import { HomePage } from "components/pages/HomePage"
import { SignInPage } from "components/pages/SignInPage"
import { SignUpPage } from "components/pages/SignUpPage"
import { DetailPostPage } from "components/pages/DetailPostPage"


import { UserProfile } from "containers/UserProfile"
import { UserEdit } from "containers/UserEdit"

// interface
import { GetCurrentUserData } from 'interfaces/index'
import { User } from "interfaces/get/User";

// apis
import { getCurrentUser } from "apis/auth"

// グローバルで扱う変数・関数
export const AuthContext = createContext({} as {
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

export const PostContext = createContext({} as {
  isPosted: boolean
  setIsPosted: React.Dispatch<React.SetStateAction<boolean>>
})

const App = () => {

  // ログイン&ユーザー情報
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()
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
              component={ SignUpPage } 
            />

            <Route 
              exact 
              path="/signin" 
              component={ SignInPage } 
            />

            <PostContext.Provider value={{ isPosted, setIsPosted }}>
              <Switch>

                <Route 
                  exact path="/" 
                  component={ HomePage } 
                />

                <Route           
                  exact
                  path="/post/:postId"
                  render={({ match }) => <DetailPostPage match={match}/> } 
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