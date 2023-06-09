import { fn } from '@vitest/spy'
import { render, screen } from '@testing-library/react'
import Pagination from './Pagination'

describe('Pagination', () => {
  it('renders', () => {
    render(<Pagination page={4} perPage={1} total={7} onChange={fn()} />)
    const buttons = screen.getAllByRole('button')

    // previous, 1, 2, 3, 4, 5, 6, 7, next
    expect(buttons.length).toBe(9)
    buttons
      .slice(1, 8)
      .forEach((page, i) => expect(page.textContent).toBe((i + 1).toString()))
  })

  it('renders with few pages', () => {
    render(<Pagination page={1} perPage={1} total={4} onChange={fn()} />)
    const buttons = screen.getAllByRole<HTMLButtonElement>('button')

    // previous, 4 pages, next
    expect(buttons.length).toBe(6)
    expect(buttons[0].disabled).toBeTruthy()
    buttons
      .slice(1, 5)
      .forEach((page, i) => expect(page.textContent).toBe((i + 1).toString()))
    expect(buttons[buttons.length - 1].disabled).toBeFalsy()
  })

  it('renders when one of the last pages is selected', () => {
    render(<Pagination page={100} perPage={1} total={100} onChange={fn()} />)
    const buttons = screen.getAllByRole<HTMLButtonElement>('button')

    // previous, 1, ..., 5 pages, next
    expect(buttons.length).toBe(9)
    expect(buttons[0].disabled).toBeFalsy()
    expect(buttons[1].textContent).toBe('1')
    expect(buttons[2].textContent).toBe('...')
    buttons
      .slice(3, 8)
      .forEach((page, i) => expect(page.textContent).toBe((96 + i).toString()))
    expect(buttons[buttons.length - 1].disabled).toBeTruthy()
  })

  it('renders when one of the middle pages is selected', () => {
    render(<Pagination page={50} perPage={1} total={100} onChange={fn()} />)
    const buttons = screen.getAllByRole<HTMLButtonElement>('button')

    // previous, 1, ..., 3 pages, ..., 100, next
    expect(buttons.length).toBe(9)
    expect(buttons[0].disabled).toBeFalsy()
    expect(buttons[1].textContent).toBe('1')
    expect(buttons[2].textContent).toBe('...')
    expect(buttons[3].textContent).toBe('49')
    expect(buttons[4].textContent).toBe('50')
    expect(buttons[5].textContent).toBe('51')
    expect(buttons[6].textContent).toBe('...')
    expect(buttons[7].textContent).toBe('100')
    expect(buttons[buttons.length - 1].disabled).toBeFalsy()
  })

  it('emits page change event', () => {
    const onChange = fn()
    render(<Pagination page={50} perPage={1} total={100} onChange={onChange} />)

    // The ... button should not emit an event, prev and next should
    const buttons = screen.getAllByRole('button')
    const inactiveButton = buttons[2]
    inactiveButton.click()
    const prevButton = buttons[0]
    prevButton.click()
    const nextButton = buttons[buttons.length - 1]
    nextButton.click()

    expect(onChange).toHaveBeenCalledTimes(2)
  })
})
