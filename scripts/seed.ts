import { db } from '../server/src/db'
import { projects, translations } from '../server/src/db/schema'

async function seed() {
  // 插入项目数据
  await db.insert(projects).values([
    {
      name: 'Project A',
      slug: 'project-a',
      description: 'Description for Project A',
      defaultLocale: 'en',
      supportedLocales: ['en', 'zh'],
    },
    {
      name: 'Project B',
      slug: 'project-b',
      description: 'Description for Project B',
      defaultLocale: 'zh',
      supportedLocales: ['zh', 'en'],
    },
  ])

  // 插入翻译数据
  await db.insert(translations).values([
    {
      projectId: 1,
      key: 'greeting',
      locale: 'en',
      translation: 'Hello',
    },
    {
      projectId: 1,
      key: 'greeting',
      locale: 'zh',
      translation: '你好',
    },
  ])

  console.log('Seeding completed.')
}

seed().catch((err) => {
  console.error('Seeding failed:', err)
})
