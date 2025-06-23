import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import "./css/BasicLayout.scss";
import KakaoLoginButton from '../components/KakaoLoginButton';
import { useCustomLogin } from '../hook/useCustomLogin';

const BasicLayout = ({children}) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const { isLogin } = useCustomLogin();

	// 히스토리 클릭 시 로그인 여부 확인
	const handleHistoryClick = (e) => {
    if (!isLogin) {
      e.preventDefault();
      alert('로그인이 필요합니다.');
    }
  };


	return (
			<div>
				<nav>
					<div className="nav-container">
						<div className="logo">
							<NavLink to="/"
							         className={({isActive}) => isActive ? "active" : undefined}>HAVEIT</NavLink>
						</div>
						<button
						  className="mobile-menu-toggle"
						  onClick={() => setMenuOpen(prev => !prev)}
						  aria-label="Toggle menu"
						>
						  ☰
						</button>
						<div className="menu-center">
							<ul className={`menu-items ${menuOpen ? 'open' : ''}`}>
								<li>
									<NavLink
											to="/skin-analysis/upload"
									>
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
									<NavLink
											to="/chat"
									>
										너만을 위한 케어 도우미
									</NavLink>
								</li>
							</ul>
						</div>
						<div className={`nav-right-space ${menuOpen ? 'open' : ''}`}>
						{/*	로그인 로그아웃 구현 구역 */}
							<KakaoLoginButton />
						</div>
					</div>
				</nav>
				<main>{children}</main>
			</div>
	);
};

export default BasicLayout;