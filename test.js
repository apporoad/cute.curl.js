var curl = require('./index')


curl.invoke(['http://localhost:19999/abc11' , 'post' , '{ abccc:1}'], {
    headers: {
        abc : '111'
    },
    verbose : true
})