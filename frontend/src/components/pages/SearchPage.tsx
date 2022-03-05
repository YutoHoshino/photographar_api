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

  const [SearchedUsers, setSearchedUsers] = useState<Array<User>>()

  const handleSearch = () => {
    if (SearchText) {
      const Data = {keyword: SearchText} 
      searchUser(Data)
      .then((data) => {
        setSearchedUsers(data.users)
      })
    }
  }

  return (
    <CommonLayout>

      <SearchForm
        setSearchText={setSearchText}
        handleSearch={handleSearch}
      />

      <SearchContent
        SearchedUsers={SearchedUsers}
      />

    </CommonLayout>
  )
}