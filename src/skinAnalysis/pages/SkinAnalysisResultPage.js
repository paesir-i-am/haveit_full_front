import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicLayout from '../../common/pages/BasicLayout';
import './css/SkinAnalysisResultPage.scss';
import ResultSummarySlider from '../component/ResultSummarySlider';
import SkinResultGuide from '../component/SkinResultGuide';

const SkinAnalysisResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const [isGuideOpen, setIsGuideOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!result) {
    return (
      <BasicLayout>
      <div className="error-section">
        <p>분석 결과가 없습니다.</p>
        <button onClick={() => navigate('/')}>메인으로</button>
      </div>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout>
      <div className="skin-analysis-result-page">
        <div className="detail-page">
          <h1>피부 분석 결과 상세보기</h1>
          <div className="skin-result-container">
            {(!isMobile || isGuideOpen) && (
              <div className="left-section">
                {isMobile && (
                  <div className="guide-toggle-area">
                    <button
                      className="guide-toggle-btn"
                      onClick={() => setIsGuideOpen(false)}
                      aria-label="가이드 닫기"
                    >
                      가이드 닫기 ▲
                    </button>
                  </div>
                )}
                <SkinResultGuide />
              </div>
            )}
            {isMobile && isGuideOpen && <div className="mobile-divider" />}
            <div className={`right-section${(!isMobile || isGuideOpen) ? '' : ' full-width'}`}>
              {isMobile && !isGuideOpen && (
                <div className="guide-toggle-area">
                  <button
                    className="guide-toggle-btn"
                    onClick={() => setIsGuideOpen(true)}
                    aria-label="가이드 열기"
                  >
                    가이드 열기 ▼
                  </button>
                </div>
              )}
              <ResultSummarySlider result={result} />
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default SkinAnalysisResultPage;