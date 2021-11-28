import React, { FC } from 'react'
import MetaMaskModal from './MetaMaskModal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MetaMaskContext, useMetaMaskContext } from './MetaMaskContext'
import Header from './Header'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import { StyledAppContent } from './App.style'

const App: FC = () => {
  const metaMaskContextValue = useMetaMaskContext()

  return (
    <div>
      <MetaMaskContext.Provider value={metaMaskContextValue}>
        <Header />
        <StyledAppContent fluid>
          <Row>
            <Col>
              <Deposit />
            </Col>
            <Col>
              <Withdraw />
            </Col>
          </Row>
        </StyledAppContent>
        <MetaMaskModal />
      </MetaMaskContext.Provider>
    </div>
  )
}

export default App
