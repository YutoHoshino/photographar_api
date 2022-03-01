import { useHistory } from "react-router-dom";
import styled from "styled-components";

//material
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";

// interface
import { UserData } from "interfaces/data/UserData";
import { User } from "interfaces/get/User";
import { useState } from "react";

const ActionBox = styled(Box)`
  border-top: 1px solid rgba(var(--b38,219,219,219),1);
  padding-top: 10px;
`
const ActionButton = styled(Button)`
font-weight: bold;
color: #9e9e9e;
`

interface Props {
  action: "ALL" | "LIKE"
  setAction: any
}

export const UserProfileSwichAction = (props: Props) => {

  const { action, setAction } = props

  const handleAllPosts = (e: any) => {
    if (action == "ALL") return
    const TargetButton = e.currentTarget
    TargetButton.id = "switch_active"
    TargetButton.nextElementSibling.id = ""
    setAction("ALL")
  }

  const handleLikePosts = (e: any) => {
    if (action == "LIKE") return
    const TargetButton = e.currentTarget
    TargetButton.id = "switch_active"
    TargetButton.previousElementSibling.id = ""
    setAction("LIKE")
  }
  
  return (
    <ActionBox>
      <Grid container justifyContent="center">

        <ActionButton
          id="switch_active"
          onClick={(e) => {handleAllPosts(e)}}
        >
          投稿
        </ActionButton>

        <ActionButton
          onClick={(e) => {handleLikePosts(e)}}
        >
          お気に入り
        </ActionButton>

      </Grid>
    </ActionBox>

    
  )
}