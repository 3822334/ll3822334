/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  LayoutGrid, 
  ShoppingCart, 
  ChevronRight, 
  ChevronLeft, 
  MoreHorizontal, 
  Plus, 
  Minus,
  Share2,
  ShieldCheck,
  Truck,
  Store,
  MessageCircle,
  Heart,
  Settings,
  Package,
  Headphones
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  details?: string;
  detailImages?: string[];
}

interface CartItem extends Product {
  quantity: number;
}

interface UserInfo {
  name: string;
  avatar: string;
  bio: string;
  phone: string;
  wechat: string;
}

// --- Mock Data ---

const USER_INFO: UserInfo = {
  name: "半山半海 | 腕间",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZWRygLMOznZ3xyrRFJt4Pymc6_xciPRE3j7j5W6HPqNm__seTtavYZNaffEYrfRV0FF1vR3W7BS9IsPm8_GCf9JNKaE2Gs_GxdgGp0PyBH5HD2GgzXd4dDBmpLrih6GYdYx4qokHoizO7lufa6FXtLqJdg2UZ-cwrXQWn-kIrFhsAeFjZ0LvCocypcO_CdcHOP6U-Bnw4P1t2R9A3yEejr2aLmCHW8eS4h6sbzQqhUMN7_ivAnLpARmbMoKG1Org3Ver2QtV5HgI",
  bio: "在我们不在见面的岁月里 你平安喜乐就行",
  phone: "15067840817",
  wechat: "CHINA313ZJM"
};

const CATEGORIES = [
  "人间浪漫",
  "枯木逢春",
  "暮色星河",
  "清欢几何",
  "云边小铺"
];

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '清墨',
    description: '水墨丹青 简约不凡',
    price: 40,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1sWsi4Kb_0r7SRgTTQ-ME0LWpFwRqgrt_NrLCS_xZ8W4sDZbIasFS7bt7kIDmNqgyyuOrfO-at3se44wNEUCxy7mWXbVJXeMSTGLCJmsdzj7KrsqCQCPCDYIFuT6yx3rm6qbHgF76JlpbFHE3i-YXn8s1QYj3ml3K1s1UH2CBcNk_SUhp0703IPwmkiwFrvfnMOzTrULUuM3g2LGHl64bO7FKXjHE4nG_nPDgWrrsXUrViuoNlUgo7bpBolgPRWGtBxKt6ZX8qRc',
    category: '人间浪漫'
  },
  {
    id: '2',
    name: '有钱花',
    description: '寓意吉祥 纯手工打造',
    price: 58,
    originalPrice: 128,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS-fyyDC3n0Jiny1Z_tNCdoV28188Z2mW5_rpOpuO2vkVMxwQGG1_agH9ZoTL7x1npuBImhs3tkVnA__SoCVLgMASuhwBQeFDYTfMZCPKlrGDtFbmyFg69kLHyOUfxjy_mN0u7Hr0Wiem-OtrtrSa9NVxOAAGF_J1RqbagNxlaMnZrrj11XVadjtFyO2msz_OUstiN4r9GUMy2YmjIaoEUmsQtpI_MXjvGsDFlgYUtyO0byJYajEgBrocH8bONAx3zdXCqVlCT1dA',
    category: '人间浪漫',
    details: '这款“有钱花”红绳手链由纯手工编织而成，选用优质锦纶丝线，亲肤舒适，久戴不褪色。中间点缀精致的18K金箔镂空花朵，寓意生活灿烂，财源不断。',
    detailImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB67SBOOizPcZUyUJqr823r4lnOUwhqT_smgss_Pl_LvAZK3HJyyvlOxh7IZLDu1HaOd0ID4lW-vdGJLsibIiIFpoz1o_ZRVD3SdstMZlJU6Z30DsbO0MGdU6v7BbCIqTGb-V6dgINQuaT6d3krSMs7zkrLGZL9tjrn6KnTkXdX3tQScuEaQYGVF2OA7YhYCattwNxf_wmpLg-NsSzecWgH-loDeXEwMYjC7r4pPuXNI2pOCgBSg0iRnyHjsamV7WbxdWghNxQ-WP0',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCgraVhWzeUt_5jS5i_amu13WYwV3MMPK_iZRY7MFFvtudD4-6YOvoRan5WwDLhY_PhF-uMaIuSu9HG1lOcqdZcx-l0REvUy4mRE9AmKFErJmjsyGeb77X0sUE8A1-oBNw5lPcRgVfMLI4O7JDKI-GIj0UWTT2PkK7AJV0jVw5xTqFqGBEPsWfRFsQfiM8m_zJeZHYZbq0oTLIcDLsEfwQO-Re5kIOxtttcV85xp4EBlwVQKmUu2ujcIgjig3F-YTGAiNRyFa6o75I'
    ]
  },
  {
    id: '3',
    name: '宣纸扇',
    description: '晨雾漫漫 雅致生活',
    price: 58,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbJg6RlSrpinhMhGPPsbgUDCUmMTbn6dZAyXa78XuyZvwAqUCZMRThjRnHl6e4Jdm9NTiwG78Qp0Lc0emA0gpFjvvxXhE8txhMA_RRFWqmFBzcBTFNTomtnV4Rz3KnPXNPQUx44vAfZHXbvYn0VJgRHd_nMeSNp9dqNjfp0jUF2IOfg_ZJluaFzPvi_Kft6AJkSiSVq2qLA1pKHuMt9BLbLbQoRl4OBmZcfgzL0CF6plhsXipe-vQIjuRoX9iwioWc1680caEY2Gc',
    category: '枯木逢春'
  },
  {
    id: '4',
    name: '单肩包',
    description: '灵隐祈福 随身而行',
    price: 88,
    image: 'https://picsum.photos/seed/bag/400/400',
    category: '枯木逢春'
  },
  {
    id: '5',
    name: '财神爷',
    description: '招财进宝 好运连连',
    price: 88,
    image: 'https://picsum.photos/seed/god/400/400',
    category: '枯木逢春'
  },
  {
    id: '6',
    name: '如意如意 随我心意',
    description: '万事如意 心想事成',
    price: 68,
    image: 'https://picsum.photos/seed/ruyi/400/400',
    category: '枯木逢春'
  }
];

