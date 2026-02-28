import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

/* ─── HOOKS ─── */
const useInView = (threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

/* ─── NAVBAR ─── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { label: "Sản phẩm", href: "#products" },
    { label: "Tính năng", href: "#features" },
    { label: "Bảng giá", href: "#pricing" },
    { label: "Liên hệ", href: "#contact" },
  ];
  const scroll = (id: string) => {
    setMobileOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: "linear-gradient(135deg, #2563EB, #7C3AED)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, color: "#fff", fontWeight: 800,
          }}>R</div>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", letterSpacing: -0.5 }}>
            ROBO<span style={{ color: "#2563EB" }}>-</span>KID
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scroll(l.href)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 15, fontWeight: 500, color: "#475569",
                padding: "8px 0", position: "relative",
              }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = "#2563EB"}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = "#475569"}
            >
              {l.label}
            </button>
          ))}
          <a
            href="https://center.robokid.edu.vn"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
              color: "#fff", padding: "10px 24px", borderRadius: 10,
              fontSize: 14, fontWeight: 600, textDecoration: "none",
              boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "translateY(-1px)"; (e.target as HTMLElement).style.boxShadow = "0 6px 20px rgba(37,99,235,0.4)"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "translateY(0)"; (e.target as HTMLElement).style.boxShadow = "0 4px 14px rgba(37,99,235,0.3)"; }}
          >
            Đăng ký miễn phí
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-menu-btn"
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, fontSize: 24 }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div style={{ background: "#fff", padding: "16px 24px", borderTop: "1px solid #E2E8F0" }} className="mobile-menu">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scroll(l.href)}
              style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "12px 0", fontSize: 16, fontWeight: 500, color: "#334155", cursor: "pointer" }}
            >
              {l.label}
            </button>
          ))}
          <a href="https://center.robokid.edu.vn" target="_blank" rel="noopener noreferrer"
            style={{ display: "block", textAlign: "center", background: "#2563EB", color: "#fff", padding: "12px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8 }}
          >
            Đăng ký hoàn toàn miễn phí
          </a>
        </div>
      )}
    </nav>
  );
};

/* ─── HERO ─── */
const Hero = () => {
  const stats = [
    { num: "3", label: "Sản phẩm" },
    { num: "96+", label: "Bảng dữ liệu" },
    { num: "5", label: "AI Characters" },
    { num: "0đ", label: "Phí sử dụng" },
  ];

  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: "linear-gradient(165deg, #EFF6FF 0%, #F8FAFC 40%, #FFF7ED 100%)",
      position: "relative", overflow: "hidden", paddingTop: 72,
    }}>
      <div style={{ position: "absolute", top: -120, right: -120, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.08), transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
          <div>
            <FadeIn>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 40,
                padding: "6px 16px", marginBottom: 24,
              }}>
                <span style={{ fontSize: 14 }}>🚀</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#2563EB" }}>Phần mềm quản lý trung tâm #1 Việt Nam</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 style={{
                fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 800,
                color: "#0F172A", lineHeight: 1.15, marginBottom: 20,
                letterSpacing: -1,
              }}>
                Quản lý trung tâm{" "}
                <span style={{
                  background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  thông minh
                </span>
                <br />với AI
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontSize: 18, color: "#64748B", lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
                Hệ sinh thái giáo dục toàn diện: Phần mềm quản lý trung tâm <strong style={{ color: "#059669" }}>HOÀN TOÀN MIỄN PHÍ</strong>, App học tiếng Anh với AI cho trẻ 6-10 tuổi, và nền tảng bài tập trực tuyến.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
                <a href="https://center.robokid.edu.vn" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                    color: "#fff", padding: "14px 28px", borderRadius: 12,
                    fontSize: 16, fontWeight: 600, textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
                    transition: "all 0.2s",
                  }}
                >
                  Đăng ký hoàn toàn miễn phí →
                </a>
                <button
                  onClick={() => document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "#fff", color: "#334155", padding: "14px 28px", borderRadius: 12,
                    fontSize: 16, fontWeight: 600, border: "1px solid #E2E8F0",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  Xem sản phẩm
                </button>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {stats.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: "#2563EB" }}>{s.num}</div>
                    <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div style={{
              position: "relative",
              background: "linear-gradient(145deg, #2563EB, #7C3AED)",
              borderRadius: 24, padding: 32,
              boxShadow: "0 20px 60px rgba(37,99,235,0.2)",
            }}>
              <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden" }}>
                <div style={{ background: "#F8FAFC", padding: "12px 20px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #E2E8F0" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
                  <span style={{ marginLeft: 12, fontSize: 12, color: "#94A3B8" }}>center.robokid.edu.vn</span>
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", marginBottom: 16 }}>📊 Dashboard Trung tâm</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                      { icon: "👨‍🎓", label: "Học sinh", val: "156", color: "#EFF6FF" },
                      { icon: "👩‍🏫", label: "Giáo viên", val: "12", color: "#F0FDF4" },
                      { icon: "📚", label: "Lớp học", val: "8", color: "#FFF7ED" },
                      { icon: "💰", label: "Doanh thu", val: "45.2M", color: "#FDF2F8" },
                    ].map((c, i) => (
                      <div key={i} style={{ background: c.color, borderRadius: 12, padding: "14px 16px" }}>
                        <div style={{ fontSize: 20 }}>{c.icon}</div>
                        <div style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>{c.label}</div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: "#1E293B" }}>{c.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, background: "#F8FAFC", borderRadius: 12, padding: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#64748B", marginBottom: 8 }}>Doanh thu 6 tháng</div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 60 }}>
                      {[35, 48, 42, 65, 55, 78].map((h, i) => (
                        <div key={i} style={{
                          flex: 1, height: `${h}%`, borderRadius: 4,
                          background: i === 5 ? "linear-gradient(to top, #2563EB, #60A5FA)" : "#E2E8F0",
                        }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                position: "absolute", top: -12, right: -12,
                background: "#10B981", color: "#fff", borderRadius: 12,
                padding: "8px 14px", fontSize: 13, fontWeight: 700,
                boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
              }}>
                MIỄN PHÍ ✨
              </div>
              <div style={{
                position: "absolute", bottom: 16, left: -16,
                background: "#fff", borderRadius: 12, padding: "10px 16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#FFF7ED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
                <div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>BIBO AI</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>Hỗ trợ 24/7</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

/* ─── PRODUCTS ─── */
const Products = () => {
  const products = [
    {
      icon: "🏫",
      title: "Center Portal",
      subtitle: "Phần mềm quản lý trung tâm",
      desc: "Quản lý học sinh, giáo viên, lớp học, tài chính, điểm danh, hóa đơn - tất cả trong một. Tích hợp AI hỗ trợ BIBO.",
      features: ["Quản lý học sinh & giáo viên", "Tài chính & hóa đơn", "Điểm danh thông minh", "AI hỗ trợ BIBO 24/7", "Báo cáo chi tiết", "Import/Export Excel"],
      color: "#2563EB",
      bg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
      url: "https://center.robokid.edu.vn",
      badge: "MIỄN PHÍ",
      badgeColor: "#059669",
    },
    {
      icon: "📱",
      title: "Student App",
      subtitle: "App học tiếng Anh cho trẻ",
      desc: "Ứng dụng học tiếng Anh với 5 nhân vật AI, nhận diện giọng nói, gamification - biến việc học thành cuộc phiêu lưu.",
      features: ["5 AI Characters (BIBO, WIKI...)", "Nhận diện & chấm phát âm", "Gamification (XP, Coins)", "Bài học theo chuẩn quốc tế", "Theo dõi tiến độ", "Đổi coins lấy quà thật"],
      color: "#7C3AED",
      bg: "linear-gradient(135deg, #F5F3FF, #EDE9FE)",
      url: "https://app.robokid.edu.vn",
      badge: "TỪ 199K/TH",
      badgeColor: "#7C3AED",
    },
    {
      icon: "📝",
      title: "Quiz Platform",
      subtitle: "Nền tảng bài tập trực tuyến",
      desc: "Giáo viên tạo bài tập, giao cho học sinh, chấm điểm tự động. Hỗ trợ nhiều dạng câu hỏi và media.",
      features: ["6 loại câu hỏi", "AI tạo đề tự động", "Chấm điểm tự động", "Báo cáo chi tiết", "Anti-cheat system", "Export kết quả Excel"],
      color: "#F59E0B",
      bg: "linear-gradient(135deg, #FFFBEB, #FEF3C7)",
      url: "https://baitap.robokid.edu.vn",
      badge: "MIỄN PHÍ",
      badgeColor: "#059669",
    },
  ];

  return (
    <section id="products" style={{ padding: "100px 24px", background: "#FAFBFC" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: 2 }}>Hệ sinh thái</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, color: "#0F172A", marginTop: 8, letterSpacing: -0.5 }}>
              3 sản phẩm, 1 hệ sinh thái
            </h2>
            <p style={{ fontSize: 17, color: "#64748B", marginTop: 12, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
              Tất cả kết nối liền mạch - Trung tâm quản lý, Giáo viên giao bài, Học sinh học tập
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="products-grid">
          {products.map((p, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div
                style={{
                  background: "#fff", borderRadius: 20, padding: 32,
                  border: "1px solid #E2E8F0",
                  transition: "all 0.3s ease", cursor: "pointer",
                  position: "relative", overflow: "hidden",
                  height: "100%", display: "flex", flexDirection: "column",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  position: "absolute", top: 16, right: 16,
                  background: p.badgeColor, color: "#fff",
                  borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700,
                }}>
                  {p.badge}
                </div>
                <div style={{
                  width: 56, height: 56, borderRadius: 14, background: p.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, marginBottom: 20,
                }}>
                  {p.icon}
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A" }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: p.color, fontWeight: 600, marginBottom: 12 }}>{p.subtitle}</p>
                <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>{p.desc}</p>
                <div style={{ marginBottom: 24, flex: 1 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ color: p.color, fontSize: 14, fontWeight: 700 }}>✓</span>
                      <span style={{ fontSize: 14, color: "#475569" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "block", textAlign: "center",
                    background: p.bg, color: p.color,
                    padding: "12px 20px", borderRadius: 10,
                    fontSize: 14, fontWeight: 600, textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  Khám phá {p.title} →
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── FEATURES ─── */
const Features = () => {
  const features = [
    { icon: "🤖", title: "AI Hỗ trợ BIBO", desc: "Chatbot AI thông minh hỗ trợ sử dụng phần mềm 24/7, trả lời mọi thắc mắc bằng tiếng Việt." },
    { icon: "📊", title: "Báo cáo tự động", desc: "Dashboard tổng quan, báo cáo tài chính, tiến độ học sinh - cập nhật real-time." },
    { icon: "💳", title: "Quản lý tài chính", desc: "Hóa đơn, phiếu thu/chi, công nợ, nhắc học phí - quản lý dòng tiền dễ dàng." },
    { icon: "📋", title: "Điểm danh thông minh", desc: "Giáo viên điểm danh trực tiếp, phụ huynh nhận thông báo qua App." },
    { icon: "🎯", title: "Giao & Chấm bài", desc: "Tạo bài tập, giao cho học sinh, AI chấm tự động, báo cáo chi tiết." },
    { icon: "📱", title: "Đa nền tảng", desc: "Hoạt động mượt mà trên máy tính, tablet và điện thoại. Truy cập mọi lúc." },
    { icon: "🔒", title: "Bảo mật dữ liệu", desc: "Dữ liệu được mã hóa, phân quyền theo vai trò, backup tự động hàng ngày." },
    { icon: "📥", title: "Import/Export", desc: "Nhập dữ liệu từ Excel, xuất báo cáo nhanh chóng. Hỗ trợ tiếng Việt đầy đủ." },
  ];

  return (
    <section id="features" style={{ padding: "100px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: 2 }}>Tính năng</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, color: "#0F172A", marginTop: 8, letterSpacing: -0.5 }}>
              Mọi thứ bạn cần để quản lý trung tâm
            </h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="features-grid">
          {features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div style={{
                padding: 24, borderRadius: 16, border: "1px solid #F1F5F9",
                background: "#fff", transition: "all 0.2s", height: "100%",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.borderColor = "#E2E8F0"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#F1F5F9"; }}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "#1E293B", marginBottom: 8 }}>{f.title}</h4>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── AI CHARACTERS ─── */
const Characters = () => {
  const chars = [
    { name: "BIBO", role: "Bạn đồng hành", emoji: "🤖", color: "#6C63FF", bg: "#EDE9FE", desc: "Hướng dẫn học tập, trò chuyện" },
    { name: "WIKI", role: "Cô giáo thông thái", emoji: "🦉", color: "#9C27B0", bg: "#F3E5F5", desc: "Giải thích ngữ pháp, từ vựng" },
    { name: "RACER", role: "Bạn thể thao", emoji: "🏎️", color: "#F44336", bg: "#FFEBEE", desc: "Thử thách tốc độ, phản xạ" },
    { name: "GAIA", role: "Nhà khám phá", emoji: "🌿", color: "#4CAF50", bg: "#E8F5E9", desc: "Học qua thiên nhiên, thế giới" },
    { name: "MIMI", role: "Bạn sáng tạo", emoji: "🐱", color: "#FF9800", bg: "#FFF3E0", desc: "Vẽ, hát, sáng tạo câu chuyện" },
  ];

  return (
    <section style={{ padding: "100px 24px", background: "linear-gradient(180deg, #FAFBFC, #fff)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#7C3AED", textTransform: "uppercase", letterSpacing: 2 }}>AI Characters</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, color: "#0F172A", marginTop: 8, letterSpacing: -0.5 }}>
              5 nhân vật AI đồng hành cùng bé
            </h2>
            <p style={{ fontSize: 17, color: "#64748B", marginTop: 12 }}>
              Mỗi nhân vật có tính cách & giọng nói riêng, giúp trẻ học tiếng Anh tự nhiên
            </p>
          </div>
        </FadeIn>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          {chars.map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                style={{
                  width: 200, padding: 24, borderRadius: 20,
                  background: "#fff", border: `2px solid ${c.bg}`,
                  textAlign: "center", transition: "all 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.color; e.currentTarget.style.transform = "translateY(-6px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.bg; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{
                  width: 72, height: 72, borderRadius: "50%", background: c.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 36, margin: "0 auto 14px",
                }}>
                  {c.emoji}
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: c.color }}>{c.name}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 6 }}>{c.role}</div>
                <div style={{ fontSize: 13, color: "#94A3B8" }}>{c.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── WORKFLOW ─── */
const Workflow = () => {
  const steps = [
    { num: "01", icon: "📝", title: "Đăng ký", desc: "Tạo tài khoản trung tâm miễn phí trong 30 giây" },
    { num: "02", icon: "📥", title: "Import dữ liệu", desc: "Nhập danh sách học sinh, giáo viên từ Excel" },
    { num: "03", icon: "🎓", title: "Bắt đầu quản lý", desc: "Quản lý lớp học, điểm danh, tài chính ngay lập tức" },
    { num: "04", icon: "💰", title: "Kiếm hoa hồng", desc: "Giới thiệu Student App, nhận 30% hoa hồng" },
  ];

  return (
    <section style={{ padding: "100px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#10B981", textTransform: "uppercase", letterSpacing: 2 }}>Bắt đầu</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, color: "#0F172A", marginTop: 8, letterSpacing: -0.5 }}>
              4 bước để bắt đầu
            </h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="steps-grid">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center", position: "relative" }}>
                <div style={{
                  fontSize: 48, fontWeight: 900, color: "#F1F5F9",
                  position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                  zIndex: 0,
                }}>
                  {s.num}
                </div>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%", background: "#EFF6FF",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, margin: "0 auto 16px", position: "relative", zIndex: 1,
                }}>
                  {s.icon}
                </div>
                <h4 style={{ fontSize: 17, fontWeight: 700, color: "#1E293B", marginBottom: 6 }}>{s.title}</h4>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── B2B CTA ─── */
const B2BCta = () => (
  <section style={{
    padding: "80px 24px",
    background: "linear-gradient(135deg, #1E3A5F 0%, #0F172A 100%)",
    position: "relative", overflow: "hidden",
  }}>
    <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
      <FadeIn>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)",
          borderRadius: 40, padding: "6px 16px", marginBottom: 24,
        }}>
          <span style={{ fontSize: 14 }}>🎁</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#34D399" }}>Dành cho trung tâm Anh ngữ</span>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>
          Phần mềm quản lý trung tâm<br />
          <span style={{ color: "#34D399" }}>HOÀN TOÀN MIỄN PHÍ</span>
        </h2>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p style={{ fontSize: 18, color: "#94A3B8", lineHeight: 1.7, marginBottom: 12 }}>
          Không phí setup. Không phí hàng tháng. Không giới hạn học sinh.
        </p>
        <p style={{ fontSize: 15, color: "#64748B", marginBottom: 36 }}>
          Trung tâm kiếm thêm thu nhập khi giới thiệu Student App cho phụ huynh
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 40, flexWrap: "wrap" }}>
          {[
            { num: "0đ", label: "Phí sử dụng" },
            { num: "∞", label: "Số học sinh" },
            { num: "24/7", label: "AI hỗ trợ" },
            { num: "30%", label: "Hoa hồng App" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#F59E0B" }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "#94A3B8" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.4}>
        <a href="https://center.robokid.edu.vn" target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg, #10B981, #059669)",
            color: "#fff", padding: "16px 36px", borderRadius: 14,
            fontSize: 17, fontWeight: 700, textDecoration: "none",
            boxShadow: "0 4px 20px rgba(16,185,129,0.3)",
          }}
        >
          Đăng ký ngay - Miễn phí vĩnh viễn
        </a>
      </FadeIn>
    </div>
  </section>
);

/* ─── PRICING ─── */
const Pricing = () => {
  const plans = [
    {
      name: "FREE", price: "0", period: "", desc: "Trải nghiệm cơ bản",
      features: ["3 bài học/ngày", "1 AI character (BIBO)", "Bài tập cơ bản", "Tiến độ học tập"],
      featured: false, color: "#64748B",
    },
    {
      name: "PRO", price: "199,000", period: "/tháng", desc: "Phổ biến nhất",
      features: ["Không giới hạn bài học", "3 AI characters", "Chấm phát âm AI", "Báo cáo chi tiết", "Tích xu đổi quà"],
      featured: true, color: "#2563EB",
    },
    {
      name: "PREMIUM", price: "399,000", period: "/tháng", desc: "Đầy đủ tính năng",
      features: ["Tất cả gói PRO", "5 AI characters", "Lộ trình cá nhân hóa", "Hỗ trợ ưu tiên", "Xu x2 mỗi ngày", "Offline mode"],
      featured: false, color: "#7C3AED",
    },
    {
      name: "FAMILY", price: "499,000", period: "/tháng", desc: "Tối đa 3 bé",
      features: ["Tất cả gói PREMIUM", "Thêm 2 profile bé", "Quản lý gia đình", "Ưu đãi đặc biệt"],
      featured: false, color: "#F59E0B",
    },
  ];

  return (
    <section id="pricing" style={{ padding: "100px 24px", background: "#FAFBFC" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: 2 }}>Student App</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, color: "#0F172A", marginTop: 8, letterSpacing: -0.5 }}>
              Bảng giá Student App
            </h2>
            <p style={{ fontSize: 17, color: "#64748B", marginTop: 12 }}>
              Center Portal & Quiz Platform <strong style={{ color: "#059669" }}>MIỄN PHÍ</strong> cho trung tâm
            </p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="pricing-grid">
          {plans.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                background: p.featured ? "linear-gradient(165deg, #2563EB, #1D4ED8)" : "#fff",
                borderRadius: 20, padding: 28,
                border: p.featured ? "none" : "1px solid #E2E8F0",
                boxShadow: p.featured ? "0 12px 40px rgba(37,99,235,0.2)" : "none",
                position: "relative", height: "100%",
                display: "flex", flexDirection: "column",
                transform: p.featured ? "scale(1.04)" : "none",
              }}>
                {p.featured && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: "#F59E0B", color: "#fff", borderRadius: 20,
                    padding: "4px 16px", fontSize: 12, fontWeight: 700,
                  }}>
                    PHỔ BIẾN NHẤT
                  </div>
                )}
                <div style={{ fontSize: 14, fontWeight: 700, color: p.featured ? "rgba(255,255,255,0.8)" : p.color }}>{p.name}</div>
                <div style={{ marginTop: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: p.featured ? "#fff" : "#0F172A" }}>
                    {p.price === "0" ? "Miễn phí" : `${p.price}đ`}
                  </span>
                  {p.period && <span style={{ fontSize: 14, color: p.featured ? "rgba(255,255,255,0.7)" : "#94A3B8" }}>{p.period}</span>}
                </div>
                <p style={{ fontSize: 13, color: p.featured ? "rgba(255,255,255,0.7)" : "#94A3B8", marginBottom: 20 }}>{p.desc}</p>
                <div style={{ flex: 1, marginBottom: 20 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ color: p.featured ? "#34D399" : "#10B981", fontWeight: 700, fontSize: 13 }}>✓</span>
                      <span style={{ fontSize: 14, color: p.featured ? "rgba(255,255,255,0.9)" : "#475569" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="https://app.robokid.edu.vn" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "block", textAlign: "center",
                    background: p.featured ? "#fff" : "#F1F5F9",
                    color: p.featured ? "#2563EB" : "#334155",
                    padding: "12px", borderRadius: 10,
                    fontSize: 14, fontWeight: 600, textDecoration: "none",
                  }}
                >
                  Bắt đầu ngay
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── CONTACT CTA ─── */
const ContactCta = () => (
  <section id="contact" style={{
    padding: "80px 24px",
    background: "linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 50%, #FFF7ED 100%)",
  }}>
    <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
      <FadeIn>
        <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.2, marginBottom: 16 }}>
          Sẵn sàng nâng cấp trung tâm?
        </h2>
        <p style={{ fontSize: 17, color: "#64748B", lineHeight: 1.7, marginBottom: 32 }}>
          Liên hệ ngay để được tư vấn miễn phí và hỗ trợ cài đặt trực tiếp
        </p>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 40 }}>
          <a href="tel:02633838883"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "#fff", color: "#1E293B", padding: "14px 28px", borderRadius: 14,
              fontSize: 16, fontWeight: 600, textDecoration: "none",
              border: "1px solid #E2E8F0", boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            }}
          >
            📞 Hotline: 0263.3838.883
          </a>
          <a href="https://zalo.me/02633838883"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "#0068FF", color: "#fff", padding: "14px 28px", borderRadius: 14,
              fontSize: 16, fontWeight: 600, textDecoration: "none",
            }}
          >
            💬 Chat Zalo
          </a>
        </div>
      </FadeIn>
      <FadeIn delay={0.25}>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          {[
            { icon: "📧", label: "support@robokid.edu.vn" },
            { icon: "📍", label: "Đà Lạt, Lâm Đồng" },
            { icon: "🌐", label: "robokid.edu.vn" },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span>{c.icon}</span>
              <span style={{ fontSize: 14, color: "#64748B" }}>{c.label}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ─── FOOTER ─── */
const Footer = () => (
  <footer style={{ background: "#0F172A", padding: "60px 24px 32px", color: "#94A3B8" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }} className="footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, color: "#fff", fontWeight: 800,
            }}>R</div>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>ROBO-KID</span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 300 }}>
            Hệ sinh thái giáo dục tiếng Anh cho trẻ em Việt Nam. Kết nối Trung tâm - Giáo viên - Học sinh - Phụ huynh.
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Sản phẩm</h4>
          {[
            { label: "Center Portal", url: "https://center.robokid.edu.vn" },
            { label: "Student App", url: "https://app.robokid.edu.vn" },
            { label: "Quiz Platform", url: "https://baitap.robokid.edu.vn" },
          ].map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", color: "#94A3B8", textDecoration: "none", fontSize: 14, marginBottom: 10 }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = "#fff"}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = "#94A3B8"}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Công ty</h4>
          {[
            { label: "Về chúng tôi", url: "#" },
            { label: "Chính sách bảo mật", url: "/privacy/" },
            { label: "Điều khoản sử dụng", url: "/terms/" },
          ].map((l, i) => (
            <a key={i} href={l.url} style={{ display: "block", color: "#94A3B8", textDecoration: "none", fontSize: 14, marginBottom: 10 }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = "#fff"}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = "#94A3B8"}
            >{l.label}</a>
          ))}
        </div>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Liên hệ</h4>
          <p style={{ fontSize: 14, marginBottom: 8 }}>📞 0263.3838.883</p>
          <p style={{ fontSize: 14, marginBottom: 8 }}>📧 support@robokid.edu.vn</p>
          <p style={{ fontSize: 14, marginBottom: 8 }}>📍 Đà Lạt, Lâm Đồng</p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #1E293B", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 13 }}>© 2026 ROBO-KID Academy. All rights reserved.</p>
        <p style={{ fontSize: 13 }}>Made with ❤️ in Đà Lạt, Vietnam</p>
      </div>
    </div>
  </footer>
);

/* ─── MAIN APP ─── */
export default function App() {
  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', -apple-system, sans-serif", color: "#1E293B" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .products-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr 1fr !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .features-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 601px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Products />
      <Features />
      <Characters />
      <Workflow />
      <B2BCta />
      <Pricing />
      <ContactCta />
      <Footer />
    </div>
  );
}
