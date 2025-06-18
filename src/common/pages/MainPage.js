import React, {useEffect, useRef} from 'react';
import BasicLayout from './BasicLayout';
import {useNavigate} from 'react-router-dom';
import "./css/MainPage.scss"

const MainPage = () => {
	const sloganRef = useRef(null);
	const chatbotRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
				}
			});
		}, { threshold: 0.3 });

		const sloganElement = sloganRef.current;
		const chatbotElement = chatbotRef.current;

		if (sloganElement) {
			observer.observe(sloganElement);
		}
		if (chatbotElement) {
			observer.observe(chatbotElement);
		}

		return () => {
			if (sloganElement) {
				observer.unobserve(sloganElement);
			}
			if (chatbotElement) {
				observer.unobserve(chatbotElement);
			}
		};
	}, []);

	const handleStartAnalysis = () => {
		navigate("/skinanalysis");
	};

	const handleChatWithHaveit = () => {
		navigate("/mentoring");
	};


	return (
			<BasicLayout>
				<div>
				{/* 슬로건 섹션 */}
				<div ref={sloganRef} className="slogan-section scroll-reveal">
					<div className="slogan-content">
						<div className="slogan-text">
							<p className="reveal-item">피부가 변하는 이유,<br />나도 몰랐던 나의 환경 때문일지도.</p>
							<p className="reveal-item">이젠 분석부터 케어까지,<br />내 기준으로 시작하세요.</p>
							<p className="reveal-item highlight">내 피부, 내 루틴, 내 선택. <span className="brand">HAVEIT.</span></p>
							<button className="start-analysis-btn reveal-item" onClick={handleStartAnalysis}>
								내 피부, 들어다보기
							</button>
						</div>
						<div className="slogan-image reveal-item">
							<img src="/img/animation.gif" alt="피부 분석 애니메이션" />
						</div>
					</div>
				</div>

				{/* 챗봇 섹션 */}
				<div ref={chatbotRef} className="chatbot-section scroll-reveal" >
					<div className="chatbot-content">
						<div className="chatbot-image reveal-item">
							<img src="/img/chatbot.gif" alt="챗봇 애니메이션" />
						</div>
						<div className="chatbot-text">
							<p className="reveal-item">HAVEIT이 당신의 피부 고민을 들어줍니다.<br />지금 바로 전문가와 상담해보세요.</p>
							<button className="chatbot-btn reveal-item" onClick={handleChatWithHaveit}>
								HAVEIT과 대화하기
							</button>
						</div>
					</div>
				</div>
			</div>
			</BasicLayout>
	);
};

export default MainPage;