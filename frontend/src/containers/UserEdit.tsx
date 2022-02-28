import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

//material ui
import { 
  Box, 
  Card, 
  CardContent, 
  CardHeader, 
  Grid, 
  makeStyles, 
  TextField, 
  Theme 
} from "@material-ui/core";
import Avatar from '@mui/material/Avatar';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// useContext
import { AuthContext } from "App"

// components
import { CommonLayout } from "components/templates/CommonLayout";
import { PrimaryTextField } from "components/atoms/TextField/PrimaryTextField";
import { SubmitButton } from "components/atoms/Button/SubmitButton";

// apis
import { userEdit } from "apis/user";


// material css
const useStyles = makeStyles((theme: Theme) => ({
  Card: {
    maxWidth: "400px",
    margin: "0 auto"
  },
  ButtonWapper: {
    paddingTop: "20px",
    width: "100%",
  },
  ImageWapper: {
    padding: "10px"
  },
  Avater: {
    margin: "0 auto",
    cursor: "pointer",
    border: "solid 1px #dfdfdfdf",
    '&:hover': {
      opacity: 0.8,
   },
  }
}))

export const UserEdit = () => {

  const history = useHistory();

  const classes = useStyles();
  
  const { currentUser, setCurrentUser } = useContext(AuthContext)

  // フォームデータ
  const [image, setImage] = useState<File>();
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")

  // inpitマウントID
  const inputId = Math.random().toString(32).substring(2);

  // 写真追加
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img: File = e.target.files[0];
    setImage(img)
  }

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
    <>
      {
        currentUser ?

        <CommonLayout>
          <form onSubmit={handleSubmit}>
            <Card className={classes.Card}>
              <CardContent>
                <CardHeader title="プロフィール編集" />

                <Grid className={classes.ImageWapper}>

                  <label htmlFor={inputId}>
                    <Avatar
                      className={classes.Avater}
                      alt={currentUser?.name}
                      src={
                        image ?
                        URL.createObjectURL(image)
                        :
                        currentUser?.image?.url
                      }
                      sx={{ width: 100, height: 100 }}
                    />
                    <input
                      id={inputId}
                      type="file"
                      accept="image/*,.png,.jpg,.jpeg,.gif"
                      style={{ display: "none" }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageChange(e)}
                    />
                  </label>
                 
                </Grid>

                <PrimaryTextField
                label="名前"
                value={currentUser?.name}
                setState={setName}
                />
                <PrimaryTextField
                  label="メールアドレス"
                  value={currentUser?.email}
                  setState={setEmail}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  label="パスワード"
                  type="password"
                  placeholder="6文字以上"
                  onChange={e => setPassword(e.target.value)}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  label="パスワード（確認用）"
                  type="password"
                  placeholder="6文字以上"
                  onChange={e => setPasswordConfirmation(e.target.value)}
                />
                <Box className={classes.ButtonWapper}>
                  <SubmitButton>
                    登録
                  </SubmitButton>
                </Box>

              </CardContent>
            </Card>
          </form>
        </CommonLayout>
        :
        <></>
      }
    </>
  )
}