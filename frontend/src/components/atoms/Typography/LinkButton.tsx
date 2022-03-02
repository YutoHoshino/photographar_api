import { memo, ReactNode } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import { Typography } from "@mui/material";


const Link = styled(Typography)`
  cursor: pointer;
`

interface Props {
  Link: string
  children: ReactNode
}

export const LinkButton = memo((props: Props) => {
  
  const history = useHistory();

  return (
    <Link
      onClick={() => {history.push(`${props.Link}`)}}
    >
      {props.children}
    </Link>
  )
})