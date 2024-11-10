// types/enums.ts - 其他通用枚举
export enum Language {
  EN = 'en',
  ZH = 'zh',
  JA = 'ja',
  KO = 'ko',
  // ... 其他语言
}

export enum FileFormat {
  JSON = 'json',
  YAML = 'yaml',
  CSV = 'csv',
  XLSX = 'xlsx',
}

export enum NotificationType {
  TRANSLATION_NEEDED = 'translation_needed',
  REVIEW_NEEDED = 'review_needed',
  TRANSLATION_APPROVED = 'translation_approved',
  TRANSLATION_REJECTED = 'translation_rejected',
  PROJECT_INVITE = 'project_invite',
}
