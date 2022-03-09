// template
import { CommonLayout } from "components/templates/CommonLayout"

// organisms
import { RoomList } from "components/organisms/Room/RoomList"

export const RoomPage = () => {
  return (
    <CommonLayout>
      <RoomList/>
    </CommonLayout>
  )
}