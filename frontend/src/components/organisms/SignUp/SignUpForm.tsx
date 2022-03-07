import { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

// material
import { Box, CardContent, CardHeader } from "@material-ui/core";

// atom
import { AuthTextField } from "components/atoms/TextField/AuthTextField";
import { AuthButton } from "components/atoms/Button/AuthButton";

// organisms
import { AlertMessage } from "components/organisms/Alert/AlertMessage";

// apis
import { signUp } from "apis/auth";

// AuthProvider
import { AuthContext } from "App";
import { Link } from "react-router-dom";


//style
const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
`
const ButtonWrapper = styled.div`
  padding-top: 20px;
  width: 100%;
  bottom: 10px;
`
const LinkWapper = styled(Box)`
  text-align: right;
  padding-top: 20px;
`
const LinkButton = styled(Link)`
  text-decoration: none;
  font-size: 14px;
`

export const SignUpForm = () => {

  const history = useHistory();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  // フォームデータ
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")

  // アラート
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  // 送信イベント
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const params = {
      user: {
        name: name,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation
      }
    }
    signUp(params)
    .then(data => {
      setIsSignedIn(true)
      setCurrentUser(data.user)
      history.push("/")
    })
    .catch(() => {
      setAlertMessageOpen(true)
    })
  }


  return (
      <>
        <Form onSubmit={handleSubmit}>
          <CardContent>
            <CardHeader title="新規アカウント" />

            <AuthTextField
              label="名前"
              setState={setName}
            />

            <AuthTextField
              label="メールアドレス"
              type="email"
              setState={setEmail}
            />

            <AuthTextField
              label="パスワード"
              type="password"
              placeholder="6文字以上"
              setState={setPassword}
            />

            <AuthTextField
              label="パスワード（確認用）"
              type="password"
              placeholder="6文字以上"
              setState={setPasswordConfirmation}
            />

            <ButtonWrapper>
              <AuthButton>登録</AuthButton>
            </ButtonWrapper>

            <LinkWapper>
              <LinkButton to="/signin">
                ログインする
              </LinkButton>
            </LinkWapper>
    
          </CardContent>
        </Form>

        <AlertMessage
          open={alertMessageOpen}
          setOpen={setAlertMessageOpen}
          severity="error"
          message="パスワードが一致しません"
        />

      </>

  )
}