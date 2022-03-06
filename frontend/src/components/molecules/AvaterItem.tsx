import React from "react"

import { 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Typography 
} from "@material-ui/core"

import { UserAveter } from "components/atoms/Avater/UserAvater"

interface Props {
  userName: string
  ImageSrc: string | undefined
  AvaterSize: number
  ItemGap?: number | undefined
  children?: any | undefined
}

export const AvaterItem = (props: Props) => {

  const { 
    userName, 
    ImageSrc, 
    AvaterSize, 
    ItemGap,
    children,
  } = props

  return (
    <ListItem>
        <UserAveter
          userName={userName}
          ImageSrc={ImageSrc}
          AvaterSize={AvaterSize}
          Url={`user/${userName}`}
        />
      <ListItemText
        style={{paddingLeft: `${ItemGap? ItemGap : 0 }px`}}
      >
        <Typography
            variant="body2"
            color="textPrimary"
            >
            {userName}
        </Typography>
      </ListItemText>
      {children}
    </ListItem>
  )
}