import React from 'react';
import { useState } from "react";
import styled from 'styled-components';

import { DialogContent, Dialog, DialogTitle, TextField, Button, makeStyles, Theme, IconButton, LinearProgress } from '@material-ui/core';

//components
import { SubmitButton } from 'components/Button/SubmitButton';

// interface
import { PostData } from 'interfaces';

// apis
import { postCreate } from 'apis/post';
import { PostCreate } from 'containers/PostCreate';

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

const ImageWapper = styled.div`
  padding: 15px;
  height: 80px;
  display: flex;
`

const ImagesArea = styled.div`
  width: 100%;
  padding: 0 10px;
  display: flex;
`

const ImagesBox = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border: 1px solid #f3f3f3;
`

const Image = styled.img`
  object-fit: contain;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
`

export const PostModal = (props: Props) => {

  const [caption, setCaption] = useState<string>("")
  const [images, setImages] = useState<File[]>([]);
  const maxImagesUpload = 3;
  const inputId = Math.random().toString(32).substring(2);

  // 写真追加
  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img: File = e.target.files[0];
    setImages([...images, img]);
  };

  // 写真削除
  const handleOnRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // 投稿
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    PostCreate({caption, images})
    .then((res) => {
      setImages([])
      setCaption("")
      props.onClose();
    })
  }


  return (
         
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      fullWidth
    >
      <DialogTitle>写真を投稿する</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogInner>
          <TextField
          rows={4}
          variant="outlined"
          required
          fullWidth
          label="キャプション"
          multiline
          placeholder='キャプションを入力...'
          onChange={e => setCaption(e.target.value)}
        />

          <ImageWapper>
            <label 
              htmlFor={inputId}>
              <Button
                variant="contained"
                disabled={images.length >= maxImagesUpload}
                component="span"
              >
                ＋
              </Button>
              <input
                id={inputId}
                type="file"
                multiple
                accept="image/*,.png,.jpg,.jpeg,.gif"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnAddImage(e)}
                disabled={images.length >= maxImagesUpload}
                style={{ display: "none" }}
              />
            </label>
            <ImagesArea>
              {images.map((image, i) => (
                <ImagesBox key={i} >
                  <Image src={URL.createObjectURL(image)}/>
                  <IconButton
                    style={{
                      top: -15,
                      left: -10,
                      color: "#aaa"
                    }}
                    onClick={() => handleOnRemoveImage(i)}>
                      <div>×</div>
                  </IconButton>
                </ImagesBox>
              ))}
            </ImagesArea>
          </ImageWapper>

          <ButtonWrapper>
            <SubmitButton>送信</SubmitButton>
          </ButtonWrapper>
        </DialogInner>
      </form>
    </Dialog>
  )
}