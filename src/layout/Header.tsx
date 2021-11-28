import React, { FC, useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import StyledHeader from './Header.style'
import { MetaMaskContext } from './MetaMaskContext'

const Header: FC = () => {
  const { currentAccount } = useContext(MetaMaskContext)

  return (
    <StyledHeader bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>DeBank</Navbar.Brand>
        {!!currentAccount && <Navbar.Text>{currentAccount}</Navbar.Text>}
      </Container>
    </StyledHeader>
  )
}

export default Header
