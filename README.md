# cute.curl.js
smart url  for  easy use


## use 

```bash
cute get "http://lisa.com/abc/cc"  "{abc:1,hello:'world'}"  slient  -h header1:abc

cute "{abc:1,hello:'world'}"  slient  -h header1:abc  get "http://lisa.com/abc/cc"  


cute "{abc:1,hello:'world'}"  slient  -h header1:abc  get "http://lisa.com/abc/cc"  

cute "abc=1&cc=ccc"  -h header1:abc  post  "http://lisa.com/abc/cc"  
```
