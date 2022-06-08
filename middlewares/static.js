const express = require('express')
const path = require('path')

module.exports = function (dir) {
   const staticPath = path.resolve(dir)
   return express.static(staticPath)
}
