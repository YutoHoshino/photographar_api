import { useContext } from "react"

// useContext
import { AuthContext } from "App"

// components
import { CommonLayout } from "components/Layout/CommonLayout"

export const Home = () => {

  const { currentUser, isSignedIn } = useContext(AuthContext)

  console.log(isSignedIn)

  return(
    <CommonLayout>
      {
        currentUser && isSignedIn ? (
          <>
            <h1>{currentUser.name}</h1>
          </>
        ) : (
          <></>
        )
      }
    </CommonLayout>
  )
}