/* eslint-disable perfectionist/sort-imports */
/* eslint-disable no-console */
const fs = require('node:fs')
const path = require('node:path')
const { resolve, join } = require('node:path')
const process = require('node:process')

const cors = require('cors')
const express = require('express')
const httpProxy = require('http-proxy')
const YAML = require('yaml')

const app = express()
const proxy = httpProxy.createProxyServer({})

app.use(cors({
  origin: '*',
}))

const config = (() => {
  const configPath = process.env.UNIVER_CONFIG_DIR || resolve(process.cwd(), 'configs')
  if (fs.existsSync(resolve(configPath, 'demo-ui.yaml'))) {
    const config = YAML.parse(fs.readFileSync(resolve(configPath, 'demo-ui.yaml'), 'utf8'))
    return config
  }
  else {
    console.info('\x1B[36m%s\x1B[0m', `Info: No demo-ui.yaml found in the ${configPath}, using default settings`)
    return {}
  }
})()

// 添加一个全局变量来存储替换后的文件内容
const replacedFiles = new Map()

function prepareReplacedFiles() {
  const staticDir = path.join(__dirname, './site-static')
  let licenseContent = ''
  const licenseFilePath = config?.license || process.env.LICENSE_PATH || (process.pkg ? resolve(process.cwd(), 'configs/license.txt') : '/data/configs/license.txt')
  try {
    licenseContent = fs.readFileSync(licenseFilePath, 'utf8')
  }
  catch {
    console.warn('\x1B[33m%s\x1B[0m', `Warning: Unable to read license.txt. Work on Free Mode, if you want to use the Business Mode, you can get a 30-day free trial license from https://univer.ai/license`)
  }

  const filesToReplace = ['main.js', 'worker.js']
  filesToReplace.forEach((file) => {
    const filePath = join(staticDir, file)
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8')
      content = content.replace(/%%UNIVER_CLIENT_LICENSE_PLACEHOLDER%%/g, licenseContent)
      replacedFiles.set(file, content)
    }
  })
}

// 替换原来的createSiteStatic调用
prepareReplacedFiles()

// 添加中间件来处理文件请求
function handleReplacedFiles(req, res, next) {
  const fileName = req.path.split('/').pop()
  if (replacedFiles.has(fileName)) {
    res.type('application/javascript')
    return res.send(replacedFiles.get(fileName))
  }
  next()
}

// 在静态文件中间件之前添加处理
app.use(handleReplacedFiles)
app.use(express.static(resolve(__dirname, './site-static')))
app.use('/sheet', handleReplacedFiles)
app.use('/sheet', express.static(resolve(__dirname, './site-static')))
app.use('/pro-demo/sheet', handleReplacedFiles)
app.use('/pro-demo/sheet', express.static(resolve(__dirname, './site-static')))

proxy.on('error', (error, req, res) => {
  console.error('proxy error:', error)
  if (!res.headersSent) {
    res.status(500).send('proxy error')
  }
})
app.all('/universer-api/*', (req, res) => {
  proxy.web(req, res, {
    target: config?.universerEndpoint || process.env.UNIVERSER_ENDPOINT || 'http://universer:8000',
    changeOrigin: true,
    secure: false,
  })
})

let host = '0.0.0.0'
let port = 3010
if (config?.service) {
  const hostAndPort = config.service.split(':')
  if (hostAndPort.length === 2) {
    host = hostAndPort[0]
    port = hostAndPort[1]
  }
  else {
    port = config.service
  }
}
else if (process.env.CLIENT_PORT) {
  port = process.env.CLIENT_PORT
}

const server = app.listen(port, host, () => {
  console.log('\x1B[36m%s\x1B[0m', `Univer Demo UI running on http://${server.address().address}:${server.address().port}`)
  console.log('\x1B[36m%s\x1B[0m', 'Get the Demo UI Source Code: https://github.com/dream-num/univer-pro-sheet-start-kit')
  console.log('\x1B[32m%s\x1B[0m', 'If you want to integrate the Univer frontend SDK, please read: https://docs.univer.ai/guides/sheets')
  console.log('\x1B[35m%s\x1B[0m', 'For more information about the Univer server, please read: https://docs.univer.ai/guides/sheets/pro-features/server/overview)')
})

server.on('upgrade', (req, socket, head) => {
  const proxy = httpProxy.createProxyServer({
    target: config?.universerEndpoint || process.env.UNIVERSER_ENDPOINT || 'http://universer:8000',
    changeOrigin: true,
    secure: false,
    ws: true,
  })
  proxy.ws(req, socket, head)
})
