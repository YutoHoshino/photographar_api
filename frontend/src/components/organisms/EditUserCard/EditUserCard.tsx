import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

// useContext
import { AuthContext } from "App";

// apis
import { userEdit } from "apis/user";

//material
import Avatar from '@mui/material/Avatar';
import { Box, Card, CardContent, CardHeader, Grid, TextField } from "@material-ui/core"

//atoms
import { PrimaryTextField } from "components/atoms/TextField/PrimaryTextField";
import { SubmitButton } from "components/atoms/Button/SubmitButton";

// hooks
import { UseEditUserImageChange } from "hooks/useEditUser";

const RootCard = styled(Card)`
  max-width: 400px;
  margin: 0 auto;
`
const ImageWapper = styled(Grid)`
  padding: "10px"
`
const EditAvater = styled(Avatar)`
  margin: 0 auto;
  cursor: pointer;
  border: solid 1px #dfdfdfdf;
  &:hover {
    opacity: 0.8;
  }
`
const HiddenInput = styled.input`
  display: none;
`
const ButtonWapper = styled(Box)`
  padding-top: 20px;
  width: 100%;
`

export const EditUserCard = () => {

  const history = useHistory();

  const { currentUser, setCurrentUser } = useContext(AuthContext)

  const [image, setImage] = useState<File>();
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")

  // ユーザー編集ロジック
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData()

    if (name) formData.append('user[name]', name)
    if (email) formData.append('user[email]', email)
    if (image) formData.append('user[image]', image)
    if (password && passwordConfirmation) {
      formData.append('user[password]', password)
      formData.append('user[passwordConfirmation]', passwordConfirmation)
    }
    const params = {name: currentUser?.name, data: formData}
    userEdit(params)
    .then((res) => {
      setCurrentUser(res.user)
      history.push("/")
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <RootCard>
        <CardContent>
          <CardHeader title="プロフィール編集" />

          <ImageWapper>

            <label htmlFor="editUser">
              <EditAvater
                alt={currentUser?.name}
                src={
                  image ?
                  URL.createObjectURL(image)
                  :
                  currentUser?.image?.url
                }
                sx={{ width: 100, height: 100 }}
              />
              <HiddenInput
                id="editUser"
                type="file"
                accept="image/*,.png,.jpg,.jpeg,.gif"
                onChange={(e) => UseEditUserImageChange({setImage, e})}
              />
            </label>
          
          </ImageWapper>

          <PrimaryTextField
            label="名前"
            placeholder="新しい名前"
            defaultValue={currentUser?.name}
            setState={setName}
          />

          <PrimaryTextField
            label="メールアドレス"
            placeholder="新しいメールアドレス"
            defaultValue={currentUser?.email}
            setState={setEmail}
          />

          <PrimaryTextField
            label="パスワード"
            type="password"
            placeholder="6文字以上"
            setState={setPassword}
          />

          <PrimaryTextField
            label="パスワード（確認用）"
            type="password"
            placeholder="6文字以上"
            setState={setPasswordConfirmation}
          />

          <ButtonWapper>
            <SubmitButton>
              登録
            </SubmitButton>
          </ButtonWapper>

        </CardContent>
      </RootCard>
  </form>
  )
}