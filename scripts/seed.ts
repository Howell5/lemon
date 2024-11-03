import { db } from '../server/src/db'
import { projects, translations } from '../server/src/db/schema'

async function seed() {
  console.log('Seeding database...')

  // 插入测试项目
  const [project] = await db
    .insert(projects)
    .values({
      name: 'Test Project',
      defaultLocale: 'en',
      supportedLocales: ['en', 'zh', 'ja'],
    })
    .returning()

  // 插入测试翻译
  await db.insert(translations).values([
    {
      projectId: project.id,
      key: 'common.welcome',
      translations: {
        en: 'Welcome',
        zh: '欢迎',
        ja: 'ようこそ',
      },
    },
    // 添加更多测试数据...
  ])

  console.log('Seeding complete!')
}

seed().catch(console.error)
