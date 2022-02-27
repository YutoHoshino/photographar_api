import Avatar from '@mui/material/Avatar';

import styled from "styled-components";

const SAvatar = styled(Avatar)`
  cursor: pointer;
  border: 0.1px solid lightgray;
`

interface Props {
  alt: string
  src: string | undefined
  size: number
}

export const UserAveter = (props: Props) => {

  const {alt, src, size} = props

  return (
    <SAvatar
      alt={alt}
      src={src}
      sx={{ width: size, height: size }}
    />
  ) 
}