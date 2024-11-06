import { db, pool } from '../server/src/db'
import { projects, translations } from '../server/src/db/schema'

async function seed() {
  try {
    console.log('🌱 Starting database seeding...')

    // 清理现有数据
    await db.delete(translations)
    await db.delete(projects)

    // 创建示例项目
    const [project1] = await db
      .insert(projects)
      .values({
        name: 'Example Project',
        slug: 'example-project',
        description: 'A demo project with multiple languages',
        defaultLocale: 'en',
        supportedLocales: ['en', 'zh', 'ja'],
      })
      .returning()

    // 准备一些示例翻译数据
    const translationItems = [
      {
        projectId: project1.id,
        key: 'common.welcome',
        namespace: 'common',
        translations: {
          en: {
            value: 'Welcome',
            status: 'manual',
            lastModified: new Date().toISOString(),
            modifiedBy: 'seed-script',
          },
          zh: {
            value: '欢迎',
            status: 'manual',
            lastModified: new Date().toISOString(),
            modifiedBy: 'seed-script',
          },
          ja: {
            value: 'ようこそ',
            status: 'manual',
            lastModified: new Date().toISOString(),
            modifiedBy: 'seed-script',
          },
        },
      },
      {
        projectId: project1.id,
        key: 'common.login',
        namespace: 'common',
        translations: {
          en: {
            value: 'Login',
            status: 'manual',
            lastModified: new Date().toISOString(),
            modifiedBy: 'seed-script',
          },
          zh: {
            value: '登录',
            status: 'manual',
            lastModified: new Date().toISOString(),
            modifiedBy: 'seed-script',
          },
          ja: {
            value: 'ログイン',
            status: 'manual',
            lastModified: new Date().toISOString(),
            modifiedBy: 'seed-script',
          },
        },
      },
      {
        projectId: project1.id,
        key: 'common.logout',
        namespace: 'common',
        translations: {
          en: {
            value: 'Logout',
            status: 'manual',
            lastModified: new Date().toISOString(),
            modifiedBy: 'seed-script',
          },
          zh: {
            value: '退出登录',
            status: 'manual',
            lastModified: new Date().toISOString(),
            modifiedBy: 'seed-script',
          },
          ja: {
            value: 'ログアウト',
            status: 'auto',
            lastModified: new Date().toISOString(),
          },
        },
      },
      {
        projectId: project1.id,
        key: 'errors.required',
        namespace: 'errors',
        translations: {
          en: {
            value: 'This field is required',
            status: 'manual',
            lastModified: new Date().toISOString(),
            modifiedBy: 'seed-script',
          },
          zh: {
            value: '此字段必填',
            status: 'manual',
            lastModified: new Date().toISOString(),
            modifiedBy: 'seed-script',
          },
          ja: {
            value: '',
            status: 'pending',
            lastModified: new Date().toISOString(),
          },
        },
      },
    ]

    // 插入翻译数据
    await db.insert(translations).values(translationItems)

    // 创建另一个项目示例（只支持两种语言的项目）
    const [project2] = await db
      .insert(projects)
      .values({
        name: 'Simple Project',
        slug: 'simple-project',
        description: 'A simple project with fewer languages',
        defaultLocale: 'en',
        supportedLocales: ['en', 'zh'],
      })
      .returning()

    // 为第二个项目添加一些翻译
    const project2Translations = [
      {
        projectId: project2.id,
        key: 'buttons.submit',
        namespace: 'buttons',
        translations: {
          en: {
            value: 'Submit',
            status: 'manual',
            lastModified: new Date().toISOString(),
            modifiedBy: 'seed-script',
          },
          zh: {
            value: '提交',
            status: 'manual',
            lastModified: new Date().toISOString(),
            modifiedBy: 'seed-script',
          },
        },
      },
      {
        projectId: project2.id,
        key: 'buttons.cancel',
        namespace: 'buttons',
        translations: {
          en: {
            value: 'Cancel',
            status: 'manual',
            lastModified: new Date().toISOString(),
            modifiedBy: 'seed-script',
          },
          zh: {
            value: '取消',
            status: 'manual',
            lastModified: new Date().toISOString(),
            modifiedBy: 'seed-script',
          },
        },
      },
    ]

    await db.insert(translations).values(project2Translations)

    console.log('✅ Seeding complete!')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  } finally {
    await pool.end()
  }
}

seed().catch((error) => {
  console.error('Failed to seed:', error)
  process.exit(1)
})
