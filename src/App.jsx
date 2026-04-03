import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { 
  Phone, 
  Droplets, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Camera, 
  Search, 
  CheckCircle2, 
  AlertTriangle,
  MapPin, 
  FileText
} from 'lucide-react';

/**
 * [환경 변수 안전 로드 함수]
 */
const getEnv = (key) => {
  try {
    return import.meta.env[key] || "";
  } catch (e) {
    return "";
  }
};

// Firebase 초기화 설정
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY'),
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('VITE_FIREBASE_APP_ID')
};

const finalConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : firebaseConfig;

let app, auth, db;
try {
  app = initializeApp(finalConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (e) {
  console.error("Firebase initialization failed", e);
}

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const phoneNumber = "010-8678-0965";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!auth) return;
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (e) {
        console.error("Auth Error:", e);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const features = [
    { icon: <Clock className="w-8 h-8 text-blue-500" />, title: "365일 24시간", desc: "주말/야간 긴급출동 대기" },
    { icon: <MapPin className="w-8 h-8 text-blue-500" />, title: "신속한 방문", desc: "광주 전지역 30분 출동" },
    { icon: <Search className="w-8 h-8 text-blue-500" />, title: "최신장비 보유", desc: "배관내시경, 관로탐지기 등" },
    { icon: <ShieldCheck className="w-8 h-8 text-blue-500" />, title: "책임 해결", desc: "타업체 실패 현장 100% 해결" }
  ];

  const services = [
    {
      title: "누수 탐지 및 공사",
      desc: <>원인 모를 누수 <br /> 최신 청음/가스 탐지기로 <br />정확히 찾아냅니다.</>,
      tags: ["아파트누수", "미세누수", "배관누수", "천장누수", "누수보험처리"],
      icon: <Droplets className="w-8 h-8 md:w-10 md:h-10 text-cyan-500" />
    },
    {
      title: "하수구 및 변기 막힘",
      desc: <>단순 뚫기가 아닌 <br />내시경 카메라로<br /> 근본 원인을 제거합니다.</>,
      tags: ["변기/싱크대", "하수구/배관", "악취 제거", "역류 해결"],
      icon: <Wrench className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
    },
    {
      title: "고압세척 및 준설",
      desc: <>기름 슬러지, 시멘트 등 <br />굳어버린 배관을 <br />새것처럼 청소합니다.</>,
      tags: ["상가/식당", "오수관/우수관", "공장/아파트", "특수청소"],
      icon: <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-red-500" />
    },
    {
      title: "방수 및 종합 설비",
      desc: <>오랜 노하우로 <br />물 한 방울 새지 않는 <br />완벽한 시공을 약속합니다.</>,
      tags: ["화장실 방수", "옥상 방수", "배관 공사", "수전 교체"],
      icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" />
    }
  ];

  const beforeAfter = [
    { 
      title: <>식당 주방 바닥 <br />그리스트랩 막힘 해결</>, 
      desc: "기름때로 꽉 막힌 배관을 스케일링 및 석션 장비로 완벽 복원",
      beforeImg: "/b1.jpg", 
      afterImg: "/a1.jpg" 
    },
    { 
      title: "주택 벽 누수 문제 해결", 
      desc: "관로탐지로 원인을 정확히 찾고 배관 재연결 작업을 통해 완벽 해결",
      beforeImg: "/b2.jpg", 
      afterImg: "/a2.jpg" 
    },
    { 
      title: <>화장실 변기 오수관 <br />역류 해결</>, 
      desc: "배관 스케일링 작업 진행. 내시경 확인 후 시멘트 및 이물질 완벽 제거",
      beforeImg: "/b3.jpg", 
      afterImg: "/a3.jpg" 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 md:pb-0">
      <div className="bg-red-600 text-white text-sm font-bold py-2 text-center px-4 animate-pulse sticky top-0 z-[60]">
        🚨 전지역 27분 빠른 출동! 🚨
      </div>

      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3 top-0' : 'bg-white/95 py-4 top-9'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <span className="text-2xl font-black text-blue-700 tracking-tight">진설비</span>      
          </div>
          <div className="hidden md:flex space-x-8 font-bold text-slate-700 text-sm">
            <a href="#services" className="hover:text-blue-600">전문분야</a>
            <a href="#portfolio" className="hover:text-blue-600">시공사례</a>
            <a href="#insurance" className="hover:text-blue-600">누수보험</a>
          </div>
          <a href={`tel:${phoneNumber}`} className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-700 transition shadow-lg text-xs md:text-sm">
            <Phone className="w-4 h-4 mr-2" /> {phoneNumber}
          </a>
        </div>
      </nav>

      <section className="relative pt-64 pb-20 lg:pt-80 lg:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-top opacity-40 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/80 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-8">
            <CheckCircle2 size={16} /> <span>광주 전지역 출동 · 타 업체 실패 현장 전문</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-10 tracking-tight flex flex-col gap-2 lg:gap-3 mx-auto w-fit text-left text-shadow-lg">
            <span>막힌 곳은 <span className="text-blue-400">시원하게</span></span>
            <span>새는 곳은 <span className="text-red-400">완벽하게</span></span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-medium break-keep text-center">
            최신 배관내시경, 고압세척기, 관로탐지기<br className="block"/>
            100% 자체 보유<br className="block"/>
            단순 뚫기가 아닌 근본 원인을 찾아<br className="block"/>
            재발 없는 시공을 약속합니다
          </p>

          {/* 수정 완료: map.png 확장자로 업데이트 */}
          <div className="w-full max-w-2xl bg-yellow-400 text-slate-950 p-6 md:p-8 rounded-2xl mb-12 shadow-2xl border-4 border-yellow-300 animate-in fade-in zoom-in duration-700">
            <div className="flex flex-col gap-4 text-center">
              <img 
                src="/map.png" 
                alt="광주 전지역 출동 지도" 
                className="w-full max-w-[320px] mx-auto mb-2 rounded-xl"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black leading-tight">✅ 365일 24시간 긴급상담, 긴급출동</span>
                <span className="text-sm md:text-base font-bold opacity-80 mt-1">(새벽 문의도 OK)</span>
              </div>
              <div className="h-px bg-slate-900/10 w-2/3 mx-auto"></div>
              <span className="text-xl md:text-2xl font-black">✅ 출장비 0원, 미해결시 0원</span>
              <div className="h-px bg-slate-900/10 w-2/3 mx-auto"></div>
              <span className="text-xl md:text-2xl font-black">✅ 1,000건 이상 해결한 전문가 출동</span>
            </div>
          </div>

          <a href={`tel:${phoneNumber}`} className="w-full max-w-md bg-red-600 text-white px-8 py-5 rounded-2xl font-black text-xl hover:bg-red-700 transition flex items-center justify-center shadow-2xl shadow-red-600/30">
            <Phone className="mr-3 w-6 h-6 animate-bounce" /> 긴급 출동 전화 연결
          </a>
        </div>
      </section>

      <section className="py-12 bg-white relative -mt-10 mx-4 md:mx-auto max-w-7xl rounded-[2.5rem] shadow-2xl z-20 border border-slate-100">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6">
          {features.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4 border-r last:border-0 border-slate-100">
              <div className="bg-blue-50 p-3 rounded-2xl mb-4 text-blue-600">{item.icon}</div>
              <h3 className="font-black text-slate-900 mb-1">{item.title}</h3>
              <p className="text-[11px] text-slate-500 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 전문분야 (Services) 섹션 */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3 block">Our Services</span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900">어떤 문제가 발생했나요?</h2>
            <p className="text-slate-500 text-lg font-medium">아파트부터 가정집, 상가, 공장까지 <br className="block"/>규모와 증상에 맞는 <br className="block"/>맞춤형 첨단 장비가 투입됩니다.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-slate-50 p-4 md:p-8 rounded-3xl md:rounded-[2.5rem] hover:bg-blue-50 transition-colors duration-300 border border-slate-100 group">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6 text-center md:text-left">
                  <div className="bg-white p-3 md:p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="w-full">
                    <h3 className="text-sm md:text-2xl font-black mb-2 md:mb-3 text-slate-900 break-keep">{service.title}</h3>
                    <p className="text-xs md:text-base text-slate-600 mb-3 md:mb-4 font-medium leading-relaxed break-keep line-clamp-3 md:line-clamp-none">{service.desc}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-1.5 md:gap-2">
                      {service.tags.map((tag, i) => (
                        <span key={i} className="bg-white text-blue-600 px-2 py-0.5 md:px-3 md:py-1 rounded-md md:rounded-lg text-[10px] md:text-xs font-bold border border-blue-100 shadow-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 text-shadow-sm">눈으로 확인하는 결과</h2>
          <p className="text-slate-500 mb-16 text-lg font-medium">수백 건의 현장 데이터가 증명하는 <br className="block"/>진설비의 확실한 기술력</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 text-left">
            {beforeAfter.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
                <div className="relative h-32 md:h-64 flex bg-slate-100 overflow-hidden">
                  <div className="w-1/2 relative border-r-2 border-white overflow-hidden">
                    {item.beforeImg ? (
                      <img src={item.beforeImg} alt="시공 전" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400 font-bold bg-slate-50">
                        <Camera size={32} className="mb-2 opacity-20"/>
                        <span className="text-xs">작업 전 사진</span>
                      </div>
                    )}
                    <span className="absolute top-2 left-2 md:top-4 md:left-4 bg-red-600 text-white text-[8px] md:text-[10px] font-black px-1.5 py-0.5 md:px-2 md:py-1 rounded-md shadow-lg z-10">BEFORE</span>
                  </div>
                  <div className="w-1/2 relative overflow-hidden">
                    {item.afterImg ? (
                      <img src={item.afterImg} alt="시공 후" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-500 font-bold bg-slate-100">
                        <Camera size={32} className="mb-2 opacity-20"/>
                        <span className="text-xs">작업 후 사진</span>
                      </div>
                    )}
                    <span className="absolute top-2 right-2 md:top-4 md:right-4 bg-green-600 text-white text-[8px] md:text-[10px] font-black px-1.5 py-0.5 md:px-2 md:py-1 rounded-md shadow-lg z-10">AFTER</span>
                  </div>
                </div>
                <div className="p-4 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm md:text-xl font-black text-slate-900 mb-2 md:mb-3 leading-tight">{item.title}</h4>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium line-clamp-2 md:line-clamp-none">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="insurance" className="py-24 bg-blue-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl opacity-50"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <FileText className="w-20 h-20 mx-auto mb-8 text-blue-200" />
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
            뜻밖의 누수 피해 걱정 마세요!<br />
            '일상배상책임보험' 완벽 지원
          </h2>
          <p className="text-blue-50 text-lg md:text-xl font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
            아래층 피해 보상부터 공사 비용까지, <br className="block"/>고객님이 가입하신 보험 특약으로<br className="block"/> 혜택을 받으실 수 있도록 <br className="block"/>
            <strong className="text-yellow-300 ml-1"> 필요한 모든 서류(소견서, 견적서, 시공사진)를 <br className="block"/>꼼꼼하게 지원</strong>해 드립니다.
          </p>
          <a href={`tel:${phoneNumber}`} className="inline-flex bg-white text-blue-700 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-100 transition shadow-2xl active:scale-95">
            보험 처리 가능 여부 상담
          </a>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-400 py-24 pb-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 border-b border-white/5 pb-20 mb-12">
            <div className="lg:col-span-2">
              <div className="text-5xl font-black text-white mb-8 tracking-tighter">진설비</div>
              <p className="text-lg leading-relaxed mb-10 max-w-sm font-medium">
                광주광역시 전지역 24시간 긴급출동 전문.<br />
                최신 장비와 책임 해결로 고객님의 소중한 공간을 다시 쾌적하게 만들어 드립니다.
              </p>
              <div className="inline-flex items-center gap-6 bg-white/5 px-8 py-5 rounded-[2rem] border border-white/10 shadow-inner group">
                <Phone className="text-blue-500 w-10 h-10 group-hover:rotate-12 transition duration-300" />
                <span className="text-3xl font-black text-white tracking-tight">{phoneNumber}</span>
              </div>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 text-lg uppercase tracking-widest underline underline-offset-8 decoration-blue-600">전문 서비스</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li className="hover:text-white transition cursor-default">누수 탐지 및 보험 처리</li>
                <li className="hover:text-white transition cursor-default">변기 / 싱크대 / 하수구 막힘</li>
                <li className="hover:text-white transition cursor-default">배관 고압세척 및 준설</li>
                <li className="hover:text-white transition cursor-default">종합 방수 및 설비 공사</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 text-lg uppercase tracking-widest underline underline-offset-8 decoration-blue-600">업무 안내</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><span className="text-blue-500 mr-2">●</span> 365일 24시간 연중무휴</li>
                <li><span className="text-blue-500 mr-2">●</span> 광주 전지역 / 전남권 출동</li>
                <li><span className="text-blue-500 mr-2">●</span> 작업 전 투명 정찰 견적</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[12px] font-black tracking-wider">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-slate-600">
              <span>상호 : 진설비</span>
              <span>대표 : 박호진</span>
              <span>사업자번호 : 168-04-02622</span>
            </div>
            <div className="opacity-30 uppercase tracking-[0.2em]">© 2026 Jin Seolbi. All Rights Reserved.</div>
          </div>
        </div>
      </footer>

      {/* 모바일 하단 고정 버튼 (슬림 버전) */}
      <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex gap-2">
          <a href={`sms:${phoneNumber}`} className="w-[28%] bg-slate-50 text-slate-800 rounded-xl font-bold flex flex-col items-center justify-center py-2 active:scale-95 transition border border-slate-100">
            <span className="text-[10px] opacity-50 mb-0.5">SMS</span>
            <span className="text-sm">문자</span>
          </a>
          <a href={`tel:${phoneNumber}`} className="flex-1 bg-blue-600 text-white rounded-xl font-black flex items-center justify-center py-3 text-lg shadow-lg shadow-blue-200/50 animate-pulse active:scale-95 transition">
            <Phone className="mr-2 w-5 h-5"/> 빠른 전화 상담
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;