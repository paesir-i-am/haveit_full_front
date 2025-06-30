import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./css/BasicLayout.scss";
import KakaoLoginButton from "../components/KakaoLoginButton";
import { useCustomLogin } from "../hook/useCustomLogin";

const BasicLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLogin } = useCustomLogin();

  // 히스토리 클릭 시 로그인 여부 확인
  const handleHistoryClick = (e) => {
    if (!isLogin) {
      e.preventDefault();
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <div>
      <nav>
        <div className="nav-container">
          <div className="logo">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <img
                src="mainLogoVer2.png"
                alt="HAVEIT 로고"
                className="logo-image"
              />
            </NavLink>
          </div>
          <button
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <div className="menu-center">
            <ul className={`menu-items ${menuOpen ? "open" : ""}`}>
              <li>
                <NavLink to="/skin-analysis/upload">
                  나를 읽는 피부 분석
                </NavLink>
              </li>
              <li className="dropdown-parent">
                <NavLink
                  to="/skin-analysis/history"
                  onClick={handleHistoryClick}
                >
                  내 피부 이야기
                </NavLink>
              </li>
              <li>
                <NavLink to="/chat">너만을 위한 케어 도우미</NavLink>
              </li>
            </ul>
          </div>
          <div className={`nav-right-space ${menuOpen ? "open" : ""}`}>
            {/*	로그인 로그아웃 구현 구역 */}
            <KakaoLoginButton />
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="footer">
        <div className="footer-grid">
          {/* 좌측: 기본 정보 */}
          <div className="footer-section">
            <h4>기본 정보</h4>
            <p>상호명: (주)한시경</p>
            <p>대표자명: 양진욱</p>
            <p>사업장 주소: 서울특별시 서초구 서초대로74길 51, 1304호</p>
            <p>대표 전화: 010-5291-5887</p>
            <p>사업자등록번호: 189-81-02353</p>
            <p>
              <NavLink to="/terms">이용약관</NavLink> |{" "}
              <NavLink to="/privacy">개인정보처리방침</NavLink>
            </p>
            <p>개인정보보호책임자: 양진욱</p>
          </div>

          {/* 우측: 고객센터 정보 */}
          <div className="footer-section">
            <h4>고객센터</h4>
            <p>전화번호: 010-5291-5887</p>
            <p>이메일: onepm@onepm.kr</p>
            <p>운영시간: 평일 10:00 ~ 18:00</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BasicLayout;
