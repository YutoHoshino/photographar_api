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
const Headerwapper = styled.header`
  margin-bottom: 80px;
`
const ItemWapper = styled(Container)`
  padding: 30px 0;
`

export const CommonLayout = ({children}:any) => {

  const classes = useStyles()

  const { currentUser } = useContext(AuthContext)

  return (
    <>
      { currentUser ? 
        <>
          <Headerwapper>
            <PrimaryHeader />
          </Headerwapper>

          <main>
            <ItemWapper maxWidth="lg">
              <Grid container justifyContent="center">
                <Grid item>
                  {children}
                </Grid>
              </Grid>
            </ItemWapper>
          </main>
        </>
        :
        <></>
      }
    </>
  )
}