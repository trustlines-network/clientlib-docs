Install the library using `npm` or `yarn`
```bash
$ npm install trustlines-clientlib
// OR
$ yarn add trustlines-clientlib
```

#### Import ES6 module
```javascript
import { TLNetwork } from 'trustlines-clientlib'
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
