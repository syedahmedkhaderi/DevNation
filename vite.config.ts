import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const defaultDataPath = path.resolve(__dirname, 'src/data/defaultData.json')
const validSections = ['clubInfo', 'members', 'events', 'projects', 'resources'] as const

type ValidSection = (typeof validSections)[number]

async function readDefaults() {
  const content = await readFile(defaultDataPath, 'utf-8')
  return JSON.parse(content)
}

async function writeDefaults(data: unknown) {
  await writeFile(defaultDataPath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

function jsonBody(req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk: Buffer) => { body += chunk.toString() })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

function createDataRoute() {
  return {
    name: 'vite-plugin-default-data-persistence',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url !== '/api/defaults' || req.method !== 'POST') return next()
        try {
          const body = await jsonBody(req)
          const { section, data } = body
          if (!validSections.includes(section)) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'Invalid section' }))
            return
          }
          const current = await readDefaults()
          current[section] = data
          await writeDefaults(current)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: true }))
        } catch (error) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }))
        }
      })
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url !== '/api/defaults' || req.method !== 'POST') return next()
        try {
          const body = await jsonBody(req)
          const { section, data } = body
          if (!validSections.includes(section)) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'Invalid section' }))
            return
          }
          const current = await readDefaults()
          current[section] = data
          await writeDefaults(current)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: true }))
        } catch (error) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), createDataRoute()],
  server: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: true,
  },
})
