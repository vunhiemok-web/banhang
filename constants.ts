import { Product, ProductType } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: ProductType.TAC,
    description: 'Vị chua thanh của tắc tươi, kết hợp muối tôm tây ninh.',
    imageUrl: '/images/banh_trang_tac.png', // Generated asset
    priceHint: '5k/bịch'
  },
  {
    id: 'p2',
    name: ProductType.DEO_SOI,
    description: 'Bánh tráng dẻo thơm ngon, sợi dai vừa miệng, ăn là ghiền.',
    imageUrl: '/images/banh_trang_deo_soi.png', // Generated asset
    priceHint: '7k/bịch'
  },
  {
    id: 'p3',
    name: ProductType.CHAM,
    description: 'Nước chấm thần thánh, chua cay mặn ngọt đủ vị.',
    imageUrl: '/images/banh_trang_cham.png', // Generated asset
    priceHint: '10k/phần'
  },
  {
    id: 'p4',
    name: ProductType.TUOI_THO,
    description: 'Combo snack tuổi thơ, giòn rụm, nhắc nhớ kỷ niệm xưa.',
    imageUrl: '/images/set_do_an_tuoi_tho.png', // Generated asset
    priceHint: '12k/set'
  },
  {
    id: 'p5',
    name: ProductType.RAU_CAU_DUA,
    description: 'Rau câu dừa thanh mát, ngọt dịu, giải nhiệt cực đã.',
    imageUrl: '/images/rau_cau_dua.png', // Generated asset
    priceHint: '8k/ly'
  }
];

export const SAMPLE_PROMPTS = [
  "Mua 5 tặng 1 nha cả nhà ơi!",
  "Freeship bán kính 3km",
  "Đảm bảo vệ sinh an toàn thực phẩm",
  "Hàng mới về nóng hổi luôn"
];