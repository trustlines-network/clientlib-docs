The project is currently not published on npm but will soon be. Until then, clone or download the repository from [our repo](https://github.com/trustlines-network/clientlib) and follow the steps below.

Change into directory
```
$ cd ./clientlib
```
Install dependencies with `npm` or `yarn`.
```
$ npm install
```
```
$ yarn install
```
Build sources in case your project is not a TypeScript project.
```
$ npm build
```
```
$ yarn build
```
The command above will create three different sources which you can use depending on your project structure:
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


**NOTE: The [trustlines-network contracts](https://github.com/trustlines-network/contracts) are deployed on the Kovan testnet. Some Kovan Test ETH is therefore required to interact with the contracts in this setup. You can get some [here](https://gitter.im/kovan-testnet/faucet).**


```javascript
import { TLNetwork } from './src/TLNetwork'

const config = {
  protocol: 'https',
  host: 'relay0.testnet.trustlines.network',
  path: 'api/v1/'
}

const tlNetwork = new TLNetwork(config)
```
