/* eslint-disable no-console */
const fs = require('node:fs')
const { resolve, join } = require('node:path')
const process = require('node:process')

const cors = require('cors')
const express = require('express')
const httpProxy = require('http-proxy')

const app = express()
const proxy = httpProxy.createProxyServer({})

app.use(cors({
  origin: '*',
}))

function createSiteStatic() {
  const sourceDir = resolve(__dirname, './dist')
  const targetDir = resolve(__dirname, './site-static')

  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true })
  }

  fs.cpSync(sourceDir, targetDir, { recursive: true })

  let licenseContent = ''
  const licenseFilePath = '/data/configs/license.txt'
  try {
    licenseContent = fs.readFileSync(licenseFilePath, 'utf8')
  }
  catch {
    console.warn('\x1B[33m%s\x1B[0m', `Warning: Unable to read ${licenseFilePath}. Work on Free Mode, if you want to use the Business Mode, you can get a 30-day free trial license from https://univer.ai/pro/license`)
  }

  const filesToReplace = ['main.js']
  filesToReplace.forEach((file) => {
    const filePath = join(targetDir, file)
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8')
      content = content.replace(/%%UNIVER_CLIENT_LICENSE_PLACEHOLDER%%/g, licenseContent)
      fs.writeFileSync(filePath, content, 'utf8')
    }
  })
}

createSiteStatic()

app.use(express.static(resolve(__dirname, './site-static')))

proxy.on('error', (error, req, res) => {
  console.error('proxy error:', error)
  if (!res.headersSent) {
    res.status(500).send('proxy error')
  }
})
app.all('/universer-api/*', (req, res) => {
  proxy.web(req, res, {
    target: process.env.UNIVERSER_ENDPOINT || 'http://universer:8000',
    changeOrigin: true,
    secure: false,
  })
})

const server = app.listen(process.env.CLIENT_PORT || 3010, () => {
  console.log('\x1B[36m%s\x1B[0m', `Univer Demo UI running on http://localhost:${server.address().port}`)
  console.log('\x1B[36m%s\x1B[0m', 'Get the Demo UI Source Code: https://github.com/dream-num/univer-pro-sheet-start-kit')
  console.log('\x1B[32m%s\x1B[0m', 'If you want to integrate the Univer frontend SDK, please read: https://univer.ai/guides/sheet/getting-started/quickstart')
  console.log('\x1B[35m%s\x1B[0m', 'For more information about the Univer server, please read: https://univer.ai/guides/sheet/server/docker')
})

server.on('upgrade', (req, socket, head) => {
  const proxy = httpProxy.createProxyServer({
    target: process.env.UNIVERSER_ENDPOINT || 'http://universer:8000',
    changeOrigin: true,
    secure: false,
    ws: true,
  })
  proxy.ws(req, socket, head)
})
