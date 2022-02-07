import { useContext } from "react"

// useContext
import { AuthContext } from "App"

// components
import { HomeHeader } from "components/Header/HomeHeader"

export const Home = () => {

  const { currentUser } = useContext(AuthContext)

  console.log(currentUser)

  return(
    <>
      {
        currentUser ? (
          <>
            <HomeHeader/>
            <h1>{currentUser.name}</h1>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}