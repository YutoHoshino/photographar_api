import { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

// material
import { CardContent, CardHeader } from "@material-ui/core"

//components
import { PrimaryTextField } from 'components/TextField/PrimaryTextField';
import { SubmitButton } from 'components/Button/SubmitButton';

// interface
import { SignUpData } from "interfaces/index";

// apis
import { siginUp } from "apis/auth";

// AuthProvider
import { AuthContext } from "App";

//style
const Main = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Form = styled.form`
  height: 100%;
  background: #fff;
  max-width: 400px;
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  padding-top: 30px;
  width: 100%;
  bottom: 10px;
`

export const SignUp = () => {

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
    siginUp(params)
    .then(data => {
      setIsSignedIn(true)
      setCurrentUser(data.user)
      history.push("/")
    })
  }


  return (
    <Main>
      <Form onSubmit={handleSubmit}>
        <CardContent>
          <CardHeader title="ログイン" />
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
  
        </CardContent>
      </Form>
    </Main>
  )
}