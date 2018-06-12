# JSON web token plugin for wingbot

Fast solution for webview requests authorization

## Usage

```javascript
const { Processor } = require('wingbot');
const { BotTokenStorage } = require('wingbot-jwt');

const processor = new Processor(bot, {
    tokenStorage: new BotTokenStorage('<put a secret here>', { expiresIn: '30d' })
})
```

-----------------

# API
## Classes

<dl>
<dt><a href="#BotTokenStorage">BotTokenStorage</a></dt>
<dd><p>Storage for JWT tokens</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Token">Token</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="BotTokenStorage"></a>

## BotTokenStorage
Storage for JWT tokens

**Kind**: global class  

* [BotTokenStorage](#BotTokenStorage)
    * [new BotTokenStorage(secretOrPrivateKey, [jwtOptions])](#new_BotTokenStorage_new)
    * [.findByToken(token)](#BotTokenStorage+findByToken) ⇒ <code>Promise.&lt;(Token\|null)&gt;</code>
    * [.getOrCreateToken(senderId, pageId)](#BotTokenStorage+getOrCreateToken) ⇒ <code>Promise.&lt;(Token\|null)&gt;</code>

<a name="new_BotTokenStorage_new"></a>

### new BotTokenStorage(secretOrPrivateKey, [jwtOptions])

| Param | Type |
| --- | --- |
| secretOrPrivateKey | <code>string</code> \| <code>Buffer</code> | 
| [jwtOptions] | <code>Object</code> | 

<a name="BotTokenStorage+findByToken"></a>

### botTokenStorage.findByToken(token) ⇒ <code>Promise.&lt;(Token\|null)&gt;</code>
**Kind**: instance method of [<code>BotTokenStorage</code>](#BotTokenStorage)  

| Param | Type |
| --- | --- |
| token | <code>string</code> | 

<a name="BotTokenStorage+getOrCreateToken"></a>

### botTokenStorage.getOrCreateToken(senderId, pageId) ⇒ <code>Promise.&lt;(Token\|null)&gt;</code>
**Kind**: instance method of [<code>BotTokenStorage</code>](#BotTokenStorage)  

| Param | Type |
| --- | --- |
| senderId | <code>string</code> | 
| pageId | <code>string</code> | 

<a name="Token"></a>

## Token : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| senderId | <code>string</code> | 
| pageId | <code>string</code> | 
| token | <code>string</code> | 

