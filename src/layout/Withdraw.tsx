import React, { FC, useContext } from 'react'
import { MetaMaskContext } from './MetaMaskContext'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Withdraw: FC = () => {
  const { withdraw } = useContext(MetaMaskContext)

  return (
    <Card>
      <Card.Header>Withdraw</Card.Header>
      <Card.Body style={{ textAlign: 'center' }}>
        <Button variant="primary" onClick={withdraw}>
          Withdraw
        </Button>
      </Card.Body>
    </Card>
  )
}

export default Withdraw
