import { vi } from 'vitest'
import { fn } from '@vitest/spy'
import { fireEvent, render, screen } from '@testing-library/react'
import Modal from './Modal'

// Mock ResizeObserver
const MockResizeObserver = fn(() => ({
  disconnect: fn(),
  observe: fn(),
  unobserve: fn(),
}))
vi.stubGlobal('ResizeObserver', MockResizeObserver)

describe('Modal', () => {
  it('renders', () => {
    render(
      <Modal open={true} onConfirm={fn()} onClose={fn()}>
        Test
      </Modal>,
    )
  })

  it('renders with custom buttons', async () => {
    render(
      <Modal
        open={true}
        cancelText="Cancel Test"
        confirmText="Confirm Test"
        onConfirm={fn()}
        onClose={fn()}
      >
        Test
      </Modal>,
    )

    const cancel = await screen.findByText('Cancel Test')
    const confirm = await screen.findByText('Confirm Test')
    expect(cancel).toBeInTheDocument()
    expect(confirm).toBeInTheDocument()
  })

  it('emits the correct events', async () => {
    const onConfirm = fn()
    const onClose = fn()
    render(
      <Modal open={true} onConfirm={onConfirm} onClose={onClose}>
        Test
      </Modal>,
    )

    const cancel = await screen.findByText('Cancel')
    const confirm = await screen.findByText('Confirm')

    fireEvent.click(cancel)
    expect(onClose).toHaveBeenCalled()

    fireEvent.click(confirm)
    expect(onConfirm).toHaveBeenCalled()
  })
})
