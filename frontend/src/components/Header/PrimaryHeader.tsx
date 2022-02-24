import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// material
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { Avatar, AppBar, Toolbar, IconButton, makeStyles, Button } from "@material-ui/core"

// material icon
import CreateIcon from '@mui/icons-material/Create';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';

// useContext
import { AuthContext } from "App";

// apis
import { PostModal } from "components/Modal/PostModal";

// compornent
import { UserModal } from "components/Modal/UserModal";

// material css
const useStyles = makeStyles(
  {
    appBar: {
      boxShadow: 'none',
      borderBottom: "solid 1px #dbdbdb",

    },
    title: {
      flexGrow: 1,
      textDecoration: "none",
      color: "inherit"
    }
  }
);

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    fontSize: '16px', 
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

export const PrimaryHeader = () => {

  const { currentUser } = useContext(AuthContext)

  const classes = useStyles();

  const history = useHistory();

  const [isOpen, setIsOpen] = useState<boolean>(false)

  // PostMenuモーダル表示
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isPostModal = Boolean(anchorEl);
  const handleMobileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  }

  // 投稿モーダル表示
  const handlePost = (e: any) => {
    e.preventDefault()
    setIsOpen(true)
  }
  

  return (
    <>
      {
        currentUser ? 


          <AppBar
            className={classes.appBar}
          >
            <Box
              sx={{ padding: {xs: '0', md: '0 200px'} }}
            >
              <Toolbar>
                <Typography
                  component={Link}
                  to="/"
                  variant="h6"
                  className={classes.title}
                >
                  photographar
                </Typography>

                <Search
                  sx={{ 
                    display: {xs: 'none', md: 'block' },
                    fontSize: "16px"
                  }}
                >
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="検索"
                    inputProps={{ 'aria-label': 'search' }}
                  />  
                </Search>

                <Box sx={{ flexGrow: 1 }} />


                {/* アイコン */}
                <Box
                  sx={{display: "flex"}}
                >
                  <IconButton
                    color="inherit"
                    onClick={handlePost}
                  >
                    <CreateIcon/>
                  </IconButton>

                  <IconButton
                    color="inherit"
                  >
                    <MailOutlineIcon/>
                  </IconButton>

                  <IconButton
                    color="inherit"
                  >
                    <NotificationsIcon/>
                  </IconButton>


                  {/* ユーザーアイコン */}
                  <IconButton
                    onClick={handleMobileMenuOpen} 
                  >
                    <Avatar
                      alt={currentUser?.name}
                      src={currentUser?.image?.url}
                    />
                  </IconButton>
                  
                </Box>

              </Toolbar>
            </Box>
          </AppBar>

        :
        <></>
      }

      {/* ユーザーモーダル      */}
      <UserModal
        isPostModal={isPostModal}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />

      {/* 投稿モーダル      */}
      <PostModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

          
    </>

    
  )
}