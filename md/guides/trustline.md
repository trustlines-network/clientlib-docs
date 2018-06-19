To set up a trustline make sure that a user instance is provided either by creating a new one or loading an existing keystore. Also note that the account has to have enough ETH to actually create transactions.

#### 1. Request for establishing a trustline
As trustline agreements are bilateral agreements, they have to be accepted by both parties. The first step to establish a trustline is therefore to create an initial request or proposal to the counterparty.
```javascript
const networkAddress = '0xf8E191d2cd72Ff35CB8F012685A29B31996614EA'
const counterpartyAddress = '0xcE2D6f8bc55A61428D32947bC9Bc7F2DE1640B18'

// prepare a transaction to request a trustline update
const txObj = await tlNetwork.trustline.prepareUpdate(
    networkAddress,
    counterpartyAddress,
    100,
    200
)
console.log('Estimated transaction costs in ETH: ', txObj.ethFees.value)

// sign and relay the transaction
const txHash = await tlNetwork.trustline.confirm(txObj.rawTx)
console.log('Transaction hash: ', txHash)
```
The initiator creates a request where he is willing to **lend** a maximal denomination of `100` to the user with the address `counterpartyAddress` in the currency network with the address `networkAddress`. He also proposes that he is willing to **owe** a maximal denomination of `200` to the counterparty.

#### 2. Accept trustline request
In the next step the counterparty has to accept the request. Note that in the example below we assume that the iniated user is the counterparty of step 1.
```javascript
const networkAddress = '0xf8E191d2cd72Ff35CB8F012685A29B31996614EA'

// retrieve latest request from step 1
const requests = await tlNetwork.trustline.getRequests(networkAddress)
const latestRequest = requests[requests.length - 1]
const iniatorAddress = latestRequest.from
const creditlineGivenToIniator = latestRequest.received
const creditlineReceivedFromInitator = latestRequest.given

const txObj = await tlNetwork.trustline.prepareAccept(
    networkAddress,
    iniatorAddress,
    creditlineGivenToIniator,
    creditlineReceivedFromInitator
)
console.log('Estimated transaction costs in ETH: ', txObj.ethFees.value)

// sign and relay the transaction
const txHash = await tlNetwork.trustline.confirm(txObj.rawTx)
console.log('Transaction hash: ', txHash)
```
The counterparty of step 1 first fetches all trustline requests in the currency network. The `prepareAccept` function is then called where the attributes `given` and `received` have to be from the point of view of the caller. So in our case the counterparty or receiver of the initial request.

**NOTE: All numerical values have to be provided in their biggest representation. For example if the currency network has two decimals the values have to be in a format like `1.25`.**
