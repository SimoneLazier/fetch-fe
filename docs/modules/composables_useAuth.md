[fetch-fe](../README.md) / [Exports](../modules.md) / composables/useAuth

# Module: composables/useAuth

## Table of contents

### Functions

- [default](composables_useAuth.md#default)

## Functions

### default

▸ **default**(): `Object`

Custom hook to handle authentication

#### Returns

`Object`

The user, whether they're logged, and functions to perform login and logout

| Name | Type |
| :------ | :------ |
| `isLogged` | `boolean` |
| `login` | (`name`: `string`, `email`: `string`) => `Promise`<`void`\> |
| `logout` | (`clientOnly`: `boolean`) => `Promise`<`void`\> |
| `user` | `undefined` \| [`User`](../interfaces/models_User.User.md) |

#### Defined in

[src/composables/useAuth.tsx:11](https://github.com/SimoneLazier/fetch-fe/blob/5933c5b/src/composables/useAuth.tsx#L11)
