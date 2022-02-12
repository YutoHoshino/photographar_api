// apis
import { postDelete } from "apis/post";

// interface
interface Props {
  id: number
}

export const PostDelete = async (props: Props) => {
  const params = { id: props.id }
  return await postDelete(params)
  .then((data) => {
    console.log(data)
  })
}