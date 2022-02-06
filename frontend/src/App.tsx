import { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// CSSシート
import 'App.css'

// containers
import { SignUp } from 'containers/SignUp'
import { Home } from "containers/Home"

// interface
import { User } from 'interfaces/index'
import { getCurrentUser } from "apis/auth"


// グローバルで扱う変数・関数
export const AuthContext = createContext({} as {
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App = () => {

  // ログイン&ユーザー情報
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  // ユーザー情報取得
  const handleGetCurrentUser = async () => {
    const data = await getCurrentUser()
    console.log(data)
    if (data) {
      setIsSignedIn(true)
      setCurrentUser(data?.user)
    } else {
      console.log("No current user")
    }
  }
  useEffect(() => {
    handleGetCurrentUser()
  }, [])

  
  return (
    <Router>
      <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
        <Switch>
          <Route exact path="/signup" component={ SignUp } />
          <Route exact path="/" component={ Home } />
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;