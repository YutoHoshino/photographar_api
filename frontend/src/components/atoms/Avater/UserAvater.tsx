import { useHistory } from 'react-router-dom';

import styled from "styled-components";

import Avatar from '@mui/material/Avatar';

const SAvatar = styled(Avatar)`
  cursor: pointer;
  border: 0.1px solid lightgray;
`

interface Props {
  userName: string
  ImageSrc: string | undefined
  AvaterSize?: number
  Url?: string
}

export const UserAveter = (props: Props) => {

  const history = useHistory();

  const {userName, ImageSrc, AvaterSize, Url} = props

  return (
    <SAvatar
      alt={userName}
      src={ImageSrc}
      sx={{ width: AvaterSize, height: AvaterSize }}
      onClick={() => {history.push(`${Url}`)}}
    />
  ) 
}