import { UserEditImageChangeHok } from "interfaces/hooks/UserEditImageChangeHook";

export const UseEditUserImageChange = (props: UserEditImageChangeHok) => {
  const { setImage, e } = props

  if (!e.target.files) return;
  const img: File = e.target.files[0];
  setImage(img)
}