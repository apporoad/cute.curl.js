
var req  = require('mini.req.js')

/**
 * 处理头
 * @param {*} headers 
 * @returns 
 */
var resolveHeaders = function(headers){
    if(!headers){
        return null
    }
    if(typeof headers == 'string'){

    }
    return headers
}

exports.invoke = function(cmds , options){
    options = options || {}

    options.output = options.output || null
    options.headers = resolveHeaders(options.headers)
    options.verbose = options.verbose  || false

    var url = null
    var method = 'get'
    var data = null

    var iOptions = {
        slient : false
    }
    cmds.forEach(oneStr => {
        //先判断是否是方法
        switch(oneStr.toLowerCase()){
            case 'slient':
            case 's':
                iOptions.slient = true
                break
            case 'get':
            case 'post':
            case 'delete':
            case 'put':
                method = oneStr.toLowerCase()
                break
            case 'del':
                method = 'delete'
                break
            default:
                var lowerCase = oneStr.toLowerCase()
                //是否是url  "http://"  http:
                if(lowerCase.indexOf('http') >-1 && lowerCase.indexOf('http') < 2 && lowerCase.indexOf(':') > -1){
                    url = oneStr
                }else{
                    //剩余的就是数据
                    data = oneStr
                }
                break
        }
    });

    if(!url){
        console.error('you must give a : url')
        return
    }


}