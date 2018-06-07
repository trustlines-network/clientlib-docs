The project is currently not published on npm but will soon be. Until then clone or download the repository from [here](https://github.com/trustlines-network/clientlib) and follow the steps below.

Change into directory
```
$ cd ./clientlib
```
Install dependencies with `npm` or `yarn`
```
$ npm/yarn install
```
Build sources in case your project is not a TypeScript project
```
$ npm/yarn build
```
The command above will create three different sources which you can use depending on your project structure
```
_bundles/		// UMD bundles
lib/			// ES5(commonjs) + source + .d.ts
lib-esm/		// ES5(esmodule) + source + .d.ts
```
#### Import UMD bundle in HTML
```html
<script src="./_bundles/trustlines-network.min.js"></script>
```
#### Import CommonJS module
```javascript
const TLNetwork = require('./lib/TLNetwork.js')
```
#### Import ES6 module
```javascript
import { TLNetwork } from './lib-esm/trustlines-network'
```

Use the following configuration to connect to the currently deployed test setup.


**NOTE: The smart contracts are deployed on the Kovan testnet. So some Kovan Test ETH is required to interact with the contracts in this setup.**


```javascript
import { TLNetwork } from './src/TLNetwork'

const config = {
  protocol: 'https',
  host: 'relay0.testnet.trustlines.network',
  port: 443,
  path: 'api/v1/'
}

const tlNetwork = new TLNetwork(config)
```