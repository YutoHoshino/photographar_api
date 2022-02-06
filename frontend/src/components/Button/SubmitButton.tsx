import { memo, ReactNode } from 'react';

import styled from "styled-components";
import { Button } from "@material-ui/core"


// style
const ButtonWrapper = styled.div`
  padding-top: 10px;
`

export const SubmitButton = memo((props: {children: ReactNode}) => {
  return(
    <Button
      type="submit"
      variant="contained"
      fullWidth
      color="primary"
      style={{fontSize: '1.1em'}}
    >
      {props.children}
    </Button>
  )
})