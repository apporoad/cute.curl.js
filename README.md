# cute.curl.js
smart url  for  easy use


## use 

```bash

npm i -g cute.curl


cute get "http://lisa.com/abc/cc"  "{abc:1,hello:'world'}"  slient  -h header1:abc

cute "{abc:1,hello:'world'}"  slient  -h header1:abc  get "http://lisa.com/abc/cc"  


cute "{abc:1,hello:'world'}"  slient  -h header1:abc  get "http://lisa.com/abc/cc"  

cute "abc=1&cc=ccc"  -h header1:abc  post  "http://lisa.com/abc/cc"  
```



## dev
```bash
npm i -g aok.js

aok test -p 19999

node test


node bin.js http://localhost:19999/abc  post  'hello world' -H aaa:33 -H bb:3

```


