import useMediaQuery from '@mui/material/useMediaQuery';

export const useSizing = () => {
  const matches = useMediaQuery('(min-width:900px)');
  return matches
}