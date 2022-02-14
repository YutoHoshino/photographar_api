import React from "react"
import styled from "styled-components";

// component
import { PrimaryHeader } from "components/Header/PrimaryHeader"

const Sheader = styled.header`
  margin-bottom: 80px;
`

export const CommonLayout = ({children}:any) => {

  return (
    <>
      <Sheader>
        <PrimaryHeader />
      </Sheader>
      {children}
    </>
  )
}