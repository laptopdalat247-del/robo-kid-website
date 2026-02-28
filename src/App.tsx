import { useEffect, useRef, useState } from 'react'

/* ═══════════════════ DESIGN TOKENS ═══════════════════ */
const C = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  accent: '#F59E0B',
  green: '#10B981',
  purple: '#8B5CF6',
  pink: '#EC4899',
  dark: '#0F172A',
  gray: '#64748B',
  lightGray: '#F1F5F9',
  light: '#F8FAFC',
  white: '#FFFFFF',
}

const font = {
  heading: "'Fredoka', sans-serif",
  body: "'Be Vietnam Pro', sans-serif",
}

/* ═══════════════════ HOOKS ═══════════════════ */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ═══════════════════ ANIMATED WRAPPER ═══════════════════ */
function Reveal({ children, delay = 0, direction = 'up', style = {} }: {
  children: React.ReactNode; delay?: number; direction?: string; style?: React.CSSProperties
}) {
  const { ref, visible } = useInView()
  const t: Record<string, string> = {
    up: 'translateY(48px)', down: 'translateY(-48px)',
    left: 'translateX(48px)', right: 'translateX(-48px)', none: 'none',
  }
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) translateX(0)' : t[direction],
      transition: `opacity 0.75s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.75s cubic-bezier(.16,1,.3,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ═══════════════════ SVG ICONS ═══════════════════ */
function RobotLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="12" y="16" width="24" height="22" rx="5" fill={C.primary} />
      <rect x="18" y="5" width="12" height="13" rx="6" fill={C.primary} opacity=".85" />
      <circle cx="21" cy="11" r="2.2" fill="#fff" />
      <circle cx="27" cy="11" r="2.2" fill="#fff" />
      <rect x="22" y="1" width="4" height="5" rx="2" fill={C.primary} opacity=".5" />
      <rect x="5" y="22" width="7" height="10" rx="3.5" fill={C.primary} opacity=".55" />
      <rect x="36" y="22" width="7" height="10" rx="3.5" fill={C.primary} opacity=".55" />
      <rect x="17" y="24" width="5" height="4" rx="1.5" fill="#fff" />
      <rect x="26" y="24" width="5" height="4" rx="1.5" fill="#fff" />
      <path d="M20 32 Q24 35.5 28 32" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function CheckCircle() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="11" fill={C.green} opacity=".14" />
      <path d="M7 11l3 3 5-5" stroke={C.green} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Star({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="#F59E0B">
      <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.69l5.34-.78z" />
    </svg>
  )
}

/* ═══════════════════ SHARED STYLES ═══════════════════ */
const container: React.CSSProperties = { maxWidth: 1180, margin: '0 auto', padding: '0 28px' }
const sectionPad: React.CSSProperties = { padding: '110px 0' }
const sectionLabel = (color: string): React.CSSProperties => ({
  fontSize: 13, fontWeight: 700, color, textTransform: 'uppercase' as const,
  letterSpacing: 2.5, fontFamily: font.body, marginBottom: 14,
})
const sectionTitle: React.CSSProperties = {
  fontFamily: font.heading, fontSize: 42, fontWeight: 700, color: C.dark, lineHeight: 1.2, marginBottom: 14,
}
const sectionSub: React.CSSProperties = {
  fontSize: 17, color: C.gray, fontFamily: font.body, lineHeight: 1.7, maxWidth: 560, margin: '0 auto',
}

function SectionHeader({ label, labelColor, title, titleSpan, titleSpanColor, sub }: {
  label: string; labelColor: string; title: string; titleSpan?: string; titleSpanColor?: string; sub?: string
}) {
  return (
    <Reveal>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={sectionLabel(labelColor)}>{label}</div>
        <h2 style={sectionTitle}>
          {title}{titleSpan && <span style={{ color: titleSpanColor }}> {titleSpan}</span>}
        </h2>
        {sub && <p style={sectionSub}>{sub}</p>}
      </div>
    </Reveal>
  )
}

/* ══════════════════════════════════════════════════════
   1. NAVBAR
   ══════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const linkStyle: React.CSSProperties = {
    color: C.dark, textDecoration: 'none', fontSize: 15, fontWeight: 500,
    fontFamily: font.body, opacity: .75, transition: 'opacity .2s',
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(255,255,255,.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid transparent',
      transition: 'all .35s ease',
    }}>
      <div style={{ ...container, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <RobotLogo size={34} />
          <span style={{ fontFamily: font.heading, fontSize: 23, fontWeight: 700, color: C.primary }}>ROBO-KID</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {['Sản phẩm', 'Tính năng', 'Trung tâm', 'Bảng giá', 'Liên hệ'].map(t => (
            <a key={t} href={`#${t}`} style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '.75')}>{t}</a>
          ))}
          <a href="https://center.robokid.edu.vn" target="_blank" rel="noreferrer" style={{
            background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
            color: '#fff', padding: '11px 26px', borderRadius: 12, textDecoration: 'none',
            fontWeight: 600, fontSize: 14, fontFamily: font.body,
            boxShadow: '0 4px 16px rgba(37,99,235,.35)', transition: 'transform .2s, box-shadow .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,.45)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,99,235,.35)' }}
          >Dùng thử miễn phí</a>
        </div>
      </div>
    </nav>
  )
}