// --- Components ---

const ProductCard: React.FC<{ product: Product, onAdd: (p: Product) => void, onClick: (p: Product) => void }> = ({ product, onAdd, onClick }) => {
  return (
    <div className="flex gap-4 items-start cursor-pointer" onClick={() => onClick(product)}>
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#ec4d13]/10">
        <img 
          className="h-full w-full object-cover" 
          src={product.image} 
          alt={product.name}
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between h-24 py-1">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{product.name}</h4>
          <p className="text-xs text-slate-500 line-clamp-1">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#ec4d13]">¥{product.price.toFixed(2)}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAdd(product);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ec4d13] text-white shadow-lg shadow-[#ec4d13]/20 active:scale-90 transition-transform"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ShopView: React.FC<{ 
  onProductClick: (p: Product) => void, 
  onAddToCart: (p: Product) => void,
  onShowContact: () => void,
  onShowPayment: () => void,
  onCheckout: () => void,
  onShowMiniCart: () => void,
  cartCount: number,
  totalPrice: number
}> = ({ onProductClick, onAddToCart, onShowContact, onShowPayment, onCheckout, onShowMiniCart, cartCount, totalPrice }) => {
  const [activeCategory, setActiveCategory] = React.useState(CATEGORIES[0]);
  const [activeTab, setActiveTab] = React.useState('order'); // 'dynamic' or 'order'
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const categoryRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});
  const sidebarRefs = React.useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const containerTop = scrollRef.current.getBoundingClientRect().top;
    let currentCategory = activeCategory;

    // Find the category that is currently most visible at the top
    for (const cat of CATEGORIES) {
      const ref = categoryRefs.current[cat];
      if (ref) {
        const rect = ref.getBoundingClientRect();
        // If the section top is near the container top, or the section is currently covering the top area
        if (rect.top - containerTop <= 120) { 
          currentCategory = cat;
        }
      }
    }
    
    if (currentCategory !== activeCategory) {
      setActiveCategory(currentCategory);
    }
  };

  // Ensure the active category in sidebar is visible and centered if possible
  React.useEffect(() => {
    const activeBtn = sidebarRefs.current[activeCategory];
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [activeCategory]);

  const scrollToCategory = (cat: string) => {
    const ref = categoryRefs.current[cat];
    if (ref && scrollRef.current) {
      const containerTop = scrollRef.current.getBoundingClientRect().top;
      const elementTop = ref.getBoundingClientRect().top;
      scrollRef.current.scrollBy({
        top: elementTop - containerTop - 10,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-slate-900">
      {/* Profile Header */}
      <div className="relative pt-12 pb-4 px-4 bg-slate-900/10 dark:bg-slate-100/10">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => window.location.href = 'weixin://'} className="text-slate-900 dark:text-slate-100">
            <Headphones size={24} />
          </button>
          <div className="flex gap-4">
            <MoreHorizontal size={24} className="text-slate-900 dark:text-slate-100" />
            <div className="size-6 rounded-full border-2 border-slate-900 dark:border-slate-100 flex items-center justify-center">
              <div className="size-3 rounded-full bg-slate-900 dark:bg-slate-100" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onShowContact} className="size-16 rounded-lg overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm">
              <img src={USER_INFO.avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </button>
            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{USER_INFO.name}</h2>
                <ChevronRight size={16} className="text-slate-400" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{USER_INFO.bio}</p>
            </div>
          </div>
          <button 
            onClick={onShowPayment}
            className="flex flex-col items-center gap-1 text-slate-600 dark:text-slate-300"
          >
            <LayoutGrid size={24} />
            <span className="text-[10px] font-bold">付款</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 dark:border-slate-800">
        <button 
          onClick={() => setActiveTab('dynamic')}
          className={`flex-1 py-3 text-sm font-bold transition-all relative ${activeTab === 'dynamic' ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`}
        >
          动态
          {activeTab === 'dynamic' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-900 dark:bg-slate-100 rounded-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('order')}
          className={`flex-1 py-3 text-sm font-bold transition-all relative ${activeTab === 'order' ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`}
        >
          下单
          {activeTab === 'order' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-900 dark:bg-slate-100 rounded-full" />}
        </button>
      </div>

      {activeTab === 'dynamic' ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
          <MessageCircle size={48} className="mb-2 opacity-20" />
          <p>暂无历史动态</p>
        </div>
      ) : (
        <>
          <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-400">
            <span>免配送费</span>
            <button className="flex items-center gap-1">
              <Package size={14} />
              我的订单
            </button>
          </div>

          <main className="flex flex-1 overflow-hidden">
            <aside className="w-24 bg-slate-50 dark:bg-slate-950 flex flex-col overflow-y-auto scrollbar-hide">
              <nav className="flex flex-col">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    ref={el => sidebarRefs.current[cat] = el}
                    onClick={() => scrollToCategory(cat)}
                    className={`flex h-16 items-center justify-center border-l-4 px-2 text-center text-xs transition-all ${
                      activeCategory === cat 
                        ? 'border-[#ec4d13] bg-white dark:bg-slate-900 font-bold text-[#ec4d13]' 
                        : 'border-transparent font-medium text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </aside>
            
            <section 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4 space-y-8 pb-32"
            >
              {CATEGORIES.map(cat => (
                <div key={cat} ref={el => categoryRefs.current[cat] = el} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {cat}
                    </h3>
                    <button className="text-slate-400">
                      <Settings size={16} />
                    </button>
                  </div>
                  {PRODUCTS.filter(p => p.category === cat).map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAdd={onAddToCart}
                      onClick={onProductClick}
                    />
                  ))}
                </div>
              ))}
            </section>
          </main>

          {/* Bottom Cart Bar */}
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                className="fixed bottom-6 left-4 right-4 z-30"
              >
                <div className="bg-white dark:bg-slate-800 rounded-full p-1 flex items-center justify-between shadow-2xl border border-slate-100 dark:border-slate-700">
                  <button 
                    onClick={onShowMiniCart}
                    className="flex items-center gap-3 pl-3"
                  >
                    <div className="relative">
                      <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[#ec4d13]">
                        <ShoppingCart size={20} />
                      </div>
                      <span className="absolute -top-1 -right-1 size-5 bg-[#ec4d13] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
                        {cartCount}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold">合计 ¥{totalPrice.toFixed(2)}</p>
                    </div>
                  </button>
                  <button 
                    onClick={onCheckout}
                    className="bg-[#ec4d13] text-white px-8 py-2.5 rounded-full font-bold text-sm active:scale-95 transition-transform"
                  >
                    选好了
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

const ProductDetailView: React.FC<{ product: Product, onBack: () => void, onAddToCart: (p: Product) => void }> = ({ product, onBack, onAddToCart }) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-white dark:bg-[#221510] overflow-y-auto pb-24 max-w-md mx-auto"
    >
      <div className="sticky top-0 z-30 flex items-center bg-white/80 dark:bg-[#221510]/80 backdrop-blur-md p-4 justify-between">
        <button 
          onClick={onBack}
          className="size-10 flex items-center justify-center rounded-full hover:bg-[#ec4d13]/10 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">商品详情</h2>
        <button className="size-10 flex items-center justify-center rounded-full hover:bg-[#ec4d13]/10 transition-colors">
          <MoreHorizontal size={24} />
        </button>
      </div>

      <div className="w-full aspect-square bg-slate-200 dark:bg-slate-800">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="px-5 pt-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold leading-tight mb-2">{product.name}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">{product.description}</p>
          </div>
          <button className="flex flex-col items-center gap-1 group">
            <div className="size-10 rounded-full bg-[#ec4d13]/10 flex items-center justify-center text-[#ec4d13] group-hover:bg-[#ec4d13] group-hover:text-white transition-all">
              <Share2 size={20} />
            </div>
            <span className="text-[10px] font-medium text-slate-500">分享</span>
          </button>
        </div>

        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-[#ec4d13] text-xl font-bold">¥</span>
          <span className="text-[#ec4d13] text-3xl font-extrabold tracking-tight">{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="ml-3 text-sm text-slate-400 line-through">¥{product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <div className="flex-1 rounded-xl bg-slate-100 dark:bg-slate-800/50 p-3 flex items-center gap-3">
            <ShieldCheck className="text-[#ec4d13]" size={20} />
            <div>
              <p className="text-xs font-bold">正品保证</p>
              <p className="text-[10px] text-slate-500">官方直供 售后无忧</p>
            </div>
          </div>
          <div className="flex-1 rounded-xl bg-slate-100 dark:bg-slate-800/50 p-3 flex items-center gap-3">
            <Truck className="text-[#ec4d13]" size={20} />
            <div>
              <p className="text-xs font-bold">快递包邮</p>
              <p className="text-[10px] text-slate-500">24小时内准时发货</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-2 bg-slate-100 dark:bg-slate-900 my-8"></div>

      <div className="px-5">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-5 bg-[#ec4d13] rounded-full"></div>
          <h3 className="font-bold text-lg">详情展示</h3>
        </div>
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
            {product.details || '匠心手作，精选优质材料，每一件作品都承载着手艺人的温度与情感。'}
          </p>
          {product.detailImages?.map((img, idx) => (
            <div key={idx} className="w-full h-80 rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <img src={img} alt={`${product.name} detail ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          ))}
          {!product.detailImages && (
             <div className="w-full h-80 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <p className="text-slate-400">暂无详情图</p>
             </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto bg-white/90 dark:bg-[#221510]/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-4 py-3">
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full h-12 rounded-full bg-[#ec4d13] text-white font-bold text-sm shadow-lg shadow-[#ec4d13]/30 active:scale-95 transition-all"
        >
          加入购物车
        </button>
      </div>
    </motion.div>
  );
};

const ConfirmOrderView: React.FC<{ cart: CartItem[], onBack: () => void }> = ({ cart, onBack }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [activeTab, setActiveTab] = useState('delivery'); // 'delivery', 'dine-in', 'pickup'

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 z-50 bg-[#f8f6f6] dark:bg-slate-950 overflow-y-auto pb-24 max-w-md mx-auto"
    >
      <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-slate-900 dark:text-slate-100">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">确认订单</h1>
        <div className="flex gap-4">
          <MoreHorizontal size={24} />
          <div className="size-6 rounded-full border-2 border-slate-900 dark:border-slate-100 flex items-center justify-center">
            <div className="size-3 rounded-full bg-slate-900 dark:bg-slate-100" />
          </div>
        </div>
      </header>

      <div className="bg-white dark:bg-slate-900 flex mb-4">
        {['外送', '堂食', '自提'].map((tab, i) => {
          const id = ['delivery', 'dine-in', 'pickup'][i];
          return (
            <button 
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 py-3 text-sm font-bold transition-all relative ${activeTab === id ? 'text-[#ec4d13]' : 'text-slate-400'}`}
            >
              {tab}
              {activeTab === id && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#ec4d13] rounded-full" />}
            </button>
          );
        })}
      </div>

      <div className="px-4 space-y-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold">收货地址</span>
            <span className="text-sm text-slate-400">添加收货地址</span>
          </div>
          <ChevronRight size={20} className="text-slate-300" />
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl space-y-4">
          <h3 className="font-bold text-sm">共{cart.reduce((s, i) => s + i.quantity, 0)}件商品</h3>
          {cart.map(item => (
            <div key={item.id} className="flex gap-3">
              <img src={item.image} alt={item.name} className="size-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-bold">{item.name}</span>
                  <span className="text-sm font-bold">¥{item.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>x{item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-end">
            <p className="text-sm font-bold">合计 ¥{total.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl flex items-center justify-between">
          <span className="text-sm font-bold">备注</span>
          <div className="flex items-center gap-1 text-slate-300">
            <span className="text-xs text-slate-400">选填</span>
            <ChevronRight size={20} />
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-4 right-4 max-w-md mx-auto z-30">
        <div className="bg-white dark:bg-slate-800 rounded-full p-1.5 flex items-center justify-between shadow-2xl border border-slate-100 dark:border-slate-700">
          <div className="flex items-baseline gap-1 pl-6">
            <span className="text-xs text-slate-400">合计</span>
            <span className="text-xl font-bold text-[#ec4d13]">¥{total.toFixed(2)}</span>
          </div>
          <button className="bg-[#ec4d13] text-white px-10 py-3 rounded-full font-bold text-sm active:scale-95 transition-transform shadow-lg shadow-[#ec4d13]/20">
            去支付
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const PaymentModal: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [amount, setAmount] = useState('');

  const handleKey = (key: string) => {
    if (key === 'del') {
      setAmount(prev => prev.slice(0, -1));
    } else if (key === '.') {
      if (!amount.includes('.')) setAmount(prev => prev + key);
    } else {
      setAmount(prev => prev + key);
    }
  };

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-0 z-[60] bg-black/40 flex flex-col justify-end max-w-md mx-auto"
    >
      <div className="bg-white dark:bg-slate-900 rounded-t-3xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <button onClick={onBack} className="text-slate-400"><Plus size={24} className="rotate-45" /></button>
            <h2 className="font-bold">向商家付款</h2>
            <div className="w-6" />
          </div>

          <div className="space-y-2">
            <p className="text-xs text-slate-400">金额</p>
            <div className="flex items-center gap-2 text-3xl font-bold">
              <span>¥</span>
              <div className="flex-1 flex items-center">
                {amount || <span className="text-slate-200">输入金额</span>}
                <motion.div 
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-0.5 h-8 bg-[#ec4d13] ml-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 bg-slate-50 dark:bg-slate-950 gap-px border-t border-slate-100 dark:border-slate-800">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'].map(key => (
            <button 
              key={key} 
              onClick={() => handleKey(key.toString())}
              className="h-16 bg-white dark:bg-slate-900 text-xl font-bold active:bg-slate-100"
            >
              {key}
            </button>
          ))}
          <button 
            onClick={() => handleKey('del')}
            className="h-16 bg-white dark:bg-slate-900 flex items-center justify-center active:bg-slate-100"
          >
            <Plus size={24} className="rotate-45" />
          </button>
          <button 
            className="col-start-4 row-start-1 row-end-5 bg-[#ec4d13]/20 text-[#ec4d13] font-bold text-lg flex items-center justify-center"
          >
            付款
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ContactInfoModal: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-0 z-[60] bg-black/40 flex flex-col justify-end max-w-md mx-auto"
    >
      <div className="bg-white dark:bg-slate-900 rounded-t-3xl p-6 pb-12">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full" />
        </div>
        
        <div className="flex flex-col items-center text-center mb-8">
          <div className="size-20 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg mb-4">
            <img src={USER_INFO.avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <h2 className="text-xl font-bold mb-2">{USER_INFO.name}</h2>
          <p className="text-sm text-slate-500">{USER_INFO.bio}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div className="flex items-center gap-3">
              <Headphones size={20} className="text-slate-400" />
              <span className="font-bold">{USER_INFO.phone}</span>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div className="flex items-center gap-3">
              <MessageCircle size={20} className="text-slate-400" />
              <span className="font-bold">{USER_INFO.wechat}</span>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </div>
        </div>

        <button 
          onClick={onBack}
          className="w-full mt-8 py-4 text-slate-400 font-bold"
        >
          取消
        </button>
      </div>
    </motion.div>
  );
};

const MiniCartDrawer: React.FC<{ cart: CartItem[], onBack: () => void, onUpdateQuantity: (id: string, delta: number) => void }> = ({ cart, onBack, onUpdateQuantity }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[55] bg-black/40 flex flex-col justify-end max-w-md mx-auto"
      onClick={onBack}
    >
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="bg-white dark:bg-slate-900 rounded-t-3xl p-6 pb-12 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <div className="w-12 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full" />
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-lg">已选商品</h2>
            <span className="text-xs text-slate-400 font-medium">({cart.reduce((s, i) => s + i.quantity, 0)}件)</span>
          </div>
          <button 
            onClick={() => cart.forEach(i => onUpdateQuantity(i.id, -i.quantity))} 
            className="text-xs text-slate-400 flex items-center gap-1 hover:text-[#ec4d13] transition-colors"
          >
            <Settings size={14} /> 清空
          </button>
        </div>

        <div className="space-y-5 max-h-[40vh] overflow-y-auto scrollbar-hide">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="size-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold mb-1">{item.name}</h3>
                <p className="text-[#ec4d13] font-bold text-sm">¥{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1.5">
                <button 
                  onClick={() => onUpdateQuantity(item.id, -1)} 
                  className="text-slate-400 hover:text-[#ec4d13] transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.id, 1)} 
                  className="text-slate-400 hover:text-[#ec4d13] transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Modal states
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#ec4d13]/30">
      <div className="max-w-md mx-auto h-screen relative flex flex-col overflow-hidden bg-white dark:bg-slate-900 shadow-2xl">
        
        <ShopView 
          onProductClick={setSelectedProduct} 
          onAddToCart={addToCart}
          onShowContact={() => setShowContactInfo(true)}
          onShowPayment={() => setShowPaymentModal(true)}
          onCheckout={() => setShowConfirmOrder(true)}
          onShowMiniCart={() => setShowMiniCart(true)}
          cartCount={cartCount}
          totalPrice={totalPrice}
        />

        <AnimatePresence>
          {selectedProduct && (
            <ProductDetailView 
              product={selectedProduct} 
              onBack={() => setSelectedProduct(null)} 
              onAddToCart={addToCart}
            />
          )}
          {showConfirmOrder && (
            <ConfirmOrderView 
              cart={cart} 
              onBack={() => setShowConfirmOrder(false)} 
            />
          )}
          {showContactInfo && (
            <ContactInfoModal onBack={() => setShowContactInfo(false)} />
          )}
          {showPaymentModal && (
            <PaymentModal onBack={() => setShowPaymentModal(false)} />
          )}
          {showMiniCart && (
            <MiniCartDrawer 
              cart={cart} 
              onBack={() => setShowMiniCart(false)} 
              onUpdateQuantity={updateQuantity}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
