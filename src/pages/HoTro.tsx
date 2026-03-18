import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/* ─── HOOKS (duplicated from App.tsx for self-contained page) ─── */
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

/* ─── MINI NAVBAR ─── */
const HoTroNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.98)",
      backdropFilter: "blur(12px)",
      boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "0 1px 0 #E2E8F0",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="/logo-48.png" alt="ROBO-KID" style={{ width: 42, height: 42, objectFit: "contain" }} />
          <span style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", letterSpacing: -0.5 }}>
            ROBO<span style={{ color: "#2563EB" }}>-</span>KID
          </span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="hotro-desktop-nav">
          <a href="/"
            style={{ fontSize: 15, fontWeight: 500, color: "#475569", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2563EB")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
          >
            ← Trang chủ
          </a>
          <a href="/#products"
            style={{ fontSize: 15, fontWeight: 500, color: "#475569", textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2563EB")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
          >
            Sản phẩm
          </a>
          <a href="/#pricing"
            style={{ fontSize: 15, fontWeight: 500, color: "#475569", textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2563EB")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
          >
            Bảng giá
          </a>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#2563EB" }}>Hỗ trợ</span>
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
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,99,235,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(37,99,235,0.3)"; }}
          >
            Đăng ký miễn phí
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="hotro-mobile-btn"
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, fontSize: 24 }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div style={{ background: "#fff", padding: "16px 24px", borderTop: "1px solid #E2E8F0" }}>
          {[
            { label: "← Trang chủ", href: "/" },
            { label: "Sản phẩm", href: "/#products" },
            { label: "Bảng giá", href: "/#pricing" },
          ].map((l) => (
            <a key={l.href} href={l.href}
              style={{ display: "block", padding: "12px 0", fontSize: 16, fontWeight: 500, color: "#334155", textDecoration: "none" }}
            >
              {l.label}
            </a>
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

/* ─── HERO + SEARCH ─── */
const HoTroHero = () => {
  const [searchVal, setSearchVal] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const suggestions = [
    "Thêm học sinh", "Import Excel", "Tạo hóa đơn", "Điểm danh",
    "Tạo lớp học", "Đăng nhập GV", "Xem báo cáo", "Quên mật khẩu",
  ];

  const filtered = searchVal.length > 0
    ? suggestions.filter(s => s.toLowerCase().includes(searchVal.toLowerCase()))
    : [];

  return (
    <section style={{
      paddingTop: 72, minHeight: 320,
      background: "linear-gradient(165deg, #EFF6FF 0%, #F8FAFC 50%, #F5F3FF 100%)",
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.07), transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.06), transparent 70%)" }} />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px", width: "100%", textAlign: "center" }}>
        <FadeIn>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#fff", border: "1px solid #BFDBFE", borderRadius: 40,
            padding: "8px 20px", marginBottom: 24,
            boxShadow: "0 2px 12px rgba(37,99,235,0.08)",
          }}>
            <span style={{ fontSize: 22 }}>🤖</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#2563EB" }}>Trung tâm Hỗ trợ ROBO-KID</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 style={{
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800,
            color: "#0F172A", lineHeight: 1.15, marginBottom: 16, letterSpacing: -0.5,
          }}>
            Chúng tôi luôn sẵn sàng{" "}
            <span style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              giúp bạn
            </span>
          </h1>
          <p style={{ fontSize: 17, color: "#64748B", lineHeight: 1.7, marginBottom: 36 }}>
            Tìm hướng dẫn sử dụng, video tutorial và câu trả lời cho mọi thắc mắc
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}>
            <div style={{
              display: "flex", alignItems: "center",
              background: "#fff",
              border: `2px solid ${searchFocused ? "#2563EB" : "#E2E8F0"}`,
              borderRadius: 16, padding: "4px 4px 4px 20px",
              boxShadow: searchFocused ? "0 0 0 4px rgba(37,99,235,0.12)" : "0 4px 20px rgba(0,0,0,0.06)",
              transition: "all 0.2s",
            }}>
              <span style={{ fontSize: 20, marginRight: 12, color: "#94A3B8" }}>🔍</span>
              <input
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                placeholder="Tìm kiếm hướng dẫn... VD: import học sinh, tạo hóa đơn"
                style={{
                  flex: 1, border: "none", outline: "none",
                  fontSize: 15, color: "#1E293B", background: "transparent",
                  padding: "12px 0",
                }}
              />
              <button style={{
                background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                color: "#fff", border: "none", borderRadius: 12,
                padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}>
                Tìm
              </button>
            </div>

            {filtered.length > 0 && searchFocused && (
              <div style={{
                position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
                background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0",
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)", zIndex: 100, overflow: "hidden",
              }}>
                {filtered.map((s, i) => (
                  <button key={i} onClick={() => setSearchVal(s)}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "12px 20px", background: "none", border: "none",
                      fontSize: 14, color: "#334155", cursor: "pointer",
                      borderBottom: i < filtered.length - 1 ? "1px solid #F1F5F9" : "none",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#F8FAFC"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                  >
                    🔍 {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
            {["Import Excel", "Thu học phí", "Điểm danh", "Tạo lớp học"].map((tag, i) => (
              <button key={i} onClick={() => setSearchVal(tag)}
                style={{
                  background: "#fff", border: "1px solid #DBEAFE", borderRadius: 20,
                  padding: "6px 14px", fontSize: 13, color: "#2563EB", fontWeight: 500, cursor: "pointer",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#EFF6FF"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
              >
                {tag}
              </button>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ─── VIDEO HƯỚNG DẪN ─── */
const VideoSection = () => {
  type Video =
    | { youtubeId: string; title: string; duration: string; tag: string; tagColor: string }
    | { youtubeId: null; title: string; duration: string; tag: string; tagColor: string };

  const videos: Video[] = [
    { youtubeId: "6BE_5Osr5sU", title: "Hướng dẫn đăng ký & đăng nhập", duration: "4:45", tag: "Bắt đầu", tagColor: "#2563EB" },
    { youtubeId: null, title: "Import dữ liệu học sinh từ Excel", duration: "Sắp ra mắt", tag: "Import", tagColor: "#7C3AED" },
    { youtubeId: null, title: "Tạo lớp học và xếp lịch học", duration: "Sắp ra mắt", tag: "Lớp học", tagColor: "#0891B2" },
    { youtubeId: null, title: "Thu học phí và tạo hóa đơn tự động", duration: "Sắp ra mắt", tag: "Tài chính", tagColor: "#059669" },
    { youtubeId: null, title: "Điểm danh và gửi thông báo phụ huynh", duration: "Sắp ra mắt", tag: "Điểm danh", tagColor: "#D97706" },
    { youtubeId: null, title: "Quản lý giáo viên và phân công lớp", duration: "Sắp ra mắt", tag: "Giáo viên", tagColor: "#DC2626" },
    { youtubeId: null, title: "Xem báo cáo và thống kê trung tâm", duration: "Sắp ra mắt", tag: "Báo cáo", tagColor: "#7C3AED" },
    { youtubeId: null, title: "Cài đặt App học sinh & kết nối phụ huynh", duration: "Sắp ra mắt", tag: "Student App", tagColor: "#2563EB" },
  ];

  return (
    <section style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 48 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#2563EB", textTransform: "uppercase" as const, letterSpacing: 2 }}>Tutorial</span>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#0F172A", marginTop: 8, letterSpacing: -0.5 }}>
              📹 Video hướng dẫn
            </h2>
            <p style={{ fontSize: 16, color: "#64748B", marginTop: 8 }}>
              Học nhanh qua video — mỗi video dưới 7 phút
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="hotro-video-grid">
          {videos.map((v, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div style={{
                borderRadius: 16, overflow: "hidden",
                border: `1px solid ${v.youtubeId ? "#BFDBFE" : "#E2E8F0"}`,
                background: "#fff",
                transition: "all 0.3s",
                boxShadow: v.youtubeId ? "0 4px 20px rgba(37,99,235,0.08)" : "none",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = v.youtubeId ? "0 4px 20px rgba(37,99,235,0.08)" : "none"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {/* Video area */}
                {v.youtubeId ? (
                  /* Real YouTube embed */
                  <div style={{ position: "relative", paddingBottom: "56.25%", background: "#000" }}>
                    <iframe
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                      src={`https://www.youtube.com/embed/${v.youtubeId}`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  /* Coming-soon placeholder */
                  <div style={{
                    position: "relative", paddingBottom: "56.25%",
                    background: "linear-gradient(135deg, #F1F5F9, #E2E8F0)",
                  }}>
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center",
                      gap: 10,
                    }}>
                      <div style={{
                        width: 52, height: 52, borderRadius: "50%",
                        background: "rgba(148,163,184,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: "2px solid rgba(148,163,184,0.3)",
                      }}>
                        <span style={{ fontSize: 22, opacity: 0.5 }}>▶</span>
                      </div>
                      <span style={{
                        fontSize: 12, fontWeight: 600,
                        color: "#94A3B8",
                        background: "#fff",
                        border: "1px solid #E2E8F0",
                        borderRadius: 20, padding: "4px 12px",
                      }}>
                        🎬 Sắp ra mắt
                      </span>
                    </div>
                    <div style={{
                      position: "absolute", top: 12, left: 12,
                      background: v.tagColor, color: "#fff",
                      borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700,
                      opacity: 0.7,
                    }}>
                      {v.tag}
                    </div>
                  </div>
                )}

                <div style={{ padding: "14px 18px" }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: v.youtubeId ? "#1E293B" : "#94A3B8", lineHeight: 1.4, marginBottom: 6 }}>
                    {v.title}
                  </h4>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {v.youtubeId ? (
                      <>
                        <span style={{ fontSize: 11, color: "#94A3B8" }}>⏱ {v.duration}</span>
                        <span style={{ fontSize: 11, color: "#CBD5E1" }}>•</span>
                        <a
                          href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: 11, color: "#2563EB", fontWeight: 600, textDecoration: "none" }}
                        >
                          Xem trên YouTube →
                        </a>
                      </>
                    ) : (
                      <span style={{ fontSize: 11, color: "#CBD5E1" }}>Đang sản xuất...</span>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <a href={`https://www.youtube.com/watch?v=6BE_5Osr5sU`} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#FF0000", color: "#fff",
                padding: "12px 28px", borderRadius: 10,
                fontSize: 14, fontWeight: 600, textDecoration: "none",
                boxShadow: "0 4px 14px rgba(255,0,0,0.25)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,0,0,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(255,0,0,0.25)"; }}
            >
              📺 Xem video trên YouTube →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ─── HƯỚNG DẪN NHANH ─── */
const QuickGuideSection = () => {
  const guides = [
    {
      icon: "🔑",
      title: "Đăng nhập lần đầu",
      desc: "Tạo tài khoản trung tâm, xác thực email và thiết lập thông tin cơ bản.",
      steps: ["Vào center.robokid.edu.vn", "Nhấn Đăng ký", "Điền thông tin trung tâm", "Xác nhận email"],
      color: "#2563EB",
      bg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
    },
    {
      icon: "👨‍🎓",
      title: "Thêm học sinh",
      desc: "Thêm học sinh thủ công hoặc import hàng loạt từ file Excel.",
      steps: ["Vào menu Học viên", "Nhấn + Thêm học sinh", "Hoặc Import → ALL-IN-ONE", "Điền Họ tên + Tên lớp"],
      color: "#7C3AED",
      bg: "linear-gradient(135deg, #F5F3FF, #EDE9FE)",
    },
    {
      icon: "🏫",
      title: "Tạo lớp học",
      desc: "Tạo lớp mới, gán giáo viên, phòng học và thiết lập lịch học.",
      steps: ["Vào menu Lớp học", "Nhấn + Thêm lớp", "Chọn GV + Phòng + Ca học", "Nhấn Lưu"],
      color: "#059669",
      bg: "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
    },
    {
      icon: "👩‍🏫",
      title: "Thêm giáo viên",
      desc: "Tạo tài khoản giáo viên để họ đăng nhập và quản lý lớp của mình.",
      steps: ["Vào menu Giáo viên", "Nhấn + Thêm giáo viên", "Điền Tên + Email + SĐT", "GV nhận email xác thực"],
      color: "#D97706",
      bg: "linear-gradient(135deg, #FFFBEB, #FEF3C7)",
    },
    {
      icon: "✅",
      title: "Điểm danh",
      desc: "Điểm danh học sinh theo lớp, theo ngày với 4 trạng thái khác nhau.",
      steps: ["Vào Lớp học → Chọn lớp", "Nhấn icon 📋 Điểm danh", "Chọn ngày điểm danh", "Đánh dấu + Lưu"],
      color: "#0891B2",
      bg: "linear-gradient(135deg, #ECFEFF, #CFFAFE)",
    },
    {
      icon: "📊",
      title: "Xem báo cáo",
      desc: "Xem thống kê học sinh, doanh thu, điểm danh và tình trạng công nợ.",
      steps: ["Vào menu Báo cáo", "Chọn loại: HS / Lớp / Tài chính", "Lọc theo thời gian", "Export Excel nếu cần"],
      color: "#7C3AED",
      bg: "linear-gradient(135deg, #F5F3FF, #EDE9FE)",
    },
  ];

  const [expandedGuide, setExpandedGuide] = useState<number | null>(null);

  return (
    <section style={{ padding: "80px 24px", background: "#FAFBFC" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 48 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#2563EB", textTransform: "uppercase" as const, letterSpacing: 2 }}>Hướng dẫn</span>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#0F172A", marginTop: 8, letterSpacing: -0.5 }}>
              ⚡ Hướng dẫn nhanh
            </h2>
            <p style={{ fontSize: 16, color: "#64748B", marginTop: 8 }}>
              Các thao tác phổ biến nhất — nhấn vào card để xem các bước chi tiết
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="hotro-guides-grid">
          {guides.map((g, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div
                onClick={() => setExpandedGuide(expandedGuide === i ? null : i)}
                style={{
                  background: "#fff", borderRadius: 16, padding: 24,
                  border: `2px solid ${expandedGuide === i ? g.color : "#E2E8F0"}`,
                  cursor: "pointer", transition: "all 0.25s",
                  boxShadow: expandedGuide === i ? `0 8px 24px ${g.color}22` : "none",
                }}
                onMouseEnter={(e) => { if (expandedGuide !== i) e.currentTarget.style.borderColor = "#CBD5E1"; }}
                onMouseLeave={(e) => { if (expandedGuide !== i) e.currentTarget.style.borderColor = "#E2E8F0"; }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, background: g.bg,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
                  }}>
                    {g.icon}
                  </div>
                  <span style={{
                    fontSize: 18, color: expandedGuide === i ? g.color : "#94A3B8",
                    transition: "transform 0.25s, color 0.25s",
                    transform: expandedGuide === i ? "rotate(180deg)" : "rotate(0deg)",
                    display: "inline-block",
                  }}>
                    ▾
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>{g.title}</h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, marginBottom: expandedGuide === i ? 16 : 0 }}>{g.desc}</p>

                {expandedGuide === i && (
                  <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 16 }}>
                    {g.steps.map((step, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <div style={{
                          minWidth: 24, height: 24, borderRadius: "50%",
                          background: g.bg, display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 12, fontWeight: 800, color: g.color,
                        }}>
                          {j + 1}
                        </div>
                        <span style={{ fontSize: 13, color: "#334155", lineHeight: 1.4 }}>{step}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── FAQ ─── */
const FaqSection = () => {
  const faqs = [
    {
      q: "Center Portal có mất phí không?",
      a: "Center Portal HOÀN TOÀN MIỄN PHÍ cho trung tâm Anh ngữ. Không phí setup, không phí hàng tháng, không giới hạn số học sinh hay giáo viên. Trung tâm kiếm thêm thu nhập khi giới thiệu Student App cho phụ huynh (30% hoa hồng).",
    },
    {
      q: "Làm sao để import dữ liệu học sinh từ phần mềm cũ?",
      a: "Dùng tính năng Import ALL-IN-ONE: Học viên → Import ▼ → Import ALL-IN-ONE. Tải template Excel, điền dữ liệu (chỉ cần Họ tên + Tên lớp là bắt buộc), upload lên. Hệ thống tự động tạo lớp, gán giáo viên và ghi danh học sinh. Lưu ý: Import giáo viên TRƯỚC khi import ALL-IN-ONE.",
    },
    {
      q: "Giáo viên đăng nhập bằng tài khoản nào?",
      a: "Admin tạo tài khoản GV trong menu Giáo viên → Thêm mới (điền Email). Hệ thống tự gửi email xác thực đến GV. GV click link trong email để tạo mật khẩu và đăng nhập. Giáo viên thấy: Lớp của tôi, Điểm danh, Giao bài.",
    },
    {
      q: "Phụ huynh theo dõi con học qua đâu?",
      a: "Phụ huynh tải Student App (app.robokid.edu.vn) hoặc vào web. Đăng ký bằng email → OTP xác thực. Sau đó Admin gửi MÃ LIÊN KẾT (partner_code) cho PH → PH nhập trong app để liên kết con với trung tâm. PH xem được: lịch học, điểm danh, bài tập, thông báo, học phí.",
    },
    {
      q: "Dữ liệu có được sao lưu không? Nếu mất điện thì sao?",
      a: "Dữ liệu lưu trên cloud Supabase (không phải máy tính của bạn), nên mất điện, hỏng máy đều không ảnh hưởng. Khuyến nghị: Export Excel định kỳ để có bản backup thêm. Nếu cần khôi phục dữ liệu bất thường, liên hệ support@robokid.edu.vn.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 48 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#2563EB", textTransform: "uppercase" as const, letterSpacing: 2 }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#0F172A", marginTop: 8, letterSpacing: -0.5 }}>
              ❓ Câu hỏi thường gặp
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div style={{
                borderRadius: 14, border: `1px solid ${openIndex === i ? "#BFDBFE" : "#E2E8F0"}`,
                overflow: "hidden", transition: "border-color 0.2s",
                background: openIndex === i ? "#FAFEFF" : "#fff",
              }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: "100%", textAlign: "left" as const,
                    padding: "20px 24px", background: "none", border: "none",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 600, color: "#1E293B", lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{
                    fontSize: 18, color: openIndex === i ? "#2563EB" : "#94A3B8",
                    transition: "transform 0.25s, color 0.25s",
                    transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                    display: "inline-block", flexShrink: 0,
                  }}>
                    ▾
                  </span>
                </button>

                {openIndex === i && (
                  <div style={{
                    padding: "0 24px 20px",
                    fontSize: 15, color: "#475569", lineHeight: 1.75,
                    borderTop: "1px solid #EFF6FF",
                  }}>
                    <div style={{ paddingTop: 16 }}>{faq.a}</div>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div style={{
            marginTop: 40, padding: 28,
            background: "linear-gradient(135deg, #EFF6FF, #F5F3FF)",
            borderRadius: 16, border: "1px solid #DBEAFE",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>🤖</div>
            <h4 style={{ fontSize: 17, fontWeight: 700, color: "#1E293B", marginBottom: 8 }}>Không tìm thấy câu trả lời?</h4>
            <p style={{ fontSize: 14, color: "#64748B", marginBottom: 20 }}>
              BIBO AI hỗ trợ bạn 24/7 ngay trong phần mềm Center Portal
            </p>
            <a href="https://center.robokid.edu.vn" target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                color: "#fff", padding: "12px 28px", borderRadius: 10,
                fontSize: 14, fontWeight: 600, textDecoration: "none",
              }}
            >
              Hỏi BIBO ngay →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ─── LIÊN HỆ ─── */
const ContactSection = () => {
  const contacts = [
    {
      icon: "📱",
      title: "Nhóm Telegram hỗ trợ",
      desc: "Chat trực tiếp với đội ngũ và cộng đồng admin ROBO-KID",
      action: "Tham gia nhóm →",
      href: "https://t.me/robokid_support",
      color: "#0088CC",
      bg: "linear-gradient(135deg, #E8F4FD, #D0E8F7)",
    },
    {
      icon: "🏫",
      title: "Center Portal",
      desc: "Đăng nhập để sử dụng BIBO AI hỗ trợ ngay trong phần mềm 24/7",
      action: "Vào Center Portal →",
      href: "https://center.robokid.edu.vn",
      color: "#2563EB",
      bg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
    },
    {
      icon: "📧",
      title: "Email hỗ trợ",
      desc: "Gửi mô tả vấn đề chi tiết, đội ngũ phản hồi trong 24 giờ làm việc",
      action: "support@robokid.edu.vn",
      href: "mailto:support@robokid.edu.vn",
      color: "#059669",
      bg: "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
    },
    {
      icon: "📞",
      title: "Hotline",
      desc: "Gọi trực tiếp trong giờ hành chính (8h–17h, thứ Hai–Thứ Sáu)",
      action: "0263.3838.883",
      href: "tel:02633838883",
      color: "#D97706",
      bg: "linear-gradient(135deg, #FFFBEB, #FEF3C7)",
    },
  ];

  return (
    <section style={{ padding: "80px 24px", background: "#FAFBFC" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#2563EB", textTransform: "uppercase" as const, letterSpacing: 2 }}>Liên hệ</span>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#0F172A", marginTop: 8, letterSpacing: -0.5 }}>
              💬 Liên hệ hỗ trợ
            </h2>
            <p style={{ fontSize: 16, color: "#64748B", marginTop: 8 }}>
              Nhiều kênh hỗ trợ — chọn cách phù hợp nhất với bạn
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }} className="hotro-contact-grid">
          {contacts.map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "flex-start", gap: 20,
                  background: "#fff", borderRadius: 16, padding: 28,
                  border: "1px solid #E2E8F0", textDecoration: "none",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "#BFDBFE"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#E2E8F0"; }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 14, background: c.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: "#1E293B", marginBottom: 6 }}>{c.title}</h4>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, marginBottom: 10 }}>{c.desc}</p>
                  <span style={{ fontSize: 14, fontWeight: 600, color: c.color }}>{c.action}</span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── FOOTER ─── */
const HoTroFooter = () => (
  <footer style={{ background: "#0F172A", padding: "40px 24px", color: "#94A3B8" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, #2563EB, #7C3AED)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, color: "#fff", fontWeight: 800,
        }}>R</div>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>ROBO-KID</span>
        <span style={{ fontSize: 13, color: "#475569" }}>/ Hỗ trợ</span>
      </div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <a href="/" style={{ fontSize: 13, color: "#64748B", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
        >← Trang chủ</a>
        <a href="https://center.robokid.edu.vn" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 13, color: "#64748B", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
        >Center Portal</a>
        <a href="mailto:support@robokid.edu.vn"
          style={{ fontSize: 13, color: "#64748B", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
        >support@robokid.edu.vn</a>
      </div>
      <p style={{ fontSize: 13 }}>© 2026 ROBO-KID Academy. All rights reserved.</p>
    </div>
  </footer>
);

/* ─── PAGE EXPORT ─── */
export default function HoTro() {
  useEffect(() => {
    document.title = "Hỗ trợ | ROBO-KID Academy";
  }, []);

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', -apple-system, sans-serif", color: "#1E293B" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        @media (max-width: 900px) {
          .hotro-video-grid { grid-template-columns: 1fr !important; }
          .hotro-guides-grid { grid-template-columns: 1fr 1fr !important; }
          .hotro-contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .hotro-guides-grid { grid-template-columns: 1fr !important; }
          .hotro-desktop-nav { display: none !important; }
          .hotro-mobile-btn { display: block !important; }
        }
        @media (min-width: 601px) {
          .hotro-mobile-menu { display: none !important; }
        }
      `}</style>
      <HoTroNavbar />
      <HoTroHero />
      <VideoSection />
      <QuickGuideSection />
      <FaqSection />
      <ContactSection />
      <HoTroFooter />
    </div>
  );
}
