import { useState } from "react";
import styled from "styled-components";

// template
import { CommonLayout } from "components/templates/CommonLayout";

// organism
import { SearchForm } from "components/organisms/Search/SearchForm";
import { SearchContent } from "components/organisms/Search/SearchContent";

// apis
import { searchUser } from "apis/search";

// interface
import { User } from "interfaces/get/User";
import { Box, Grid } from "@material-ui/core";


export const SearchPage = () => {

  const [SearchText, setSearchText] = useState<string>()

  const [SearchedUsers, setSearchedUsers] = useState<Array<User>>([])

  const [DisplayText, setDisplayText] = useState<string>()

  const handleSearch = () => {
    if (SearchText) {
      const Data = {keyword: SearchText} 
      searchUser(Data)
      .then((data) => {
        setSearchedUsers(data.users)
      })
      setDisplayText(SearchText)
    }
  }

  return (
    <CommonLayout>

      <Box
        sx={{width: {xs: "300px", md: "600px" }}}      
      >
        <SearchForm
          setSearchText={setSearchText}
          handleSearch={handleSearch}
        />

        <SearchContent
          SearchedUsers={SearchedUsers}
          DisplayText={DisplayText}
        />
        
      </Box>

    </CommonLayout>
  )
}