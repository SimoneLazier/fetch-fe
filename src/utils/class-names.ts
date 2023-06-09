/**
 * A utility function that merges classes.
 * - If an object is passed, the key is added to the class list if its value is truthy
 * - If an array is passed, the element is added to the class list if it's truthy
 *
 * @param classes The classes to merge
 * @returns The merged class list
 */
export function classNames(classes: unknown): string {
  if (typeof classes === 'string') return classes
  if (Array.isArray(classes))
    return classes.filter(Boolean).map(classNames).join(' ')
  if (classes && typeof classes === 'object')
    return Object.entries(classes)
      .filter((el) => Boolean(el[1]))
      .map((el) => classNames(el[0]))
      .join(' ')

  throw new Error(
    'Only arrays, objects, and strings can be converted to a class string.',
  )
}
