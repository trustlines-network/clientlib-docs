The requirement for a successful trustline transfer is a path with enough capacity from the sender to the receiver in the currency network. It is also to mention that the sender is always the iniated user.

#### Trustline Transfer
```javascript
const networkAddress = '0xf8E191d2cd72Ff35CB8F012685A29B31996614EA'
const receiverAddress = '0xcE2D6f8bc55A61428D32947bC9Bc7F2DE1640B18'

const txObj = await tlNetwork.payment.prepare(
    networkAddress,
    receiverAddress,
    1.23
)
console.log('Estimated transaction costs in ETH: ', txObj.ethFees.value)

const txHash = await tlNetwork.payment.confirm(txObj.raw)
console.log('Transaction hash: ', txHash)
```
