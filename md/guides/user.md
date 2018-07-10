To be able to interact with the trustlines network protocol a user object is mandatory. It consists of an [eth-lightwallet]() keystore object, the ethereum address and the public key. You can either create a new user instance or load an existing serialized keystore. The created or loaded user is used for establishing trustlines, doing transfers, etc.

#### Create new instance
```javascript
const newUser = await tlNetwork.user.create()
```

#### Load 
```javascript
const serializedKeystore = '{"encSeed":{"encStr":"I4qBGJUmpzHUQoVRMkjMEAqGusa4oI7HEG7SQMYPO31OIH...'
const existingUser = await tlNetwork.user.load(serializedKeystore)
```
