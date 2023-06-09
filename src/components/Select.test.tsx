import { fireEvent, render, screen } from '@testing-library/react'
import { fn } from '@vitest/spy'
import Select from './Select'

const mockOptions = ['a', 'b', 'c']

describe('Select', () => {
  it('works with a single value', async () => {
    const onChange = fn()
    render(
      <Select
        value={''}
        options={mockOptions}
        onChange={onChange}
        placeholder="Test"
      />,
    )

    // Search option
    const input = await screen.findByPlaceholderText('Test')
    fireEvent.change(input, { target: { value: 'a' } })
    // Select it
    const option = await screen.findByText('a')
    fireEvent.click(option)

    expect(onChange).toBeCalledWith('a')
  })

  it('works with multiple values', async () => {
    const onChange = fn()
    render(
      <Select
        value={[]}
        options={mockOptions}
        onChange={onChange}
        placeholder="Test"
        multiple
      />,
    )

    // Search first option
    const input = await screen.findByPlaceholderText('Test')
    fireEvent.change(input, { target: { value: 'a' } })
    // Select it
    let option = await screen.findByText('a')
    fireEvent.click(option)
    // Remove search - all options should appear
    fireEvent.change(input, { target: { value: '' } })
    // Select the second one
    option = await screen.findByText('b')
    fireEvent.click(option)

    expect(onChange).toBeCalledWith(['a', 'b'])
  })
})
