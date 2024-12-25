import { db, pool } from '@/server/src/db'

import { projects, translations } from 'server/src/db/schema'

async function seed() {
  try {
    // 清理现有数据
    await db.delete(translations)
    await db.delete(projects)

    // 创建示例项目
    const [project1] = await db
      .insert(projects)
      .values({
        name: 'Example Website',
        slug: 'example-website',
        description: 'A multi-language website example',
        defaultLocale: 'en',
        supportedLocales: ['en', 'zh', 'ja'],
      })
      .returning()

    const [project2] = await db
      .insert(projects)
      .values({
        name: 'Mobile App',
        slug: 'mobile-app',
        description: 'A mobile application with i18n support',
        defaultLocale: 'en',
        supportedLocales: ['en', 'fr', 'de'],
      })
      .returning()

    // 为 project1 创建翻译
    const project1Translations = [
      // 英文翻译
      {
        projectId: project1.id,
        key: 'common.welcome',
        locale: 'en',
        translation: 'Welcome',
      },
      {
        projectId: project1.id,
        key: 'common.login',
        locale: 'en',
        translation: 'Login',
      },
      // 中文翻译
      {
        projectId: project1.id,
        key: 'common.welcome',
        locale: 'zh',
        translation: '欢迎',
      },
      {
        projectId: project1.id,
        key: 'common.login',
        locale: 'zh',
        translation: '登录',
      },
      // 日文翻译
      {
        projectId: project1.id,
        key: 'common.welcome',
        locale: 'ja',
        translation: 'ようこそ',
      },
      {
        projectId: project1.id,
        key: 'common.login',
        locale: 'ja',
        translation: 'ログイン',
      },
    ]

    // 为 project2 创建翻译
    const project2Translations = [
      // 英文翻译
      {
        projectId: project2.id,
        key: 'app.start',
        locale: 'en',
        translation: 'Get Started',
      },
      {
        projectId: project2.id,
        key: 'app.settings',
        locale: 'en',
        translation: 'Settings',
      },
      // 法语翻译
      {
        projectId: project2.id,
        key: 'app.start',
        locale: 'fr',
        translation: 'Commencer',
      },
      {
        projectId: project2.id,
        key: 'app.settings',
        locale: 'fr',
        translation: 'Paramètres',
      },
      // 德语翻译
      {
        projectId: project2.id,
        key: 'app.start',
        locale: 'de',
        translation: 'Loslegen',
      },
      {
        projectId: project2.id,
        key: 'app.settings',
        locale: 'de',
        translation: 'Einstellungen',
      },
    ]

    await db
      .insert(translations)
      .values([...project1Translations, ...project2Translations])

    console.log('Seed data inserted successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
  } finally {
    await pool.end()
  }
}

seed()
