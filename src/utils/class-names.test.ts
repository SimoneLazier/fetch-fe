import { fn } from '@vitest/spy'
import { classNames } from './class-names'

describe('classNames Utility', () => {
  it('merges arrays', () => {
    const classes = ['a', false && 'b', null, undefined, true && 'c']
    expect(classNames(classes)).toBe('a c')
  })

  it('merges objects', () => {
    const classes = { a: true, b: false }
    expect(classNames(classes)).toBe('a')
  })

  it('merges arrays with objects', () => {
    const classes = [{ a: true, b: false }, 'd']
    expect(classNames(classes)).toBe('a d')
  })

  it('throws an error if the parameter is of a wrong type', () => {
    expect(() => classNames(fn())).toThrowError()
  })
})
