import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

// material
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Avatar, AppBar, Button } from "@material-ui/core"
import IconButton from '@mui/material/IconButton';

// material icon
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

// useContext
import { AuthContext } from "App";

// Modal
import { PostModal } from "components/organisms/Modal/PostModal";
import { UserModal } from "components/organisms/Modal/UserModal";

const HeaderBar = styled(AppBar)`
  background: white;
  box-shadow: none;
  border-bottom: solid 1px #dbdbdb;
`
const Toolbar = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const LogoText = styled(Typography)`
  text-decoration: none;
  font-weight: bold !important;
  cursor: pointer; 
`
const Search = styled(SearchIcon)`
  color: rgb(142, 142, 142);
`
const ItemWapper = styled(Box)`
  align-items: center;
  display: flex;
`
const PostButton = styled(Button)`
  margin: 10px;
  color: #0095f6;
  font-weight: bold;
  border: 1px solid #0095f6;
  font-size: 12px;
`

export const PrimaryHeader = () => {

  const { currentUser } = useContext(AuthContext)

  const history = useHistory();

  // ホーム画面に移動
  const handleHome = () => {
    history.push("/")
  }

  // ホーム画面に移動
  const handleSearch = () => {
    history.push("/search")
  }

  // Postモーダル
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handlePost = (e: any) => {
    e.preventDefault()
    setIsOpen(true)
  }

  // Userメニューモーダル
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isPostModal = Boolean(anchorEl);
  const handleMobileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  }

  return (
    <>
      {
        currentUser ? 


          <HeaderBar color="default">

            <Toolbar sx={{ padding: {xs: '10px', md: '0 320px'} }}>

                <LogoText
                  onClick={handleHome}
                >
                  photographar
                </LogoText>


                <ItemWapper>

                  <Box>
                    <IconButton
                      onClick={handleSearch}
                    >
                      <Search/>
                    </IconButton>
                  </Box>

                  <Box>
                    <IconButton>
                      <NotificationsNoneIcon/>
                    </IconButton>
                  </Box>

                  <IconButton
                    onClick={handleMobileMenuOpen} 
                  >
                    <Avatar
                      alt={currentUser?.name}
                      src={currentUser?.image?.url}
                    />
                  </IconButton>

                  <PostButton
                    onClick={handlePost}
                  >
                    投稿
                  </PostButton>
                  
                </ItemWapper>

            </Toolbar>
          </HeaderBar>

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