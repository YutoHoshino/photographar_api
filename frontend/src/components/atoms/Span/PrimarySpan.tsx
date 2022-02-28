import React from 'react';
import Typography from '@material-ui/core/Typography';

interface Props {
  children: string
}

export const PrimarySpan = (props: Props) => {
  return (
    <Typography
      component="span"
      variant="body2"
      color="textPrimary"
    >
      {props.children}
    </Typography>
  )
}