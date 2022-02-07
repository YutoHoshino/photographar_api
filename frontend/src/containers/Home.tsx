import { useContext } from "react"

// useContext
import { AuthContext } from "App"

export const Home = () => {

  const { currentUser, isSignedIn } = useContext(AuthContext)

  console.log(isSignedIn)

  return(
    <>
      {
        currentUser && isSignedIn ? (
          <>
            <h1>{currentUser.name}</h1>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}