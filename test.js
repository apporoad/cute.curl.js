var curl = require('./index')


// curl.invoke(['http://localhost:19999/abc11' , 'post' , '{a : 1}'], {
//     headers: {
//         abc : '111'
//     },
//     verbose : true
// })



curl.invoke(['http://localhost:19999/123' , 'post' , 'aa=33&ddf=zzz'], {
    headers: ['asdf:a' , 'ccc:222'],
    verbose : true
})