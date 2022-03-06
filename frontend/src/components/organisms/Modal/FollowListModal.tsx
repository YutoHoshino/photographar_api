import { memo, useContext, useEffect, useState } from "react";
import styled from "styled-components";

// material
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Button, List } from '@material-ui/core';

// useContext
import { AuthContext, PostContext } from "App";

// mplecules
import { AvaterItem } from "components/molecules/AvaterItem";

// interface
import { User } from "interfaces/get/User";
import { UseFollow } from "hooks/useFollow";

const ContentWapper = styled(DialogContent)`
  height: 600px;
  padding: 0px !important;
`


interface Props {
  isOpen: boolean,
  onClose: () => void,
  followings: Array<User>
  followers: Array<User>
}

export const FollowListModal = memo((props: Props) => {

  // useContext
  const { currentUser } = useContext(AuthContext)
  const { isFollowed, setIsFollowed } = useContext(PostContext)

  const { followings, followers } = props
  
  const [Switch, setSwitch] = useState('followings');
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSwitch(newValue);
  };


  return (
    <>
      {
        currentUser ?
        <Dialog
          open={props.isOpen}
          onClose={props.onClose}
          fullWidth
        >
          <DialogTitle>
            
            <Tabs
              value={Switch}
              onChange={handleChange}
            >
              <Tab value="followings" label="フォロー" />
              <Tab value="followers" label="フォロワー" />
            </Tabs>
    
          </DialogTitle>
    
          <ContentWapper>
    
            <List>
              {
                Switch == "followings" ?
    
                followings.map((User) => 
                  <div
                    key={User.id}
                  >
                    <AvaterItem
                      userName={User.name}
                      ImageSrc={User.image?.url}
                      AvaterSize={40}
                      ItemGap={10}
                    >
                      {
                        currentUser.followings.some((curentFollowing) => curentFollowing.id == User.id) ?
                        <Button
                          id="followed"
                          onClick={(e) => {
                            UseFollow({User, e, setIsFollowed, isFollowed})
                          }}                    
                        >
                          フォロー中
                        </Button>
                        :
                        <Button
                          id="follow"
                          onClick={(e) => {
                            UseFollow({User, e, setIsFollowed, isFollowed})
                          }}
                        >
                          フォローする
                        </Button>
                      }
    
                    </AvaterItem>
                  </div>
                )
    
                :
    
                followers.map((User) => 
                  <div
                    key={User.id}
                  >
                    <AvaterItem
                      userName={User.name}
                      ImageSrc={User.image?.url}
                      AvaterSize={40}
                      ItemGap={10}
                    >
                      {
                        currentUser.followings.some((curentFollowing) => curentFollowing.id == User.id) ?
                        <Button
                          id="followed"
                          onClick={(e) => {
                            UseFollow({User, e, setIsFollowed, isFollowed})
                          }}
                        >
                          フォロー中
                        </Button>
                        :
                        <Button
                          id="follow"
                          onClick={(e) => {
                            UseFollow({User, e, setIsFollowed, isFollowed})
                          }}
                        >
                          フォローする
                        </Button>
                      }
    
                    </AvaterItem>
                  </div>
                )
              }
            
            </List>
          </ContentWapper>
    
        </Dialog>
        :
        <></>
      }
    </>
  )
})