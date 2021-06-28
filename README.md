# cute.curl.js
smart url  for  easy use


## use 

```bash

npm i -g cute.curl


cute get "http://lisa.com/abc/cc"  "{abc:1,hello:'world'}"  slient  -H header1:abc

cute "{abc:1,hello:'world'}"  slient  -H header1:abc  get "http://lisa.com/abc/cc"  

cute "{abc:1,hello:'world'}"  slient  -H header1:abc  get "http://lisa.com/abc/cc"  

cute "abc=1&cc=ccc"  -H header1:abc  post  "http://lisa.com/abc/cc"  

```



## dev
```bash
npm i -g aok.js

aok test -p 19999

node test


node bin.js http://localhost:19999/abc  post  'hello world' -H aaa:33 -H bb:3

```


## ext use

### data from file
```bash
node bin.js http://localhost:19999/abc  post  'hello world' -H aaa:33 -H bb:3  data.json

node bin.js http://localhost:19999/abc  post  'hello world' -H aaa:33 -H bb:3 data.txt

```

### output
```bash
# write to file temp/1.txt
node bin.js http://localhost:19999/abc  post  'hello world' -H aaa:33 -H bb:3 >temp/1.txt

node bin.js http://localhost:19999/abc  post  'hello world' -H aaa:33 -H bb:3  -o temp/1.txt

# append to file temp/1.txt
node bin.js http://localhost:19999/abc  post  'hello world' -H aaa:33 -H bb:3 >>temp/1.txt

node bin.js http://localhost:19999/abc  post  'hello world' -H aaa:33 -H bb:3 -o >>temp/1.txt

```

### clipboard
1. data from clipboard
```bash
cute http://localhost:11540/ post -c -v
```
2. url from clipbord

```bash
cute  post "{hello : 'good good day'}"  -v
```

### ext
```bash
# 1 
node bin.js http://localhost:19999/abc  post  'hello world' -H aaa:33 -H bb:3  -x "{resultHandler: async ()=>{ return { hello: 'world'} }}"
#=>   {"hello":"world"}

#2 esay way
node bin.js http://localhost:19999/abc  post  'hello world' -H aaa:33 -H bb:3  -x "()=>{ return { hello: 'world'} }"
# aysnc ()=>{ return { hello: 'world'} }       is OK 
#=>   {"hello":"world"}

# js file  ext
node bin.js http://localhost:19999/abc  post  'hello world' -H aaa:33 -H bb:3  -x "test/ext.js"

```

#### ext.js
can be
```js
exports.resultHandler = async function(result , options){
    console.log('result is :' + JSON.stringify(result) )
    console.log('optisons is :' + JSON.stringify(options))
    return {
        hello : 'good good day'
    }
}
```

or

```js
module.exports = function(result , options){
    console.log('result is :' + JSON.stringify(result) )
    console.log('optisons is :' + JSON.stringify(options))
    return {
        hello : 'good good day'
    }
}

```

you can do ext as your wish, hava good time