const fs = require('fs')
const getSqlMap = require('./get-sql-map')

let sqlContentMap = {}

/**
 * 
 * @param {string} fileName 文件名称
 * @param {string} path 文件所在的路径
 */
function getSqlContent(fileName, path) {
    let content = fs.readFileSync(path, 'binary')
    sqlContentMap[fileName] = content
}

function getSqlContentMap() {
    let sqlMap = getSqlMap()
    for (let key in sqlMap) {
        getSqlContent(key, sqlMap[key])
    }
    return sqlContentMap
}

module.exports = getSqlContentMap