import { useContext, useState } from "react";
import styled from "styled-components";

// material
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import { Avatar, AppBar, Button } from "@material-ui/core"
import IconButton from '@mui/material/IconButton';

// material icon
import SearchIcon from '@mui/icons-material/Search';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

// useContext
import { AuthContext } from "App";

// Modal
import { SearchModal } from "components/organisms/Modal/SearchModal";
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
`
const SeachWapper = styled(Box)`
  padding: 0 10px;
  border-radius: 10px;
  background: #efefef;
  display: flex;
  align-items: center;
`
const Input = styled(InputBase)`
  font-size: 13px !important;
  padding: 3px 5px;
`
const Search = styled(SearchIcon)`
  color: rgb(142, 142, 142);
`
const ItemWapper = styled(Box)`
  display: flex;
`

export const PrimaryHeader = () => {

  const { currentUser } = useContext(AuthContext)

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


  // 検索ロジック
  const [SearchText, setSearchText] = useState<string>()

  return (
    <>
      {
        currentUser ? 


          <HeaderBar color="default">

            <Toolbar sx={{ padding: {xs: '10px', md: '0 320px'} }}>

                <LogoText>photographar</LogoText>


                <SeachWapper
                  sx={{ display: {xs: 'none', md: 'flex'} }}
                >
                  <Search/>
                  <Input
                    placeholder="検索..."
                    onChange={e => setSearchText(e.target.value)}
                  />

                </SeachWapper>


                <ItemWapper>

                  <IconButton
                    onClick={handlePost}
                  >
                    <CreateOutlinedIcon/>
                  </IconButton>

                  <IconButton
                  >
                    <MailOutlineIcon/>
                  </IconButton>

                  <IconButton
                  >
                    <NotificationsNoneIcon/>
                  </IconButton>

                  <IconButton
                    onClick={handleMobileMenuOpen} 
                  >
                    <Avatar
                      alt={currentUser?.name}
                      src={currentUser?.image?.url}
                    />
                  </IconButton>
                  
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