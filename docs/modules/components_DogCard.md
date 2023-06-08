[fetch-fe](../README.md) / [Exports](../modules.md) / components/DogCard

# Module: components/DogCard

## Table of contents

### Functions

- [default](components_DogCard.md#default)

## Functions

### default

▸ **default**(`props`): `Element`

A single dog card

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | The dog object, the active state, and the event listeners |
| `props.active` | `boolean` | - |
| `props.dog` | [`Dog`](../interfaces/models_Dog.Dog.md) | - |
| `props.onGetResults` | () => `void` | - |
| `props.onToggleSelect` | () => `void` | - |

#### Returns

`Element`

#### Defined in

[src/components/DogCard.tsx:11](https://github.com/SimoneLazier/fetch-fe/blob/9486deb/src/components/DogCard.tsx#L11)
