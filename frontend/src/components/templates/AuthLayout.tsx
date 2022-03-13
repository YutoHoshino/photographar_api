import React from "react"

import { Container, Grid, Typography} from "@material-ui/core"

import styled from 'styled-components';

const AuthContainer = styled(Container)`
  padding-top: 3rem;
`
const Fotter = styled.footer`
  height: 100px;
  color: #8e8e8e;
  background: #f2f2f2;
  width: 100%;
  position: absolute;
  bottom: 0;
`
const LogoText = styled(Typography)`
  text-decoration: none;
  font-weight: bold !important;
  color: #444444;
`

// interface
interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
export const AuthLayout = ({children}: CommonLayoutProps) => {

  return (
    <main>
      <AuthContainer maxWidth="lg">

        <Grid container justifyContent="center">
          <LogoText variant="h3">Photografar</LogoText>
        </Grid> 

        <Grid container justifyContent="center">
          <Grid item>
            {children}
          </Grid>   
        </Grid>
      </AuthContainer>
      <Fotter/>
    </main>
  )
}