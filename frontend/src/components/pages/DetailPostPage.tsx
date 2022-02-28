import { useContext, useEffect, useState } from 'react';
import styled from "styled-components";

// material
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { LinearProgress } from '@material-ui/core';

 // useContext
import { AuthContext } from 'App';

// organisms
import { DetailPostCardHeader } from 'components/organisms/DetailPost/DetailPostCardHeader';
import { DetailPostCardComment } from 'components/organisms/DetailPost/DetailPostCardComment';
import { DetaiPostCardlSwiper } from 'components/organisms/DetailPost/DetailPostCardSwiper';
import { DetailPostCardAction } from 'components/organisms/DetailPost/DetailPostCardAction';
import { DetailPostCardLike } from 'components/organisms/DetailPost/DetailPostCardLike';
import { DetailPostCardTextField } from 'components/organisms/DetailPost/DetailPostCardTextField';

// template
import { CommonLayout } from "components/templates/CommonLayout";
import { LoadLayout } from "components/templates/LoadLayout";

// apis
import { postShowData } from 'apis/post';

// interface
import { PostData } from 'interfaces/Posts';

// style css
const PostCard = styled(Card)`
  max-width: 800px;
  min-height: 550px;
  boxShadow: none;
  border: 1px solid #dbdbdb;
`

const CardLeft = styled(Grid)`
  max-width: 350px;
  min-width: 300px;
`

export const DetailPostPage = ({ match }: any) => {

  const { currentUser } = useContext(AuthContext)

  // 対象のPostID
  const params = {id: match.params.postId}

  const [PostData, setPostData] = useState<PostData>()

  useEffect(() => {
    postShowData(params)
    .then(data => {
      setPostData(data.post)
    })
  },[])
  
  // ライクの初期化
  let likeCount = PostData?.likes.length

  return (

    <>
      { PostData && currentUser ?
        
        <CommonLayout>

          <PostCard 
            sx={{ 
              display: { xs: 'block', md: 'flex'},
              width:   { xs: "350px", md: "100%"}
            }}
          >

            <DetaiPostCardlSwiper photos={PostData.photos}/>

            <CardLeft  sx={{width: {xs: "350px", md: "300px"}}}>

              <DetailPostCardHeader 
                PostData={PostData}
              /> 

              <DetailPostCardComment 
                PostData={PostData}
              />

              <DetailPostCardAction 
                PostData={PostData} 
                likeCount={likeCount} 
                currentUser={currentUser}
              />

              <DetailPostCardLike 
                PostData={PostData}
              />

              <DetailPostCardTextField
                PostData={PostData}
                setPostData={setPostData}
              />

            </CardLeft>

          </PostCard>

        </CommonLayout>
        :
        <LoadLayout>
          <div>ロード中・・・</div>
          <LinearProgress/>
        </LoadLayout>
      }

    </>
  )
}