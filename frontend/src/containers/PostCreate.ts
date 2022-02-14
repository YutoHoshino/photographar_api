// apis
import { postCreate } from "apis/post";

// interface
interface Props {
  caption: string,
  images: File[]
}

export const PostCreate = async (props: Props) => {

  const {caption, images} = props

  const formData = new FormData()
  formData.append('post[caption]', caption)
  images.map((image, i) => {formData.append(`post[photos_attributes[${i}[image]]]`, image)});

  return await postCreate(formData)
  .then((data) => {
    console.log(data)
  })
}