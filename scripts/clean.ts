import fs from 'fs/promises'
import path from 'path'

async function clean() {
  const dirsToRemove = [
    // 客户端构建产物
    'client/.nuxt',
    'client/.output',
    'client/node_modules',
    // 服务端构建产物
    'server/dist',
    'server/node_modules',
    // 根目录
    'node_modules',
  ]

  console.log('🧹 Cleaning project...')

  for (const dir of dirsToRemove) {
    const dirPath = path.join(process.cwd(), dir)
    try {
      await fs.rm(dirPath, { recursive: true, force: true })
      console.log(`✓ Removed ${dir}`)
    } catch (err) {
      console.log(`× Skip ${dir}`)
    }
  }

  console.log('✨ Clean complete!')
}

clean().catch(console.error)
