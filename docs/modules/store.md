[fetch-fe](../README.md) / [Exports](../modules.md) / store

# Module: store

## Table of contents

### Variables

- [default](store.md#default)

### Functions

- [useAppDispatch](store.md#useappdispatch)
- [useAppSelector](store.md#useappselector)

## Variables

### default

• `Const` **default**: `ToolkitStore`<`Object`, `AnyAction`, [`ThunkMiddleware`<`Object`, `AnyAction`\>]\>

The redux store

#### Defined in

[src/store/index.tsx:8](https://github.com/SimoneLazier/fetch-fe/blob/5933c5b/src/store/index.tsx#L8)

## Functions

### useAppDispatch

▸ **useAppDispatch**(): `ThunkDispatch`<`Object`, `undefined`, `AnyAction`\> & `Dispatch`<`AnyAction`\>

#### Returns

`ThunkDispatch`<`Object`, `undefined`, `AnyAction`\> & `Dispatch`<`AnyAction`\>

#### Defined in

[src/store/index.tsx:12](https://github.com/SimoneLazier/fetch-fe/blob/5933c5b/src/store/index.tsx#L12)

___

### useAppSelector

▸ **useAppSelector**<`TSelected`\>(`selector`, `equalityFn?`): `TSelected`

#### Type parameters

| Name |
| :------ |
| `TSelected` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | (`state`: `Object`) => `TSelected` |
| `equalityFn?` | `EqualityFn`<`NoInfer`<`TSelected`\>\> |

#### Returns

`TSelected`

#### Defined in

node_modules/react-redux/es/types.d.ts:75
