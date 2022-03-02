import { useContext, useState } from "react";
import styled from "styled-components";

// material
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Button, List, ListItem } from '@material-ui/core';

// useContext
import { AuthContext } from "App";

// mplecules
import { AvaterItem } from "components/molecules/AvaterItem";

// interface
import { User } from "interfaces/get/User";


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

export const FollowListModal = (props: Props) => {

  const { currentUser } = useContext(AuthContext)

  const { followings, followers } = props
  
  const [Switch, setSwitch] = useState('followings');
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSwitch(newValue);
  };


  return (
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

            followings.map((following) => 
              <ListItem
                key={following.id}
              >
                <AvaterItem
                  userName={following.name}
                  ImageSrc={following.image?.url}
                  AvaterSize={40}
                >
                  <Button>ボタン</Button>

                </AvaterItem>
              </ListItem>
            )

            :

            followers.map((follower) => 
              <ListItem
                key={follower.id}
              >
                <AvaterItem
                  userName={follower.name}
                  ImageSrc={follower.image?.url}
                  AvaterSize={40}
                >
                  <Button>ボタン</Button>

                </AvaterItem>
              </ListItem>
            )
          }
        
        </List>
      </ContentWapper>

    </Dialog>
  )
}