import React from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

// component
import { PrimaryHeader } from "components/Header/PrimaryHeader"


const useStyles = makeStyles(() => ({
  container: {
    paddingTop: "3rem"
  }
}))

interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
export const CommonLayout = ({children}: CommonLayoutProps) => {
  const classes = useStyles()

  return (
    <>
      <header>
        <PrimaryHeader />
      </header>
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
  )
}