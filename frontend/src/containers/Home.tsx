import { useContext } from "react"

import { AuthContext } from "App"

export const Home = () => {

  const { currentUser } = useContext(AuthContext)

  return(
    <>
      <h1>ホーム画面です</h1>
      {console.log(currentUser)}
    </>
  )
}