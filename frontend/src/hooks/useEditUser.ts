

interface Props {
  setImage: any
  e: React.ChangeEvent<HTMLInputElement>
}

export const UseEditUserImageChange = (props: Props) => {
  const { setImage, e } = props

  if (!e.target.files) return;
  const img: File = e.target.files[0];
  setImage(img)
}