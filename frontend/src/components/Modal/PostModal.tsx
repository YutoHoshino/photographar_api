import React from 'react';
import { useState } from "react";
import styled from 'styled-components';

import { DialogContent, Dialog, DialogTitle, TextField } from '@material-ui/core';

//components
import { PrimaryTextField } from 'components/TextField/PrimaryTextField';
import { SubmitButton } from 'components/Button/SubmitButton';

interface Props {
  isOpen: boolean,
  onClose: () => void,
}

const DialogInner = styled(DialogContent)`
  padding-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  padding-top: 20px;
  width: 100%;
  bottom: 10px;
`

export const PostModal = (props: Props) => {

  const [text, setText] = useState<string>("")

  return (
  <Dialog
    open={props.isOpen}
    onClose={props.onClose}
    fullWidth
  >

    <DialogTitle>写真を投稿する</DialogTitle>
    <form>
      <DialogInner>
        <TextField
          rows={4}
          variant="outlined"
          required
          fullWidth
          label="キャプション"
          multiline
          placeholder='キャプションを入力...'
          onChange={e => setText(e.target.value)}
        />


        <ButtonWrapper>
          <SubmitButton>送信</SubmitButton>
        </ButtonWrapper>
      </DialogInner>
    </form>


  </Dialog>
  )
}