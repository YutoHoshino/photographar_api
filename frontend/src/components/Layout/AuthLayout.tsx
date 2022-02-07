import React from "react"

import { Container, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import styled from 'styled-components';


// style css
const MainLogoImage = styled.img`
  height: 90px;
`

//material css
const useStyles = makeStyles(() => ({
  container: {
    paddingTop: "3rem"
  },
  footer: {
    height: "100px",
    color: "#8e8e8e",
    backgroundColor: "#f2f2f2",
    width: "100%",
    position: "absolute",
    bottom: 0,
  }
}))

// interface
interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
export const AuthLayout = ({children}: CommonLayoutProps) => {
  const classes = useStyles()

  return (
    <>
      <main>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container justifyContent="center">
            <MainLogoImage src="https://s3-ap-northeast-1.amazonaws.com/cdn.appli-world.jp/production/imgs/images/000/025/706/original.jpg?1539399373" alt="photografar" />
          </Grid> 
          <Grid container justifyContent="center">
            <Grid item>
              {children}
            </Grid>   
          </Grid>
        </Container>
        <div className={classes.footer}>

        </div>
      </main>
    </>
  )
}