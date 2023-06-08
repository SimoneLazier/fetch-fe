[fetch-fe](../README.md) / [Exports](../modules.md) / [models/Location](../modules/models_Location.md) / Location

# Interface: Location

[models/Location](../modules/models_Location.md).Location

The location (URL) of the object it is linked to. Changes done on it are reflected on the object it relates to. Both the Document and Window interface have such a linked Location, accessible via Document.location and Window.location respectively.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Location)

## Table of contents

### Properties

- [ancestorOrigins](models_Location.Location.md#ancestororigins)
- [city](models_Location.Location.md#city)
- [county](models_Location.Location.md#county)
- [hash](models_Location.Location.md#hash)
- [host](models_Location.Location.md#host)
- [hostname](models_Location.Location.md#hostname)
- [href](models_Location.Location.md#href)
- [latitude](models_Location.Location.md#latitude)
- [longitude](models_Location.Location.md#longitude)
- [origin](models_Location.Location.md#origin)
- [pathname](models_Location.Location.md#pathname)
- [port](models_Location.Location.md#port)
- [protocol](models_Location.Location.md#protocol)
- [search](models_Location.Location.md#search)
- [state](models_Location.Location.md#state)
- [zip\_code](models_Location.Location.md#zip_code)

### Methods

- [assign](models_Location.Location.md#assign)
- [reload](models_Location.Location.md#reload)
- [replace](models_Location.Location.md#replace)
- [toString](models_Location.Location.md#tostring)

## Properties

### ancestorOrigins

• `Readonly` **ancestorOrigins**: `DOMStringList`

Returns a DOMStringList object listing the origins of the ancestor browsing contexts, from the parent browsing context to the top-level browsing context.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Location/ancestorOrigins)

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:14410

___

### city

• **city**: `string`

#### Defined in

[src/models/Location.d.ts:5](https://github.com/SimoneLazier/fetch-fe/blob/9486deb/src/models/Location.d.ts#L5)

___

### county

• **county**: `string`

#### Defined in

[src/models/Location.d.ts:7](https://github.com/SimoneLazier/fetch-fe/blob/9486deb/src/models/Location.d.ts#L7)

___

### hash

• **hash**: `string`

Returns the Location object's URL's fragment (includes leading "#" if non-empty).

Can be set, to navigate to the same URL with a changed fragment (ignores leading "#").

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Location/hash)

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:14418

___

### host

• **host**: `string`

Returns the Location object's URL's host and port (if different from the default port for the scheme).

Can be set, to navigate to the same URL with a changed host and port.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Location/host)

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:14426

___

### hostname

• **hostname**: `string`

Returns the Location object's URL's host.

Can be set, to navigate to the same URL with a changed host.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Location/hostname)

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:14434

___

### href

• **href**: `string`

Returns the Location object's URL.

Can be set, to navigate to the given URL.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Location/href)

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:14442

___

### latitude

• **latitude**: `number`

#### Defined in

[src/models/Location.d.ts:3](https://github.com/SimoneLazier/fetch-fe/blob/9486deb/src/models/Location.d.ts#L3)

___

### longitude

• **longitude**: `number`

#### Defined in

[src/models/Location.d.ts:4](https://github.com/SimoneLazier/fetch-fe/blob/9486deb/src/models/Location.d.ts#L4)

___

### origin

• `Readonly` **origin**: `string`

Returns the Location object's URL's origin.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Location/origin)

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:14449

___

### pathname

• **pathname**: `string`

Returns the Location object's URL's path.

Can be set, to navigate to the same URL with a changed path.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Location/pathname)

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:14457

___

### port

• **port**: `string`

Returns the Location object's URL's port.

Can be set, to navigate to the same URL with a changed port.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Location/port)

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:14465

___

### protocol

• **protocol**: `string`

Returns the Location object's URL's scheme.

Can be set, to navigate to the same URL with a changed scheme.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Location/protocol)

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:14473

___

### search

• **search**: `string`

Returns the Location object's URL's query (includes leading "?" if non-empty).

Can be set, to navigate to the same URL with a changed query (ignores leading "?").

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Location/search)

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:14481

___

### state

• **state**: `string`

#### Defined in

[src/models/Location.d.ts:6](https://github.com/SimoneLazier/fetch-fe/blob/9486deb/src/models/Location.d.ts#L6)

___

### zip\_code

• **zip\_code**: `string`

#### Defined in

[src/models/Location.d.ts:2](https://github.com/SimoneLazier/fetch-fe/blob/9486deb/src/models/Location.d.ts#L2)

## Methods

### assign

▸ **assign**(`url`): `void`

Navigates to the given URL.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Location/assign)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` \| `URL` |

#### Returns

`void`

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:14487

___

### reload

▸ **reload**(): `void`

Reloads the current page.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Location/reload)

#### Returns

`void`

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:14493

___

### replace

▸ **replace**(`url`): `void`

Removes the current page from the session history and navigates to the given URL.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Location/replace)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` \| `URL` |

#### Returns

`void`

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:14499

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:14443
