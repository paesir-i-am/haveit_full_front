import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import "./css/BasicLayout.scss";
import KakaoLoginButton from '../components/KakaoLoginButton';

const BasicLayout = ({children}) => {
	const [menuOpen, setMenuOpen] = useState(false);

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
											to="/skinanalysis"
									>
										나를 읽는 피부 분석
									</NavLink>
								</li>
								<li className="dropdown-parent">
									<NavLink
											to="/skinresult/myresults"
									>
										내 피부 이야기
									</NavLink>
									<ul className="dropdown">
										<li>
											<NavLink
													to="/skinresult/myresults"
											>
												오늘의 피부 분석 결과
											</NavLink>
										</li>
										<li>
											<NavLink
													to="/skinresult/skinhistory"
											>
												피부 요즘 상태 보고서
											</NavLink>
										</li>
									</ul>
								</li>
								<li>
									<NavLink
											to="/mentoring"
									>
										너만을 위한 케어 도우미
									</NavLink>
								</li>
							</ul>
						</div>
						<div className="nav-right-space">
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