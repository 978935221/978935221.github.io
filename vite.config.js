import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'
import fs from 'fs'

console.log('-----------' + __dirname + '-----------' + __filename)

export default {
  plugins: [
    createVuePlugin(/* options */)
  ],
  build: {
    outDir: 'docs'
  },
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      styles: path.resolve(__dirname, 'src/styles'),
      plugins: path.resolve(__dirname, 'src/plugins'),
      views: path.resolve(__dirname, 'src/views')
    }
  },
  server: {
    host: '0.0.0.0'
  }
}

// eslint-disable-next-line no-unused-vars
function bindDevServerAfter({ app }) {
  // serve mock data
  app.all('*', function (req, resp, next) {
    let pathname = req.path
    if (pathname.endsWith('/')) {
      pathname = pathname.substring(0, pathname.length - 1)
    }
    const realpathname = path.join(__dirname, './.data', pathname)
    const dirname = path.dirname(realpathname)
    const filename = path.basename(realpathname) + '.json'
    console.log(dirname, filename)
    // const localpath = [
    //   realpathname,
    //   dirname + '/' + req.method.toLowerCase() + '-' + filename,
    //   dirname + '/' + filename
    // ].filter(function (pathstr) {
    //   return fs.existsSync(pathstr) && fs.lstatSync(pathstr).isFile()
    // })[0]
    // if (localpath) {
    //   smartResponse(req, resp, localpath)
    // } else {
    next()
    // }
  })
}

function smartResponse(req, resp, file) {
  const directives = []
  let pos1 = 0; let pos2 = 0; let line
  const regexp = /^\s*\/\//
  const text = fs.readFileSync(file, 'utf-8')
  while (pos2 < text.length) {
    pos2 = text.indexOf('\n', pos1)
    line = text.substring(pos1, pos2)
    if (regexp.test(line)) {
      directives.push(line.substring(2))
      pos1 = pos2 + 1
    } else {
      break
    }
  }
  const actions = directives.reduce(function (actions, text) {
    const pos = text.indexOf(':')
    const key = text.substring(0, pos).trim()
    let value = text.substring(pos + 1).trim()
    try {
      value = JSON.parse(value)
    } catch (e) {
      // ignore
    }
    actions[key] = value
    return actions
  }, { code: 200, delay: false, stop: false, error: false })
  let jsonData
  try {
    jsonData = JSON.parse(text.substring(pos1))
  } catch (e) {
    actions.code = 500
    actions.error = 'parse json file ' + file + ' error: ' + e.message
  }
  const doResponse = function () {
    if (actions.stop) {
      return resp.socket.destroy()
    }
    resp.status(actions.code)
    if (actions.error) {
      resp.end(actions.error)
    } else {
      resp.set('Content-Type', 'application/json')
      resp.json(Mock.mock(jsonData))
    }
  }
  setTimeout(doResponse, actions.delay || 0)
}