/* ══════════════════════════════════════════════════════
   2. HERO
   ══════════════════════════════════════════════════════ */
function Hero() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const target = 500; let c = 0
    const id = setInterval(() => { c += 9; if (c >= target) { c = target; clearInterval(id) }; setCount(c) }, 25)
    return () => clearInterval(id)
  }, [])

  const btnPrimary: React.CSSProperties = {
    background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
    color: '#fff', padding: '17px 34px', borderRadius: 14, textDecoration: 'none',
    fontWeight: 700, fontSize: 16, fontFamily: font.body, display: 'inline-flex', alignItems: 'center', gap: 8,
    boxShadow: '0 8px 28px rgba(37,99,235,.32)', transition: 'all .3s',
    border: 'none', cursor: 'pointer',
  }
  const btnSecondary: React.CSSProperties = {
    background: '#fff', color: C.dark, padding: '17px 30px', borderRadius: 14, textDecoration: 'none',
    fontWeight: 600, fontSize: 16, fontFamily: font.body, display: 'inline-flex', alignItems: 'center', gap: 8,
    border: '2px solid #E2E8F0', transition: 'all .3s', cursor: 'pointer',
  }

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(160deg, #EFF6FF 0%, #F8FAFC 40%, #FFF7ED 100%)',
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: -120, right: -120, width: 440, height: 440, borderRadius: '50%', background: 'rgba(37,99,235,.055)' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 340, height: 340, borderRadius: '50%', background: 'rgba(245,158,11,.07)' }} />
      <div style={{ position: 'absolute', top: '28%', right: '12%', width: 140, height: 140, borderRadius: '50%', background: 'rgba(139,92,246,.05)' }} />

      <div style={{ ...container, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', paddingTop: 120, paddingBottom: 80, position: 'relative', zIndex: 1 }}>
        {/* LEFT */}
        <div>
          <Reveal>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              background: '#fff', padding: '9px 18px', borderRadius: 50, marginBottom: 28,
              boxShadow: '0 2px 14px rgba(0,0,0,.06)', border: '1px solid #E2E8F0',
            }}>
              <span style={{ fontSize: 15 }}>🎉</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.primary, fontFamily: font.body }}>
                Center Portal MIỄN PHÍ 100%
              </span>
            </div>
          </Reveal>

          <Reveal delay={.1}>
            <h1 style={{
              fontFamily: font.heading, fontSize: 54, fontWeight: 700,
              lineHeight: 1.13, color: C.dark, marginBottom: 22,
            }}>
              Quản lý trung tâm<br />
              <span style={{
                background: `linear-gradient(135deg, ${C.primary}, ${C.purple})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>thông minh hơn</span><br />với AI
            </h1>
          </Reveal>

          <Reveal delay={.2}>
            <p style={{ fontSize: 18, color: C.gray, lineHeight: 1.75, marginBottom: 36, fontFamily: font.body, maxWidth: 490 }}>
              Phần mềm quản lý trung tâm tiếng Anh <strong style={{ color: C.dark }}>hoàn toàn miễn phí</strong> — tích hợp AI chatbot hỗ trợ, bài tập tương tác, và app học sinh thông minh.
            </p>
          </Reveal>

          <Reveal delay={.3}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 44 }}>
              <a href="https://center.robokid.edu.vn" target="_blank" rel="noreferrer" style={btnPrimary}>
                Đăng ký hoàn toàn miễn phí →
              </a>
              <a href="#demo" style={btnSecondary}>▶ Xem demo</a>
            </div>
          </Reveal>

          <Reveal delay={.4}>
            <div style={{ display: 'flex', gap: 40 }}>
              {[
                { num: `${count}+`, label: 'Trung tâm' },
                { num: '10K+', label: 'Học sinh' },
                { num: '4.9', label: 'Đánh giá', star: true },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontFamily: font.heading, fontSize: 30, fontWeight: 700, color: C.dark }}>{s.num}</span>
                    {s.star && <Star />}
                  </div>
                  <span style={{ fontSize: 13, color: C.gray, fontFamily: font.body }}>{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* RIGHT — Dashboard Preview */}
        <Reveal delay={.15} direction="left">
          <div style={{
            background: '#fff', borderRadius: 22, padding: 28,
            boxShadow: '0 24px 64px rgba(0,0,0,.09), 0 0 0 1px rgba(0,0,0,.03)',
            transform: 'perspective(1200px) rotateY(-4deg) rotateX(2deg)',
            position: 'relative',
          }}>
            {/* Browser bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 20 }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
                <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
              ))}
              <div style={{
                flex: 1, background: C.lightGray, borderRadius: 7, marginLeft: 10,
                padding: '5px 14px', fontSize: 11.5, color: C.gray, fontFamily: 'monospace',
              }}>center.robokid.edu.vn</div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 18 }}>
              {[
                { icon: '👨‍🎓', label: 'Học sinh', val: '156', color: C.primary },
                { icon: '📚', label: 'Lớp học', val: '12', color: C.green },
                { icon: '💰', label: 'Doanh thu', val: '45M', color: C.accent },
              ].map(c => (
                <div key={c.label} style={{
                  background: `${c.color}0D`, borderRadius: 14, padding: 16, textAlign: 'center',
                }}>
                  <div style={{ fontSize: 26, marginBottom: 5 }}>{c.icon}</div>
                  <div style={{ fontFamily: font.heading, fontSize: 24, fontWeight: 700, color: c.color }}>{c.val}</div>
                  <div style={{ fontSize: 11.5, color: C.gray, fontFamily: font.body, marginTop: 2 }}>{c.label}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div style={{ background: C.light, borderRadius: 14, padding: 18, marginBottom: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: C.dark, fontFamily: font.body, marginBottom: 10 }}>
                📈 Doanh thu tháng
              </div>
              <svg width="100%" height="72" viewBox="0 0 320 72" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.primary} stopOpacity=".28" />
                    <stop offset="100%" stopColor={C.primary} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 62 Q40 52 80 46 T160 34 T240 18 T320 8" fill="none" stroke={C.primary} strokeWidth="2.8" strokeLinecap="round" />
                <path d="M0 62 Q40 52 80 46 T160 34 T240 18 T320 8 V72 H0Z" fill="url(#hg)" />
              </svg>
            </div>

            {/* BIBO chat button */}
            <div style={{
              position: 'absolute', bottom: 20, right: 20,
              background: `linear-gradient(135deg, ${C.primary}, ${C.purple})`,
              width: 50, height: 50, borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(37,99,235,.4)',
            }}>
              <span style={{ fontSize: 24 }}>🤖</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   3. PRODUCTS
   ══════════════════════════════════════════════════════ */
function Products() {
  const items = [
    { icon: '📱', title: 'Student App', desc: 'App học tiếng Anh với Voice AI, 5 nhân vật hoạt hình, gamification. Trẻ em yêu thích!', color: C.purple, tags: ['AI Voice', 'Gamification', 'Coins'] },
    { icon: '🏫', title: 'Center Portal', desc: 'Quản lý trung tâm toàn diện: học sinh, lớp học, giáo viên, tài chính, báo cáo. MIỄN PHÍ!', color: C.primary, tags: ['Miễn phí', 'AI Chatbot', 'Import/Export'], hot: true },
    { icon: '📝', title: 'Quiz Platform', desc: 'Bài tập tương tác với templates đẹp. AI tự chấm điểm. Học sinh làm bài qua App.', color: C.green, tags: ['AI Grading', 'Templates', 'Interactive'] },
  ]

  return (
    <section id="Sản phẩm" style={{ ...sectionPad, background: '#fff' }}>
      <div style={container}>
        <SectionHeader label="Hệ sinh thái" labelColor={C.primary} title="3 sản phẩm," titleSpan="1 nền tảng" titleSpanColor={C.primary}
          sub="Kết nối trung tâm — giáo viên — học sinh — phụ huynh trên cùng một hệ thống" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 26 }}>
          {items.map((p, i) => (
            <Reveal key={p.title} delay={i * .12}>
              <div style={{
                background: p.hot ? `linear-gradient(165deg, ${p.color}08, ${p.color}03)` : C.light,
                borderRadius: 22, padding: 34, position: 'relative', overflow: 'hidden', height: '100%',
                border: p.hot ? `2px solid ${p.color}28` : `1px solid ${C.lightGray}`,
                transition: 'transform .35s, box-shadow .35s', cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-7px)'; e.currentTarget.style.boxShadow = '0 18px 44px rgba(0,0,0,.07)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {p.hot && (
                  <div style={{
                    position: 'absolute', top: 18, right: 18, background: C.accent,
                    color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 11px',
                    borderRadius: 7, fontFamily: font.body,
                  }}>⭐ HOT</div>
                )}
                <div style={{ fontSize: 50, marginBottom: 18 }}>{p.icon}</div>
                <h3 style={{ fontFamily: font.heading, fontSize: 24, fontWeight: 600, color: C.dark, marginBottom: 12 }}>{p.title}</h3>
                <p style={{ color: C.gray, fontSize: 15, lineHeight: 1.7, fontFamily: font.body, marginBottom: 22 }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      background: `${p.color}10`, color: p.color,
                      fontSize: 12, fontWeight: 600, padding: '6px 13px', borderRadius: 8, fontFamily: font.body,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   4. FEATURES
   ══════════════════════════════════════════════════════ */
function Features() {
  const items = [
    { icon: '👨‍🎓', title: 'Quản lý học sinh', desc: 'Thêm, import hàng loạt, theo dõi tiến độ từng em. Tìm kiếm không dấu.' },
    { icon: '📚', title: 'Lớp học & Lịch dạy', desc: 'Tạo lớp, phân công GV, lịch dạy theo phòng, phát hiện trùng lịch.' },
    { icon: '💰', title: 'Tài chính minh bạch', desc: 'Hóa đơn, thu học phí, công nợ, bảng lương GV. In hóa đơn chuyên nghiệp.' },
    { icon: '📊', title: 'Báo cáo thông minh', desc: 'Dashboard real-time: doanh thu, sĩ số, điểm danh. Biểu đồ trực quan.' },
    { icon: '🤖', title: 'AI Chatbot (BIBO)', desc: 'Trợ lý AI hướng dẫn sử dụng, trả lời 24/7. Hiểu ngữ cảnh trang đang xem.' },
    { icon: '📥', title: 'Import/Export dễ dàng', desc: 'Import từ Excel: GV, HS, Lớp một lần. Export báo cáo PDF, Excel.' },
  ]

  return (
    <section id="Tính năng" style={{ ...sectionPad, background: `linear-gradient(180deg, ${C.light}, #fff)` }}>
      <div style={container}>
        <SectionHeader label="Tính năng" labelColor={C.green} title="Mọi thứ bạn cần," titleSpan="miễn phí" titleSpanColor={C.primary}
          sub="Không cần dùng thêm bất kỳ phần mềm nào khác" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 22 }}>
          {items.map((f, i) => (
            <Reveal key={f.title} delay={i * .07}>
              <div style={{
                background: '#fff', borderRadius: 18, padding: 30, height: '100%',
                border: `1px solid ${C.lightGray}`, transition: 'border-color .3s, box-shadow .3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.primary}35`; e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,.05)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.lightGray; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ fontSize: 38, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontFamily: font.heading, fontSize: 20, fontWeight: 600, color: C.dark, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: C.gray, fontSize: 14.5, lineHeight: 1.7, fontFamily: font.body }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   5. B2B CTA
   ══════════════════════════════════════════════════════ */
function B2B() {
  const benefits = [
    'Miễn phí 100% — không giới hạn học sinh, lớp học',
    'Tích hợp App học sinh — phụ huynh theo dõi tiến độ',
    'AI Chatbot hỗ trợ sử dụng 24/7',
    'Import dữ liệu từ Excel trong 5 phút',
    'Commission tracking — kiếm thêm thu nhập từ App',
    'Cập nhật features liên tục, không mất phí',
  ]
  const bars = [
    { name: 'Phần mềm A', price: '2 - 5 triệu/tháng', w: '82%', color: '#EF4444' },
    { name: 'Phần mềm B', price: '1 - 3 triệu/tháng', w: '55%', color: C.accent },
    { name: 'ROBO-KID', price: '0đ MÃI MÃI', w: '4%', color: C.green },
  ]

  return (
    <section id="Trung tâm" style={{ ...sectionPad, background: '#fff' }}>
      <div style={{ ...container, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        {/* Left */}
        <Reveal direction="right">
          <div>
            <div style={sectionLabel(C.accent)}>Dành cho trung tâm</div>
            <h2 style={{ ...sectionTitle, maxWidth: 440, margin: 0, marginBottom: 28 }}>
              Tại sao <span style={{ color: C.primary }}>500+</span> trung tâm chọn ROBO-KID?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 36 }}>
              {benefits.map(b => (
                <div key={b} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <CheckCircle />
                  <span style={{ fontSize: 15, color: C.dark, fontFamily: font.body, lineHeight: 1.55 }}>{b}</span>
                </div>
              ))}
            </div>
            <a href="https://center.robokid.edu.vn" target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
              color: '#fff', padding: '17px 34px', borderRadius: 14, textDecoration: 'none',
              fontWeight: 700, fontSize: 16, fontFamily: font.body,
              boxShadow: '0 8px 28px rgba(37,99,235,.32)',
            }}>Đăng ký ngay — Miễn phí →</a>
          </div>
        </Reveal>

        {/* Right — comparison card */}
        <Reveal delay={.18}>
          <div style={{
            background: `linear-gradient(165deg, ${C.primary}07, ${C.purple}05)`,
            borderRadius: 22, padding: 36, border: `1px solid ${C.primary}12`,
          }}>
            <div style={{ fontFamily: font.heading, fontSize: 21, fontWeight: 600, color: C.dark, marginBottom: 26 }}>
              💰 So sánh chi phí hàng tháng
            </div>
            {bars.map(b => (
              <div key={b.name} style={{ marginBottom: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.dark, fontFamily: font.body }}>{b.name}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: b.color, fontFamily: font.body }}>{b.price}</span>
                </div>
                <div style={{ background: C.lightGray, borderRadius: 8, height: 11, overflow: 'hidden' }}>
                  <div style={{ width: b.w, background: b.color, height: '100%', borderRadius: 8 }} />
                </div>
              </div>
            ))}
            <div style={{
              background: `${C.green}10`, borderRadius: 14, padding: 18, marginTop: 24,
              border: `1px solid ${C.green}22`,
            }}>
              <span style={{ fontSize: 14.5, fontWeight: 600, color: C.green, fontFamily: font.body }}>
                💡 Tiết kiệm 24 - 60 triệu/năm so với phần mềm trả phí
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   6. AI CHARACTERS
   ══════════════════════════════════════════════════════ */
function Characters() {
  const chars = [
    { name: 'BIBO', role: 'Trợ giảng vui nhộn', emoji: '🤖', color: C.primary, gender: 'Nam' },
    { name: 'WIKI', role: 'Từ điển thông thái', emoji: '📖', color: C.purple, gender: 'Nữ' },
    { name: 'RACER', role: 'Thử thách tốc độ', emoji: '🏎️', color: C.accent, gender: 'Nam' },
    { name: 'GAIA', role: 'Khám phá thế giới', emoji: '🌍', color: C.green, gender: 'Nam' },
    { name: 'MIMI', role: 'Bạn thân thân thiện', emoji: '🎀', color: C.pink, gender: 'Nữ' },
  ]

  return (
    <section style={{ padding: '90px 0', background: '#fff' }}>
      <div style={container}>
        <SectionHeader label="5 nhân vật AI" labelColor={C.pink} title="Mỗi em có một" titleSpan="người bạn AI riêng" titleSpanColor={C.pink} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 22, flexWrap: 'wrap' }}>
          {chars.map((c, i) => (
            <Reveal key={c.name} delay={i * .08}>
              <div style={{
                width: 190, textAlign: 'center', padding: 28, borderRadius: 22,
                background: `${c.color}06`, border: `1px solid ${c.color}18`,
                transition: 'transform .35s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <div style={{
                  width: 76, height: 76, borderRadius: '50%', margin: '0 auto 14px',
                  background: `linear-gradient(140deg, ${c.color}18, ${c.color}35)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38,
                }}>{c.emoji}</div>
                <div style={{ fontFamily: font.heading, fontSize: 19, fontWeight: 700, color: c.color }}>{c.name}</div>
                <div style={{ fontSize: 13, color: C.gray, fontFamily: font.body, marginTop: 5 }}>{c.role}</div>
                <div style={{ fontSize: 11.5, color: C.gray, fontFamily: font.body, marginTop: 3 }}>Giọng {c.gender}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   7. PRICING
   ══════════════════════════════════════════════════════ */
function Pricing() {
  const plans = [
    { name: 'FREE', price: '0đ', period: 'mãi mãi', desc: 'Cho học sinh trải nghiệm', color: C.gray,
      features: ['3 bài học/ngày', '1 nhân vật AI', 'Luyện phát âm cơ bản', 'Báo cáo tuần'] },
    { name: 'PRO', price: '199K', period: '/tháng', desc: 'Phổ biến nhất', color: C.primary, popular: true,
      features: ['Không giới hạn bài học', '5 nhân vật AI', 'Luyện phát âm nâng cao', 'Báo cáo chi tiết', 'Coin rewards', 'Mini games'] },
    { name: 'PREMIUM', price: '399K', period: '/tháng', desc: 'Trải nghiệm đầy đủ', color: C.purple,
      features: ['Tất cả tính năng PRO', 'AI Tutor 1-on-1', 'Nội dung Premium', 'Ưu tiên hỗ trợ', 'x2 Coin rewards', 'Offline mode'] },
    { name: 'FAMILY', price: '499K', period: '/tháng', desc: 'Cho 3 con', color: C.accent,
      features: ['3 tài khoản con', 'Tất cả tính năng PREMIUM', 'Family dashboard', 'Tiết kiệm 40%'] },
  ]

  return (
    <section id="Bảng giá" style={{ ...sectionPad, background: `linear-gradient(180deg, ${C.light}, #fff)` }}>
      <div style={container}>
        <SectionHeader label="Bảng giá Student App" labelColor={C.purple} title="Chọn gói phù hợp" />
        <Reveal><p style={{ textAlign: 'center', color: C.gray, fontSize: 15, fontFamily: font.body, marginTop: -48, marginBottom: 56 }}>
          Center Portal luôn <strong style={{ color: C.primary }}>MIỄN PHÍ</strong>. Bảng giá dưới đây cho Student App.
        </p></Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * .1}>
              <div style={{
                background: '#fff', borderRadius: 22, padding: 30, position: 'relative',
                border: p.popular ? `2px solid ${p.color}` : `1px solid ${C.lightGray}`,
                boxShadow: p.popular ? '0 14px 40px rgba(37,99,235,.1)' : 'none',
                transform: p.popular ? 'scale(1.04)' : 'none',
                height: '100%', display: 'flex', flexDirection: 'column',
              }}>
                {p.popular && (
                  <div style={{
                    position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                    background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
                    color: '#fff', fontSize: 12, fontWeight: 700, padding: '5px 18px',
                    borderRadius: 20, fontFamily: font.body, whiteSpace: 'nowrap',
                  }}>⭐ Phổ biến nhất</div>
                )}
                <div style={{ fontSize: 13, fontWeight: 700, color: p.color, fontFamily: font.body, marginBottom: 10 }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                  <span style={{ fontFamily: font.heading, fontSize: 38, fontWeight: 700, color: C.dark }}>{p.price}</span>
                  <span style={{ fontSize: 14, color: C.gray, fontFamily: font.body }}>{p.period}</span>
                </div>
                <p style={{ fontSize: 13, color: C.gray, marginBottom: 22, fontFamily: font.body }}>{p.desc}</p>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 26 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <CheckCircle />
                      <span style={{ fontSize: 13.5, color: C.dark, fontFamily: font.body }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="#" style={{
                  display: 'block', textAlign: 'center', padding: '13px 0', borderRadius: 12,
                  fontWeight: 700, fontSize: 14, textDecoration: 'none', fontFamily: font.body,
                  background: p.popular ? `linear-gradient(135deg, ${p.color}, ${C.primaryDark})` : `${p.color}0D`,
                  color: p.popular ? '#fff' : p.color,
                  border: p.popular ? 'none' : `1px solid ${p.color}28`,
                  transition: 'transform .2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >{p.price === '0đ' ? 'Bắt đầu miễn phí' : 'Đăng ký ngay'}</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   8. CONTACT CTA
   ══════════════════════════════════════════════════════ */
function ContactCTA() {
  return (
    <section id="Liên hệ" style={{
      padding: '90px 28px', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(160deg, ${C.primary}, ${C.primaryDark})`,
    }}>
      <div style={{ position: 'absolute', top: -90, right: -90, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,.05)' }} />
      <div style={{ position: 'absolute', bottom: -50, left: -50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,.035)' }} />
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <h2 style={{ fontFamily: font.heading, fontSize: 40, fontWeight: 700, color: '#fff', marginBottom: 18 }}>
            Sẵn sàng nâng cấp trung tâm?
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,.78)', fontFamily: font.body, lineHeight: 1.75, marginBottom: 36 }}>
            Đăng ký hoàn toàn miễn phí, import dữ liệu trong 5 phút, bắt đầu quản lý chuyên nghiệp ngay hôm nay.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://center.robokid.edu.vn" target="_blank" rel="noreferrer" style={{
              background: '#fff', color: C.primary, padding: '17px 38px', borderRadius: 14,
              textDecoration: 'none', fontWeight: 700, fontSize: 16, fontFamily: font.body,
              boxShadow: '0 8px 28px rgba(0,0,0,.18)', transition: 'transform .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >Đăng ký hoàn toàn miễn phí →</a>
            <a href="tel:0901234567" style={{
              background: 'rgba(255,255,255,.14)', color: '#fff', padding: '17px 30px',
              borderRadius: 14, textDecoration: 'none', fontWeight: 600, fontSize: 16,
              fontFamily: font.body, border: '1px solid rgba(255,255,255,.28)',
            }}>📞 Hotline: 090.123.4567</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════ */
function Footer() {
  const cols = [
    { title: 'Sản phẩm', items: [
      { text: 'Student App', href: 'https://app.robokid.edu.vn' },
      { text: 'Center Portal', href: 'https://center.robokid.edu.vn' },
      { text: 'Quiz Platform', href: 'https://baitap.robokid.edu.vn' },
    ]},
    { title: 'Hỗ trợ', items: [
      { text: 'Hướng dẫn sử dụng', href: '#Tính năng' },
      { text: 'FAQ', href: '#Trung tâm' },
      { text: 'Liên hệ', href: '#Liên hệ' },
    ]},
    { title: 'Liên kết', items: [
      { text: 'center.robokid.edu.vn', href: 'https://center.robokid.edu.vn' },
      { text: 'baitap.robokid.edu.vn', href: 'https://baitap.robokid.edu.vn' },
      { text: 'robokid.edu.vn', href: 'https://robokid.edu.vn' },
    ]},
  ]

  return (
    <footer style={{ background: C.dark, padding: '64px 28px 34px' }}>
      <div style={{ ...container, display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1fr', gap: 44, marginBottom: 44 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <RobotLogo size={30} />
            <span style={{ fontFamily: font.heading, fontSize: 21, fontWeight: 700, color: '#fff' }}>ROBO-KID</span>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', fontFamily: font.body, lineHeight: 1.75, maxWidth: 310 }}>
            Nền tảng giáo dục tiếng Anh thông minh cho trẻ em Việt Nam. Kết nối trung tâm — giáo viên — học sinh.
          </p>
        </div>
        {cols.map(c => (
          <div key={c.title}>
            <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 18 }}>{c.title}</div>
            {c.items.map((item: any) => (
              <a key={item.text} href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,.45)', fontFamily: font.body, marginBottom: 12, cursor: 'pointer', transition: 'color .2s', textDecoration: 'none' }}
                onMouseEnter={(e: any) => e.currentTarget.style.color = 'rgba(255,255,255,.7)'}
                onMouseLeave={(e: any) => e.currentTarget.style.color = 'rgba(255,255,255,.45)'}
              >{item.text}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 26, textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', fontFamily: font.body }}>
          © 2026 ROBO-KID Academy. Tất cả quyền được bảo lưu.
        </p>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════════════
   APP
   ══════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Navbar />
      <Hero />
      <Products />
      <Features />
      <B2B />
      <Characters />
      <Pricing />
      <ContactCTA />
      <Footer />
    </div>
  )
}
