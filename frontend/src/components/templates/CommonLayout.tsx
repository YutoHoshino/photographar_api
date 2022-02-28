import React, { useContext } from "react"
import styled from "styled-components";

import {
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';

// component
import { PrimaryHeader } from "components/organisms/Header/PrimaryHeader"

// useContext
import { AuthContext } from "App";

// material css
const useStyles = makeStyles(() => ({
  container: {
    paddingTop: "3rem"
  }
}))

// style css
const Sheader = styled.header`
  margin-bottom: 80px;
`

export const CommonLayout = ({children}:any) => {

  const classes = useStyles()

  const { currentUser } = useContext(AuthContext)

  return (
    <>
      { currentUser ? 
        <>
          <Sheader>
            <PrimaryHeader />
          </Sheader>
          <main>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container justifyContent="center">
                <Grid item>
                  {children}
                </Grid>
              </Grid>
            </Container>
          </main>
        </>
        :
        <></>
      }
    </>
  )
}