import { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

// material
import { Box, CardContent, CardHeader, makeStyles, Theme, Typography } from "@material-ui/core";

//components
import { PrimaryTextField } from 'components/TextField/PrimaryTextField';
import { SubmitButton } from 'components/Button/SubmitButton';
import { AuthLayout } from "components/Layout/AuthLayout";

// interface
import { SignUpData } from "interfaces/index";

// apis
import { signUp } from "apis/auth";

// AuthProvider
import { AuthContext } from "App";
import { Link } from "react-router-dom";


//style
const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  padding-top: 20px;
  width: 100%;
  bottom: 10px;
`

// material style CSS
const useStyles = makeStyles((theme: Theme) => ({
  box: {
    paddingTop: "1rem"
  },
  link: {
    textDecoration: "none"
  }
}))

export const SignUp = () => {

  const classes = useStyles();

  const history = useHistory();

  // グローバルState
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  // フォームデータ
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")

  // 送信イベント
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const params: SignUpData = {
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
  }


  return (
    <AuthLayout>
      <Form onSubmit={handleSubmit}>
        <CardContent>
          <CardHeader title="新規アカウント" />
          <PrimaryTextField
            label="名前"
            setState={setName}
          />
          <PrimaryTextField
            label="メールアドレス"
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
          <ButtonWrapper>
            <SubmitButton>登録</SubmitButton>
          </ButtonWrapper>

          <Box textAlign="right" className={classes.box}>
            <Typography variant="body2">  
              既にアカウントをお持ちの方は
              <Link to="/signin" className={classes.link}>
                こちらから
              </Link>
            </Typography>
          </Box>
  
        </CardContent>
      </Form>
    </AuthLayout>
  )
}