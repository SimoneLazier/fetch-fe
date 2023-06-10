[fetch-fe](../README.md) / [Exports](../modules.md) / utils/class-names

# Module: utils/class-names

## Table of contents

### Functions

- [classNames](utils_class_names.md#classnames)

## Functions

### classNames

▸ **classNames**(`classes`): `string`

A utility function that merges classes.
- If an object is passed, the key is added to the class list if its value is truthy
- If an array is passed, the element is added to the class list if it's truthy

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `classes` | `unknown` | The classes to merge |

#### Returns

`string`

The merged class list

#### Defined in

[src/utils/class-names.ts:9](https://github.com/SimoneLazier/fetch-fe/blob/5933c5b/src/utils/class-names.ts#L9)
