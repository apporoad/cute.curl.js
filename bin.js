#! /usr/bin/env node

const path = require('path')
const fs = require('fs')
const program = require('commander')
var curl = require('./index')
const clipboardy = require('clipboardy');


program.version(require('./package.json').version)
    .usage(' [url] [method] [dataOrFilePath] [keyword]  [encoding]  顺序没有关系'
        + '\r\n http://localhost:19999/abc  post  1.txt ansi '
        + '\r\n put http://localhost:19999/abc   "1.txt" ansi '
        + '\r\n  {a:1,b:"ccc"}  put http://localhost:19999/abc   -h abc:aaa -h ccc:aaa '
    )
    .option('-H --header [headers...]','http head')
    .option('-e --encoding [encoding]' , ' encoding of your file ,default is utf8')
    .option('-o --output [file]', '输出文件')
    .option('-v --verbose' , '打印多余内容')
    .option('-x --ext [ext]', '扩展方法，支持js方式扩展')
    .option('-c --clipboard' , '抓取剪切板的内容')
    .option('-i --split [split]' , '抓取剪切板内容时，分隔用的符号，默认@@')
    .option('-u --pure','禁止自动抓取剪切板内容')
    .parse(process.argv)

const optionsOut = program.opts();
optionsOut.split = optionsOut.split || '@@'
//添加剪切板内容
var argArray = []
if(!optionsOut.pure){
    var clip = clipboardy.readSync().trim()
    if(clip){
        //cute 开头，代表是cute内容
        if(clip.indexOf('cute ') == 0){
            // clip = clip.substring(5).trim()
            optionsOut.clipboard = true
        }
        if(optionsOut.clipboard){
            //去除cute这种特殊内容
            if(clip.indexOf('cute ') == 0){
                clip = clip.substring(5).trim()
            }
            if(clip){
                //分隔
                if(clip.indexOf(optionsOut.split)){
                    argArray = argArray.concat(clip.split(optionsOut.split))
                }else{
                    argArray.push(clip)
                }
            }
        }
    }
}
argArray = argArray.concat(program.args)

if(argArray.length>0){
    var options = {}
    options.verbose = optionsOut.verbose
    options.headers = optionsOut.header
    options.encoding = optionsOut.encoding || 'utf8'
    options.output = optionsOut.output || null
    options.ext = optionsOut.ext || null
    options.clipboard = optionsOut.clipboard
    options.split = optionsOut.split
    
    // console.log(JSON.stringify(options))
    // console.log(JSON.stringify(program.args))
    curl.invoke(argArray, options)
}
