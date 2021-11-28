import React, { FC, useContext, useEffect, useState } from 'react'
import { MetaMaskContext } from './MetaMaskContext'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const MIN_DEPOSIT_VALUE = 0.01

interface AmountInput {
  value: string
  isValid: boolean | undefined
  invalidMessage: string | undefined
}

const Deposit: FC = () => {
  const [amountInput, setAmountInput] = useState<AmountInput>({
    value: '',
    isValid: undefined,
    invalidMessage: undefined,
  })
  const { deposit } = useContext(MetaMaskContext)

  const depositAmount = () => {
    if (!amountInput.isValid) {
      return
    }

    deposit(amountInput.value)
  }

  useEffect(() => {
    if (amountInput.value == '') {
      return setAmountInput((previousInput) => {
        return { ...previousInput, isValid: undefined, invalidMessage: undefined }
      })
    }

    const amount = Number.parseFloat(amountInput.value)
    if (isNaN(amount)) {
      return setAmountInput((previousInput) => {
        return { ...previousInput, isValid: false, invalidMessage: 'Invalid input' }
      })
    }
    if (amount < MIN_DEPOSIT_VALUE) {
      return setAmountInput((previousInput) => {
        return { ...previousInput, isValid: false, invalidMessage: `Less than ${MIN_DEPOSIT_VALUE} ETH` }
      })
    }
    return setAmountInput((previousInput) => {
      return { ...previousInput, isValid: true, invalidMessage: undefined }
    })
  }, [amountInput.value])

  return (
    <Card>
      <Card.Header>Deposit</Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col xs={8}>
              <InputGroup hasValidation>
                <InputGroup.Text>ETH</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder={'0.1'}
                  value={amountInput.value}
                  onChange={(event) =>
                    setAmountInput((previous: AmountInput) => {
                      return { ...previous, value: event.target.value }
                    })
                  }
                  isValid={amountInput.isValid}
                  isInvalid={amountInput.isValid == false}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">{amountInput.invalidMessage}</Form.Control.Feedback>
              </InputGroup>
            </Col>
            <Col>
              <Button variant="primary" onClick={depositAmount} disabled={!amountInput.isValid}>
                Deposit
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Deposit
