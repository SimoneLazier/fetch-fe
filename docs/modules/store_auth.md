[fetch-fe](../README.md) / [Exports](../modules.md) / store/auth

# Module: store/auth

## Table of contents

### Properties

- [default](store_auth.md#default)

### Functions

- [setUser](store_auth.md#setuser)

## Properties

### default

• **default**: `Reducer`<{ `user`: `undefined` = undefined } \| { `user`: [`User`](../interfaces/models_User.User.md) = savedUser }\>

The slice's reducer.

#### Defined in

node_modules/@reduxjs/toolkit/dist/createSlice.d.ts:27

## Functions

### setUser

▸ **setUser**(`payload?`): `Object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`.
Calling it without an argument will return a PayloadAction with a payload of `undefined`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload?` | [`User`](../interfaces/models_User.User.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | `undefined` \| [`User`](../interfaces/models_User.User.md) |
| `type` | ``"auth/setUser"`` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:95
