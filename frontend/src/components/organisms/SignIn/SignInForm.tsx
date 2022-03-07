import { memo, useContext, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

// material
import { Box, CardContent, CardHeader } from "@material-ui/core";

// useContext
import { AuthContext } from "App";

// atom
import { AuthTextField } from "components/atoms/TextField/AuthTextField";
import { AuthButton } from "components/atoms/Button/AuthButton";

// organisms
import { AlertMessage } from "components/organisms/Alert/AlertMessage";

// apis
import { signIn } from "apis/auth";


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

export const SignInForm = memo(() => {

  const history = useHistory();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  // フォームデータ
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  // アラート
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  // 送信イベント
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const params = { 
      user: { 
        email: email, 
        password: password 
      } 
    }
    signIn(params)
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

          <CardHeader title="ログイン" />

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

          <ButtonWrapper>
            <AuthButton>ログイン</AuthButton>     
          </ButtonWrapper>

          <LinkWapper>
            <LinkButton to="/signup">
              新規アカウントを作成
            </LinkButton>
          </LinkWapper>

        </CardContent>
      </Form>

      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="メールアドレスかパスワードが間違っています"
      />

    </>


  )
})