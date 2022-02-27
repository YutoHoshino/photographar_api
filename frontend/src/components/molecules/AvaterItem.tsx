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
  key?: number | undefined
  children?: React.ReactElement | undefined
}

export const AvaterItem = (props: Props) => {

  const { 
    userName, 
    ImageSrc, 
    AvaterSize, 
    ItemGap,
    key,
    children,
  } = props

  return (
    <ListItem key={key}>
      <ListItemAvatar>
          <UserAveter
            userName={userName}
            ImageSrc={ImageSrc}
            AvaterSize={AvaterSize}
          />
      </ListItemAvatar>
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