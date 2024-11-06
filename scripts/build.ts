import { execSync } from 'child_process'
import path from 'path'

async function build() {
  try {
    console.log('🚀 Starting build process...')

    // 检查环境变量
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is required')
    }

    const rootDir = process.cwd()
    const serverDir = path.join(rootDir, 'server')
    const clientDir = path.join(rootDir, 'client')

    // 构建服务端
    console.log('🖧 Building server...')
    process.chdir(serverDir)
    execSync('pnpm install', { stdio: 'inherit' })
    execSync('tsc', { stdio: 'inherit' })

    // 构建客户端
    console.log('🖥️ Building client...')
    process.chdir(clientDir)
    execSync('pnpm install', { stdio: 'inherit' })
    execSync('pnpm build', { stdio: 'inherit' }) // Nuxt build

    // 回到根目录
    process.chdir(rootDir)

    console.log('✅ Build complete!')
  } catch (error) {
    console.error('❌ Build failed:', error)
    process.exit(1)
  }
}

build().catch(console.error)
