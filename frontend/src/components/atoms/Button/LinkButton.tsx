import { memo, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import { Button } from "@material-ui/core"

const SButton = styled(Button)`
  margin: 2px 5px;
  font-size: 10px;
  border: 1px solid #dbdbdb;
  font-weight: bold;
`

interface Props {
  children: ReactNode
  Url?: string | undefined
}

export const LinkButton = memo((props: Props) => {

  const {children, Url} = props

  const history = useHistory();


  return(
    <SButton
      size="small"
      onClick={() => history.push(`${Url}`)}
    >
      {children}
    </SButton>
  )
})