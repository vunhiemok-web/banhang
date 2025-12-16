import React, { useState } from 'react';
import { ProductType } from './types';
import { PRODUCTS } from './constants';
import { ShoppingBag, Sparkles, Star, Plus, Minus, X } from 'lucide-react';
import confetti from 'canvas-confetti';

// Simple currency formatter
const formatPrice = (priceHint: string) => {
  return priceHint.replace('k', '.000đ').replace('/', ' / ');
};

const App: React.FC = () => {
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ phone: '', address: '', note: '' });

  // Calculate total items
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));

    // Festive confetti effect
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFE800', '#FF0000', '#FFD700'] // Gold and Red
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  return (
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/red-paper.png')] bg-red-700 font-sans text-yellow-100">
      <div className="fixed inset-0 bg-gradient-to-br from-red-900 via-red-700 to-orange-800 opacity-90 pointer-events-none z-0"></div>

      {/* Minimalist Watermark Decorations - Enhanced Visibility */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

        {/* Banh Chung - Clearer Geometric */}
        <div className="absolute top-24 left-[-10px] md:left-10 opacity-30 transform -rotate-12 text-yellow-300 drop-shadow-lg">
          <svg width="200" height="200" viewBox="0 0 100 100" fill="rgba(253, 224, 71, 0.1)" stroke="currentColor" strokeWidth="2">
            <rect x="10" y="10" width="80" height="80" rx="4" />
            <line x1="10" y1="50" x2="90" y2="50" />
            <line x1="50" y1="10" x2="50" y2="90" />
            <line x1="10" y1="10" x2="90" y2="90" strokeOpacity="0.6" />
            <line x1="90" y1="10" x2="10" y2="90" strokeOpacity="0.6" />
          </svg>
        </div>

        {/* Banh Day - Clearer Geometric */}
        <div className="absolute top-32 right-[-10px] md:right-10 opacity-30 text-yellow-300 drop-shadow-lg">
          <svg width="180" height="180" viewBox="0 0 100 100" fill="rgba(255, 255, 255, 0.1)" stroke="currentColor" strokeWidth="2">
            <circle cx="50" cy="50" r="40" />
            <path d="M50 10 Q90 50 50 90" strokeOpacity="0.5" />
            <path d="M50 10 Q10 50 50 90" strokeOpacity="0.5" />
          </svg>
        </div>

        {/* Horse Spirit - Minimalist Silhouette - More Visible */}
        <div className="absolute bottom-[-20px] left-[-20px] opacity-20 text-yellow-200 transform scale-150 origin-bottom-left">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
            <path d="M30 80 Q25 85 20 80 L20 60 Q20 40 40 30 L45 15 L50 10 Q60 5 70 15 L75 30 Q70 35 60 30 L55 40 Q70 50 70 70 L70 80 Z" />
          </svg>
        </div>

        {/* New Fireworks Decorations */}
        <div className="absolute top-5 left-[20%] opacity-40 text-yellow-400 animate-pulse duration-[2000ms]">
          <svg width="100" height="100" viewBox="0 0 50 50" stroke="currentColor" fill="none" strokeWidth="2">
            <path d="M25 0 L25 50 M0 25 L50 25 M7 7 L43 43 M7 43 L43 7" />
            <circle cx="25" cy="25" r="5" fill="currentColor" />
          </svg>
        </div>

        <div className="absolute top-10 right-[30%] opacity-40 text-orange-300 animate-pulse duration-[3000ms] delay-700">
          <svg width="120" height="120" viewBox="0 0 50 50" stroke="currentColor" fill="none" strokeWidth="2">
            <path d="M25 5 L25 45 M5 25 L45 25 M10 10 L40 40 M10 40 L40 10" />
          </svg>
        </div>

        <div className="absolute bottom-40 right-5 opacity-40 text-yellow-200 animate-ping-slow">
          <Sparkles size={80} strokeWidth={2} />
        </div>
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-red-800/90 backdrop-blur-md border-b border-yellow-500/30 sticky top-0 z-50 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 p-2 rounded-full text-red-700 shadow-md ring-2 ring-yellow-200">
                <ShoppingBag size={24} fill="currentColor" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-yellow-400 tracking-tight uppercase drop-shadow-sm font-serif">Bánh Tráng Tết</h1>
                <p className="text-xs text-yellow-200/80 font-medium">Hương vị tình thân - Đậm đà bản sắc</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 hover:bg-red-700 rounded-full transition-colors group"
            >
              <ShoppingBag size={28} className="text-yellow-400" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-red-800 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-red-800 animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8 flex-grow">

          {/* Campaign Banner */}
          <div className="mb-12 relative group perspective-1000">
            <div className="bg-gradient-to-r from-yellow-600 via-red-600 to-yellow-600 rounded-2xl p-1 shadow-2xl transform transition-transform duration-500 hover:scale-[1.01]">
              <div className="bg-red-800 rounded-xl p-8 text-center border border-yellow-500/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')] opacity-10"></div>
                <div className="absolute -top-10 -left-10 text-yellow-500/10 rotate-12">
                  <Star size={150} fill="currentColor" />
                </div>
                <div className="absolute -bottom-10 -right-10 text-yellow-500/10 -rotate-12">
                  <Star size={150} fill="currentColor" />
                </div>

                <div className="relative z-10">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 text-sm font-bold mb-4 border border-yellow-500/50 uppercase tracking-wider">
                    Chào Xuân 2026
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-sm font-serif">
                    Bán từ thiện, tết ấm no <br className="hidden md:block" /> lòng người ấm áp
                  </h2>
                  <p className="text-yellow-100/90 text-lg max-w-2xl mx-auto italic font-serif">
                    "Mỗi đơn hàng gửi trao là thêm một niềm vui được sẻ chia. Cùng chung tay ủng hộ quỹ Câu Lạc Bộ Kết Nối."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2 border-l-4 border-yellow-500 pl-4">
            <Star className="text-orange-500" fill="currentColor" />
            Ăn ngon, rẻ, từ thiện
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map(product => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-yellow-600/20 group hover:border-yellow-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
                <div className="h-64 overflow-hidden relative bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-medium text-sm flex items-center gap-1">
                      <Sparkles size={14} className="text-yellow-400" />
                      Món ngon ngày Tết
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow bg-[#fffdf5]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-red-800 font-serif leading-tight">{product.name}</h3>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold border border-red-200 whitespace-nowrap">
                      Tet Sale
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 italic">{product.description}</p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-red-100">
                    <span className="text-lg font-bold text-red-600">{product.priceHint}</span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-red-800 font-bold py-2 px-4 rounded-full shadow-md active:transform active:scale-95 transition-all text-sm flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>

        {/* Footer */}
        <footer className="bg-red-900 border-t border-yellow-500/20 py-8 text-center text-yellow-200/60 relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <p>&copy; 2025 Bánh Tráng AI - Tết Từ Thiện. Powered by Gemini.</p>
          </div>
        </footer>

        {/* Cart Sidebar */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
            <div className="bg-[#fffdf5] w-full max-w-md h-full shadow-2xl relative z-10 flex flex-col animate-slideRec">
              <div className="bg-red-800 p-4 text-yellow-100 flex justify-between items-center shadow-md">
                <h2 className="text-xl font-bold font-serif flex items-center gap-2">
                  <ShoppingBag size={20} /> Giỏ Hàng Tết
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="hover:bg-red-700 p-1 rounded transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {Object.keys(cart).length === 0 ? (
                  <div className="text-center text-gray-400 mt-20">
                    <ShoppingBag size={64} className="mx-auto mb-4 opacity-20" />
                    <p>Chưa có món nào trong giỏ.</p>
                    <p className="text-sm">Hãy chọn chút "vị Tết" nhé!</p>
                  </div>
                ) : (
                  Object.keys(cart).map(id => {
                    const product = PRODUCTS.find(p => p.id === id);
                    if (!product) return null;
                    return (
                      <div key={id} className="flex gap-4 p-3 bg-white border border-red-100 rounded-lg shadow-sm">
                        <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
                        <div className="flex-grow">
                          <h4 className="font-bold text-gray-800">{product.name}</h4>
                          <p className="text-red-600 font-medium text-sm">{product.priceHint}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => removeFromCart(id)}
                              className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-bold text-gray-800 w-4 text-center">{cart[id]}</span>
                            <button
                              onClick={() => addToCart(id)}
                              className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-200"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="p-4 border-t border-gray-200 bg-white">
                <button
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:from-red-700 hover:to-orange-700 transition-all uppercase tracking-wide flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  disabled={totalItems === 0}
                >
                  Đặt Hàng Ngay <Sparkles size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCheckoutOpen(false)}></div>
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-zoomIn border-2 border-yellow-500">
              <div className="bg-gradient-to-r from-red-700 to-red-600 p-4 text-white flex justify-between items-center bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]">
                <h3 className="text-xl font-bold font-serif flex items-center gap-2">
                  <Sparkles size={18} className="text-yellow-400" /> Thông tin giao hàng
                </h3>
                <button onClick={() => setIsCheckoutOpen(false)} className="hover:bg-red-500/50 p-1 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (!customerInfo.phone.trim() || !customerInfo.address.trim()) {
                  // Basic client-side validation check (though required attribute handles most)
                  return;
                }

                // Show Success Message and Clear
                alert(`Cảm ơn bạn! Đơn hàng sẽ được giao đến:\n${customerInfo.address}\nSĐT: ${customerInfo.phone}\n\nChúc bạn năm mới An Khang Thịnh Vượng!`);
                setCart({});
                setCustomerInfo({ phone: '', address: '', note: '' });
                setIsCheckoutOpen(false);
                confetti({ particleCount: 300, spread: 120, origin: { y: 0.6 }, colors: ['#FFE800', '#FF0000', '#FFD700'] });
              }} className="p-6 space-y-4 bg-[#fffdf5]">

                <div>
                  <label className="block text-sm font-bold text-red-800 mb-1">Số điện thoại <span className="text-red-600">*</span></label>
                  <input
                    type="tel"
                    required
                    className="w-full p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all bg-white shadow-sm"
                    placeholder="Nhập số điện thoại..."
                    value={customerInfo.phone}
                    onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-red-800 mb-1">Địa chỉ nhận hàng <span className="text-red-600">*</span></label>
                  <textarea
                    required
                    rows={2}
                    className="w-full p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all resize-none bg-white shadow-sm"
                    placeholder="Số nhà, đường, phường/xã..."
                    value={customerInfo.address}
                    onChange={e => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-red-800 mb-1">Ghi chú (Tùy chọn)</label>
                  <textarea
                    rows={2}
                    className="w-full p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all resize-none bg-white shadow-sm"
                    placeholder="Ví dụ: Giao giờ hành chính..."
                    value={customerInfo.note}
                    onChange={e => setCustomerInfo({ ...customerInfo, note: e.target.value })}
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all transform active:scale-95 flex justify-center items-center gap-2"
                  >
                    Xác Nhận Đặt Hàng <Sparkles size={18} className="text-yellow-300" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;