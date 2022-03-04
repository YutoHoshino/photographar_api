import Menu from '@mui/material/Menu';

interface Props {
  isSearchModal: boolean,
  onClose:  () => void,
  SearchEl: any,
}

export const SearchModal = (props: Props) => {
  return (
    <Menu
      anchorEl={props.SearchEl}
      open={props.isSearchModal}
      onClose={props.onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
          },
        },
      }}
    >
      aaaa
    </Menu>
  )
}