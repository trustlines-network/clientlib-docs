This library is a promise-based library. So every asynchronous call will return a native Javascript promise. If an error occurs the library will throw it. The caller has to handle it appropriately. It is up to you if you choose `promise` or `async/await` syntax for calling the methods.

#### Promise syntax
```javascript
tlNetwork
    .currencyNetwork.getAll()
    .then(networks => {
        console.log('Currency networks: ', networks)
    })
    .catch(error => {
        console.log('Error: ', error)
    })
```

#### Async/await syntax
```javascript
try {
    const networks = await tlNetwork.currencyNetwork.getAll()
    console.log('Currency networks: ', networks)
} catch {
    console.log('Error: ', error)
}
```
