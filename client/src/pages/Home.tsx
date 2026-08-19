/**
 * Style reminder — Flowing Gallery Wayfinding:
 * New Swiss retail signage; warm paper-white space, indigo wayfinding lines,
 * yuzu-green action accents, oversized bilingual typography, and tactile exhibit labels.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Gift,
  HeartHandshake,
  MapPin,
  ShoppingBag,
  Sparkles,
  Ticket,
} from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type CategoryId = "all" | "food" | "retail" | "life" | "move";

type Offer = {
  id: string;
  brand: string;
  english?: string;
  category: Exclude<CategoryId, "all">;
  categoryLabel: string;
  offer: string;
  highlight: string;
  conditions: string;
  validUntil: string;
  logoDomain?: string;
  sourceUrl: string;
  note?: string;
};

const categories: Array<{
  id: CategoryId;
  label: string;
  english: string;
  marker: string;
  colour: string;
  icon: typeof ShoppingBag;
}> = [
  { id: "all", label: "全部", english: "ALL OFFERS", marker: "00", colour: "#21176F", icon: Sparkles },
  { id: "food", label: "食・日常", english: "FOOD & DAILY", marker: "01", colour: "#F16A56", icon: Gift },
  { id: "retail", label: "購物・收藏", english: "RETAIL & HOBBY", marker: "02", colour: "#6757D8", icon: ShoppingBag },
  { id: "life", label: "生活・家居", english: "LIFESTYLE & HOME", marker: "03", colour: "#1C796C", icon: HeartHandshake },
  { id: "move", label: "出行・服務", english: "MOVE & SERVICES", marker: "04", colour: "#2568C7", icon: MapPin },
];

const offers: Offer[] = [
  {
    id: "cubuy",
    brand: "CU Buy 燒買",
    english: "CU BUY",
    category: "food",
    categoryLabel: "食・日常",
    offer: "全場商品 88 折",
    highlight: "輸入 KC12 即享 88 折",
    conditions: "於 CU Buy 網店購物，以 PayKool 卡付款並在結帳時輸入優惠碼 KC12。不可與其他優惠同用；不適用於禮券、現金券及指定產品。",
    validUntil: "2027.02.28",
    logoDomain: "cubuy.com.hk",
    sourceUrl: "https://www.paykool.hk/promotions/mooncake",
  },
  {
    id: "awesome",
    brand: "Awesome Bar&Café",
    category: "food",
    categoryLabel: "食・日常",
    offer: "免費指定茶飲 1 杯",
    highlight: "簽帳消費即可換領",
    conditions: "於尖沙咀 Awesome Bar&Café 以 PayKool 卡全數簽帳，並向職員說明享用持卡人禮遇。每次消費限享一次，指定飲品視乎供應。",
    validUntil: "2026.10.23",
    logoDomain: "awesomebarcafe.com",
    sourceUrl: "https://www.paykool.hk/promotions/awesomebarcafe",
  },
  {
    id: "759",
    brand: "759 阿信屋",
    english: "759 STORE",
    category: "food",
    categoryLabel: "食・日常",
    offer: "滿 $30 減 $10",
    highlight: "流動支付即減 HK$10",
    conditions: "僅限特選 PayKool 持卡人。先於 App 領取電子券，並於付款前出示；以 Apple Pay、Google Pay、Alipay 或微信支付等流動支付簽帳滿 HK$30。每位合資格持卡人最多一次。",
    validUntil: "2027.03.31",
    logoDomain: "759store.com",
    sourceUrl: "https://www.paykool.hk/promotions/759",
  },
  {
    id: "mslosoup",
    brand: "盧太太湯水",
    english: "MRS LO'S SOUP",
    category: "food",
    categoryLabel: "食・日常",
    offer: "滿 $200 減 $50",
    highlight: "網店全單即減 HK$50",
    conditions: "在 PayKool App 領取持卡人優惠碼，於盧太太湯水網店結帳時輸入，並以 PayKool 卡全數付款。每個註冊電郵限用一次，不可與其他優惠同用。",
    validUntil: "2026.10.23",
    logoDomain: "mslosoup.com",
    sourceUrl: "https://www.paykool.hk/promotions/mslosoup",
  },
  {
    id: "seven",
    brand: "7-Eleven",
    english: "7-ELEVEN",
    category: "food",
    categoryLabel: "食・日常",
    offer: "每月最高 $10 回贈",
    highlight: "簽帳滿 $20 賞 $10",
    conditions: "先於 PayKool App「禮遇」登記指定優惠；在 7-Eleven 以 PayKool 卡簽帳滿 HK$20，可獲 HK$10 免找數簽帳額。每月最多 HK$10，整個推廣期最多 HK$50。",
    validUntil: "2027.06.30",
    logoDomain: "7-eleven.com.hk",
    sourceUrl: "https://www.paykool.hk/promotions/pp711",
  },
  {
    id: "cardopia",
    brand: "Cardopia",
    category: "retail",
    categoryLabel: "購物・收藏",
    offer: "滿 $500 減 $50",
    highlight: "指定門店即減 HK$50",
    conditions: "在 App 登記或領取 Cardopia HK$50 優惠券；於指定門店單次消費滿 HK$500 使用。每次交易限一張，不適用於禮券及現金券。",
    validUntil: "2027.06.15",
    logoDomain: "cardopia.shop",
    sourceUrl: "https://www.paykool.hk/promotions/mbcardo",
  },
  {
    id: "carder",
    brand: "Carder Toysnplace",
    english: "CARDER TOYSNPLACE",
    category: "retail",
    categoryLabel: "購物・收藏",
    offer: "滿 $1,000 減 $50",
    highlight: "收藏卡牌即減 HK$50",
    conditions: "在 App 領取 HK$50 優惠券；於 Carder Toysnplace 指定門店單次簽帳滿 HK$1,000 使用。每次消費限一張，不適用於禮券及現金券。",
    validUntil: "2027.04.23",
    sourceUrl: "https://www.paykool.hk/promotions/cardertoysnplace",
  },
  {
    id: "buddies",
    brand: "Card Buddies",
    category: "retail",
    categoryLabel: "購物・收藏",
    offer: "滿 $1,000 減 $50",
    highlight: "指定門店即減 HK$50",
    conditions: "在 App 領取 Card Buddies HK$50 優惠券；於指定門店單次簽帳滿 HK$1,000 使用。每次消費限一張，不適用於禮券及現金券。",
    validUntil: "2027.04.23",
    sourceUrl: "https://www.paykool.hk/promotions/cardbuddies",
  },
  {
    id: "mudan",
    brand: "Mudan Noir",
    category: "retail",
    categoryLabel: "購物・收藏",
    offer: "指定產品減 $100",
    highlight: "香薰陶瓷花即減 HK$100",
    conditions: "於 App 領取持卡人優惠碼，於 Mudan Noir 網店購買指定香薰陶瓷花產品並以 PayKool 卡付款。訂單滿 HK$500 免運費；不可與其他優惠碼同用。",
    validUntil: "2026.09.09",
    logoDomain: "mudannoir.com",
    sourceUrl: "https://www.paykool.hk/promotions/MudanNoir202606",
  },
  {
    id: "athome",
    brand: "at.home",
    category: "life",
    categoryLabel: "生活・家居",
    offer: "滿 $2,888 減 $188",
    highlight: "傢俬家品全單減 HK$188",
    conditions: "於指定 at.home 分店購買傢俬家品滿 HK$2,888 並以 PayKool 卡簽帳。每次交易及每個送貨地址限一次；不可與其他優惠同用。",
    validUntil: "2026.08.21",
    logoDomain: "athome.com.hk",
    sourceUrl: "https://www.paykool.hk/promotions/athome",
  },
  {
    id: "makersoul",
    brand: "MAKERSOUL",
    category: "life",
    categoryLabel: "生活・家居",
    offer: "指定品牌 95 折",
    highlight: "DEEN / ARSENAL 即享 95 折",
    conditions: "在 App 領取優惠券，於深水埗或觀塘指定門店購買 DEEN 或 ARSENAL 產品滿 HK$300，以 PayKool 卡付款。每次限一張，使用次數不限。",
    validUntil: "2027.03.24",
    logoDomain: "makersoul.com.hk",
    sourceUrl: "https://www.paykool.hk/promotions/mbmakersoul",
  },
  {
    id: "jhc",
    brand: "真好城",
    english: "JHC",
    category: "life",
    categoryLabel: "生活・家居",
    offer: "滿 $218 減 $10",
    highlight: "門店及 JHC eShop 可用",
    conditions: "於 App 領取 HK$10 電子優惠券；適用於香港真好城、生活提案、生活工房門市及 JHC eShop。部分食品、藥品、禮券及指定貨品不適用。",
    validUntil: "2026.12.31",
    logoDomain: "jhc.com.hk",
    sourceUrl: "https://www.paykool.hk/promotions/ppjhc2026",
  },
  {
    id: "onedegree",
    brand: "OneDegree",
    category: "life",
    categoryLabel: "生活・家居",
    offer: "首年保費 7 折起 + $300",
    highlight: "投保成功最高賞 HK$300",
    conditions: "經 PayKool App 指定禮遇連結進入 OneDegree 網站，以 PayKool 卡成功投保。寵物保險首年 8 折、家居保險首年 7 折，現有客戶免找數簽帳額上限為 HK$300。",
    validUntil: "2026.09.30",
    logoDomain: "onedegree.hk",
    sourceUrl: "https://www.paykool.hk/promotions/onedegree2026",
  },
  {
    id: "friendly",
    brand: "幫到你車隊",
    english: "FRIENDLY FARE TAXI",
    category: "move",
    categoryLabel: "出行・服務",
    offer: "1 年尊尚會籍",
    highlight: "預約車隊服務豁免行李費",
    conditions: "聯絡車隊指定 WhatsApp，出示有效 PayKool 卡完成登記。每位客戶只可登記一次；會籍不可轉讓，生效後為期一年。",
    validUntil: "登記至 2026.12.09",
    sourceUrl: "https://www.paykool.hk/promotions/friendlyfaretaxi",
  },
  {
    id: "bus",
    brand: "巴士到站",
    english: "BUS ARRIVAL",
    category: "move",
    categoryLabel: "出行・服務",
    offer: "永東單程票減 $20",
    highlight: "首次購票即減 HK$20",
    conditions: "在 App 領取專屬連結並進入「巴士到站」微信小程序；首次購買永東跨境巴士單程票可用。每人一次，不適用於來回票、套票或其他路線。",
    validUntil: "2026.12.31",
    sourceUrl: "https://www.paykool.hk/promotions/baygolungfung",
  },
  {
    id: "adventure",
    brand: "冒險樂園",
    english: "JUMPIN GYM",
    category: "move",
    categoryLabel: "出行・服務",
    offer: "$600 購 530 個代幣",
    highlight: "代幣優惠價，使用次數不限",
    conditions: "於香港任何冒險樂園分店以 PayKool 卡簽帳，可用優惠價 HK$600 購買 530 個代幣；不可與其他優惠同用。",
    validUntil: "2026.12.31",
    logoDomain: "jumpingym.com.hk",
    sourceUrl: "https://www.paykool.hk/promotions/jumpingym",
  },
  {
    id: "simsq",
    brand: "SIM SQ",
    category: "move",
    categoryLabel: "出行・服務",
    offer: "滿 $50 減 $20",
    highlight: "網店旅遊數據卡即減 HK$20",
    conditions: "在 App 領取 SIM SQ HK$20 電子優惠券，於 SIM SQ 官方網站消費滿 HK$50 並以 PayKool 卡付款。每次限一張，使用次數不限。",
    validUntil: "2027.03.01",
    logoDomain: "simsq.hk",
    sourceUrl: "https://www.paykool.hk/promotions/mbsim",
  },
];

function BrandMark({ offer, large = false }: { offer: Offer; large?: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = offer.brand.replace(/[^A-Za-z0-9一-龥]/g, "").slice(0, 2).toUpperCase();

  return (
    <div className={`brand-mark ${large ? "brand-mark-large" : ""}`} aria-hidden="true">
      {offer.logoDomain && !imageFailed ? (
        <img
          src={`https://www.google.com/s2/favicons?domain=${offer.logoDomain}&sz=128`}
          alt=""
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000 * 30);
    return () => window.clearInterval(timer);
  }, []);

  const visibleOffers = useMemo(
    () => (activeCategory === "all" ? offers : offers.filter((offer) => offer.category === activeCategory)),
    [activeCategory],
  );

  const activeMeta = categories.find((category) => category.id === activeCategory) ?? categories[0];
  const selectedIndex = selectedOffer ? offers.findIndex((offer) => offer.id === selectedOffer.id) : -1;
  const browseOffer = (direction: -1 | 1) => {
    if (selectedIndex < 0) return;
    const nextIndex = (selectedIndex + direction + offers.length) % offers.length;
    setSelectedOffer(offers[nextIndex]);
  };

  return (
    <main className="signage-page min-h-screen bg-[#f7f4ec] text-[#161428]">
      <div className="mx-auto grid min-h-screen max-w-[1280px] grid-cols-[86px_minmax(0,1fr)] overflow-hidden border-x border-[#161428]/10 bg-[#f7f4ec] lg:grid-cols-[118px_minmax(0,1fr)]">
        <aside className="category-rail" aria-label="優惠分類">
          <div className="rail-brand">
            <img src="/manus-storage/paykool-signage-mark_575f147f.png" alt="PayKool 商戶優惠展示" />
            <span>PAY<br />KOOL</span>
          </div>
          <div className="rail-rule" />
          <nav className="flex flex-col gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`rail-category ${isActive ? "rail-category-active" : ""}`}
                  style={{ "--category-colour": category.colour } as React.CSSProperties}
                  aria-pressed={isActive}
                >
                  <span className="rail-marker">{category.marker}</span>
                  <Icon size={20} strokeWidth={1.8} />
                  <span className="rail-label">{category.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="rail-bottom">
            <img src="/manus-storage/paykool-signage-mark_575f147f.png" alt="" />
            <span>TOUCH<br />TO<br />EXPLORE</span>
            <ArrowRight size={18} />
          </div>
        </aside>

        <section className="min-w-0 px-5 pb-8 pt-5 sm:px-8 sm:pb-10 sm:pt-7 lg:px-12">
          <header className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">PAYKOOL / MEMBER PERKS</p>
              <h1 className="mt-2 max-w-[620px] text-[clamp(2.25rem,5.3vw,4.7rem)] font-black leading-[0.92] tracking-[-0.075em]">
                你嘅 PayKool 卡，<br />
                今日有咩著數？
              </h1>
            </div>
            <div className="clock-card hidden shrink-0 sm:block">
              <Clock3 size={17} />
              <span>{now.toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </header>

          <section className="hero-exhibit mt-7" aria-label="優惠導覽介紹">
            <div className="hero-copy">
              <div className="hero-kicker"><img src="/manus-storage/paykool-signage-mark_575f147f.png" alt="" /> MEMBER ONLY</div>
              <p className="hero-lede">18 個現有客戶優惠，<br />由食、玩、買到出行一次過睇晒。</p>
              <p className="hero-sub">揀個類別，再撳品牌，即刻睇清楚點樣慳。</p>
              <div className="hero-index"><span>01—04</span><span><img src="/manus-storage/paykool-signage-mark_575f147f.png" alt="" /> 優惠導覽</span></div>
            </div>
            <div className="hero-art" style={{ backgroundImage: "url('/manus-storage/paykool-signage-hero_97451cf8.jpg')" }} aria-hidden="true" />
          </section>

          <section className="offer-section" aria-label="商戶優惠">
            <div className="section-heading">
              <div>
                <p className="section-index" style={{ color: activeMeta.colour }}><img src="/manus-storage/paykool-signage-mark_575f147f.png" alt="" /> {activeMeta.marker}</p>
                <h2>{activeMeta.label}</h2>
                <p>{activeMeta.english} · {visibleOffers.length.toString().padStart(2, "0")} BRANDS</p>
              </div>
              <div className="section-note"><Ticket size={17} /> 點選品牌看詳情</div>
            </div>

            <div className="offer-grid">
              {visibleOffers.map((offer, index) => {
                const category = categories.find((item) => item.id === offer.category) ?? categories[0];
                return (
                  <button
                    type="button"
                    className="offer-card group"
                    key={offer.id}
                    onClick={() => setSelectedOffer(offer)}
                    style={{ "--card-colour": category.colour, "--delay": `${index * 45}ms` } as React.CSSProperties}
                  >
                    <div className="offer-card-top">
                      <div className="offer-card-plinth"><BrandMark offer={offer} /><span>{offer.categoryLabel}</span></div>
                      <span className="offer-card-number">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="offer-card-body">
                      <p className="offer-brand">{offer.brand}</p>
                      <p className="offer-name">{offer.offer}</p>
                    </div>
                    <div className="offer-card-footer">
                      <span><img src="/manus-storage/paykool-signage-mark_575f147f.png" alt="" /> 睇詳情</span>
                      <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <footer className="signage-footer">
            <p>優惠受商戶及 PayKool 條款約束；請以 PayKool App 內顯示之優惠券及詳情為準。</p>
            <span>LAST CHECKED · 2026.08.19</span>
          </footer>
        </section>
      </div>

      <Sheet open={Boolean(selectedOffer)} onOpenChange={(open) => !open && setSelectedOffer(null)}>
        <SheetContent side="bottom" className="detail-sheet border-0 bg-[#161428] p-0 text-[#f7f4ec]">
          {selectedOffer && (
            <div className="detail-wrap">
              <SheetHeader className="detail-header">
                <div className="detail-brand-line">
                  <BrandMark offer={selectedOffer} large />
                  <div>
                    <p className="eyebrow text-[#d6fa3d]">{selectedOffer.categoryLabel}</p>
                    <SheetTitle className="mt-1 text-2xl font-black tracking-[-0.055em] text-[#f7f4ec] sm:text-3xl">{selectedOffer.brand}</SheetTitle>
                  </div>
                </div>
                <SheetClose asChild>
                  <button type="button" className="detail-back"><ArrowLeft size={18} /> 返回全部優惠</button>
                </SheetClose>
              </SheetHeader>

              <div className="detail-content">
                <div className="detail-main">
                  <p className="detail-label">持卡人禮遇</p>
                  <h3>{selectedOffer.highlight}</h3>
                  <p className="detail-copy">{selectedOffer.conditions}</p>
                </div>
                <aside className="detail-meta">
                  <div>
                    <p>有效期至</p>
                    <strong>{selectedOffer.validUntil}</strong>
                  </div>
                  <a href={selectedOffer.sourceUrl} target="_blank" rel="noreferrer" className="detail-source">
                    查看官方條款 <ExternalLink size={17} />
                  </a>
                </aside>
              </div>

              <div className="detail-controls">
                <button type="button" onClick={() => browseOffer(-1)}><ChevronLeft size={21} /> 上一個</button>
                <span>{String(selectedIndex + 1).padStart(2, "0")} / {String(offers.length).padStart(2, "0")}</span>
                <button type="button" onClick={() => browseOffer(1)}>下一個 <ChevronRight size={21} /></button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </main>
  );
}
