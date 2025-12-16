export enum ProductType {
  TAC = 'Bánh tráng tắc',
  DEO_SOI = 'Bánh tráng dẻo sợi',
  CHAM = 'Bánh tráng chấm',
  TUOI_THO = 'Set đồ ăn tuổi thơ',
  RAU_CAU_DUA = 'Rau câu dừa'
}

export enum ToneType {
  FUNNY = 'Hài hước, Gen Z',
  PROFESSIONAL = 'Chuyên nghiệp, Uy tín',
  URGENT = 'Sale gấp, Khuyến mãi',
  EMOTIONAL = 'Tâm tình, Kể chuyện',
  FOODIE = 'Review đồ ăn, Gợi cảm giác thèm'
}

export enum PlatformType {
  FACEBOOK = 'Facebook (Bài đăng dài, chi tiết)',
  TIKTOK = 'TikTok (Ngắn gọn, nhiều hashtag)',
  INSTAGRAM = 'Instagram (Thơ mộng, tập trung visual)',
  ZALO = 'Zalo (Thân thiện, chốt đơn nhanh)'
}

export interface Product {
  id: string;
  name: ProductType;
  description: string;
  imageUrl: string;
  priceHint?: string;
}

export interface GenerationOptions {
  tone: ToneType;
  platform: PlatformType;
  customOffer?: string; // e.g., "Freeship cho đơn từ 100k"
}

export interface GeneratedContent {
  content: string;
  timestamp: number;
  products: ProductType[];
}