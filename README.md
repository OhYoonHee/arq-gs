# ARQGS
Unofficial Google app script library wrapper For the A.R.Q. API.

## Installation
Add this library id to your google app script project :\
\
New Editor : `1PMKY4mZKhqtQzaGPGXeAzC88Zj7U1NMr2sM0DHK-RrqsJ0bjWTF124Zu`\
Legacy Editor : `AKfycbyRzb4FF0Ca19YYjgb97RUAx-bapPnH82jXjUxCjzC40Npb0YIj8O4rtGsnSyf3bGAw0A`\


## Usage Example
Example
```js
const arq = new ARQ.Sync("http://yourArqApi.com", "YOUR_ARQ_APIKEY");
const arq_async = new ARQ.Async("http://yourArqApi.com", "YOUR_ARQ_APIKEY");

// synonymous
function ARQSync(){
    let luna = arq.luna("Hello luna", 1);
    Logger.log(luna);
    return;
}

// asynchronous
async function ARQAsync(){
    let luna = await arq_async.luna("Hello luna", 1);
    Logger.log(luna);
    return;
}
```
run ARQSync or ARQAsync function in google app script.

## Documentation
Coming soon. or you can see the source code ::))

## inspiration
[arq-js](https://github.com/rojserbest/arq-js)

## Discussion
[@GASTestingGroup](https://t.me/GASTestingGroup)
