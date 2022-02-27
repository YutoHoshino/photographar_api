import { memo, ReactNode } from 'react';

import { Button } from "@material-ui/core"

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