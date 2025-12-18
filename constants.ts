import { Product, ProductType } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: ProductType.TAC,
    description: 'Vị chua thanh của tắc tươi, kết hợp muối tôm tây ninh.',
    detailDescription: 'Bánh tráng tắc - Sự kết hợp hoàn hảo giữa vị chua thanh mát của tắc tươi (quất) và vị mặn cay đặc trưng của muối tôm Tây Ninh. Bánh tráng phơi sương dẻo mềm, thấm đẫm sốt tắc chua chua, kích thích vị giác cực mạnh. Món ăn vặt "quốc dân" không thể thiếu trong ngày Tết!',
    imageUrl: '/images/banh_trang_tac.png',
    priceHint: '5k/bịch'
  },
  {
    id: 'p2',
    name: ProductType.DEO_SOI,
    description: 'Bánh tráng dẻo thơm ngon, sợi dai vừa miệng, ăn là ghiền.',
    detailDescription: 'Bánh tráng dẻo sợi siêu dai, được cắt sợi vừa miệng. Trộn đều với sa tế cay nồng, hành phi giòn rụm và tỏi phi thơm lừng. Vị cay cay, mặn mặn, dẻo dai hòa quyện tạo nên hương vị khó quên. Một khi đã ăn là không thể dừng lại!',
    imageUrl: '/images/banh_trang_deo_soi.png',
    priceHint: '7k/bịch'
  },
  {
    id: 'p3',
    name: ProductType.CHAM,
    description: 'Nước chấm thần thánh, chua cay mặn ngọt đủ vị.',
    detailDescription: 'Bánh tráng chấm trứ danh với loại nước sốt "thần thánh" độc quyền. Nước sốt sền sệt, chua chua của tắc, cay xè của ớt tươi, đậm đà vị muối tôm, chấm miếng bánh tráng trắng dẻo vào là "nhức nách". Đảm bảo gây nghiện ngay từ miếng đầu tiên.',
    imageUrl: '/images/banh_trang_cham.png',
    priceHint: '10k/phần'
  },
  {
    id: 'p4',
    name: ProductType.TUOI_THO,
    description: 'Combo snack tuổi thơ, giòn rụm, nhắc nhớ kỷ niệm xưa.',
    detailDescription: 'Vé khứ hồi về tuổi thơ với Set Đồ Ăn Tuổi Thơ. Bao gồm những món snack huyền thoại: bánh tai heo giòn tan, bánh gấu nhân kem ngọt ngào, kẹo C chua ngọt... Một món quà ý nghĩa để cùng bạn bè ôn lại kỷ niệm xưa trong dịp Tết này.',
    imageUrl: '/images/set_do_an_tuoi_tho.png',
    priceHint: '12k/set'
  },
  {
    id: 'p5',
    name: ProductType.RAU_CAU_DUA,
    description: 'Rau câu dừa thanh mát, ngọt dịu, giải nhiệt cực đã.',
    detailDescription: 'Rau câu dừa tươi mát lạnh, giải nhiệt ngày Tết. Lớp rau câu giòn sần sật, vị ngọt thanh từ nước dừa tươi nguyên chất, thơm béo cốt dừa. Là món tráng miệng tuyệt vời sau những bữa tiệc nhiều dầu mỡ, giúp thanh lọc cơ thể.',
    imageUrl: '/images/rau_cau_dua.png',
    priceHint: '8k/ly'
  }
];

export const SAMPLE_PROMPTS = [
  "Mua 5 tặng 1 nha cả nhà ơi!",
  "Freeship bán kính 3km",
  "Đảm bảo vệ sinh an toàn thực phẩm",
  "Hàng mới về nóng hổi luôn"
];