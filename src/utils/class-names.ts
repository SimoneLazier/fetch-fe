export function classNames(classes: unknown): string {
  if (typeof classes === 'string') return classes
  if (Array.isArray(classes))
    return classes.filter(Boolean).map(classNames).join(' ')
  if (classes && typeof classes === 'object')
    return Object.entries(classes)
      .filter((el) => Boolean(el[1]))
      .map((el) => classNames(el[0]))
      .join(' ')

  throw new Error('Only arrays and objects can be converted to a class string.')
}
