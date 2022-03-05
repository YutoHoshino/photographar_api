import { useState } from "react";
import styled from "styled-components";

import { Box, Button, InputBase, makeStyles, TextField, Theme } from "@material-ui/core";

import SearchIcon from '@mui/icons-material/Search';

const SeachWapper = styled(Box)`
  display: flex;
  background: #edf2f7;
  align-items: center;
  padding: 5px 20px;
  border-radius: 2.5em;
  border: 1px solid #0000;
  font-size: 10px;
`
const Search = styled(SearchIcon)`
  color: rgb(142, 142, 142);
`

const useStyles = makeStyles((theme: Theme) => ({
  CommentField: {
    fontSize: "14px",
    whiteSpace: "pre-line",
  },
}))

interface Props {
  setSearchText: any
  handleSearch: any
}

export const SearchForm = (props: Props) => {

  const classes = useStyles();

  const { setSearchText, handleSearch } = props

  return (
    <form>
      <SeachWapper
        sx={{width: {sx: "300px", md: "400px"}}}
      >
          
        <TextField
          fullWidth
          placeholder="キーワードを検索..."
          onChange={e => setSearchText(e.target.value)}
          InputProps={{
            disableUnderline: true,
            classes: {input: classes.CommentField}
          }}
        />

        <Button
          style={{display:"none"}}
          type="submit"
          onClick={e => {
            e.preventDefault()
            handleSearch()
          }}
        />

        <Search/>

      </SeachWapper> 
    </form>
  )
}