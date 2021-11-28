import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import { MetaMaskContext } from './MetaMaskContext'

const MetaMaskModal: FC = () => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { connect, getAccount } = useContext(MetaMaskContext)
  const connectRef = useRef<() => Promise<boolean>>(connect)
  const getAccountRef = useRef<() => Promise<string | undefined>>(getAccount)

  useEffect(() => {
    const initMetamask = async (): Promise<void> => {
      setError(null)
      setIsLoading(true)

      if (!(await connectRef.current())) {
        setIsLoading(false)
        return setError('Please install MetaMask.')
      }

      const account = await getAccountRef.current()
      setIsLoading(false)

      if (!account) {
        return setError('Please login with MetaMask.')
      }
    }

    initMetamask()
  }, [connectRef, getAccountRef])

  return (
    <>
      <Modal show={isLoading || !!error} size="sm" centered>
        <Modal.Header>
          <Modal.Title>MetaMask</Modal.Title>
        </Modal.Header>
        {isLoading && (
          <Modal.Body style={{ textAlign: 'center' }}>
            <Spinner animation="border" />
          </Modal.Body>
        )}
        {!!error && <Modal.Body>{error}</Modal.Body>}
      </Modal>
    </>
  )
}

export default MetaMaskModal
