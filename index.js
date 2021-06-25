
var req  = require('mini.req.js')
var qs = require('querystring')
var hparse = require('parse-headers')

function powerParse(str){
    try{
        return JSON.parse(str)
    }catch{
        var value = null
        eval('value = ' + str)
        return value
    }
}

function isJson(obj){
	var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; 
	return isjson;
}

function resolveMsg(msg){
    return isJson(msg) ? JSON.stringify(msg) : msg
}
/**
 * 处理头
 * @param {*} headers 
 * @returns 
 */
var resolveHeaders = function(headers){
    if(!headers){
        return null
    }
    if(headers.length > 0){
        // var harray = headers.split(/[;,&]/g)
        return hparse(headers.join('\n'))
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

                    if(data){
                        // form json 判断
                        if(data.indexOf('{') == 0){
                            data = powerParse(data)
                        }else{
                            data = qs.parse(data)
                            options.type = 'form'
                        }
                    }
                    
                }
                break
        }
    });

    if(!url){
        console.error('you must give a : url')
        return
    }

    if(options.verbose){
        console.log('url : ' + url)
        console.log('method : ' + method.toUpperCase())
        console.log('data : ' + resolveMsg(data))
    }

    req(url, method, data ,options).then(function(data){

        if(options.slient){
            if(options.verbose){
                console.log('response : ' + resolveMsg(data))
            }
    
        }else{
            if(options.output){
                //todo
            }else{
                console.log('response : ' + resolveMsg(data))
            }
        }

        
    }).catch(err =>{
        if(!options.slient){
            console.error(resolveMsg(err))
        }else{
            if(options.verbose){
                console.error(resolveMsg(err))
            }
        }
    })
}