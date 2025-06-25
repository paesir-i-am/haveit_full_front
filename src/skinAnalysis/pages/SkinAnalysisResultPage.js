import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicLayout from '../../common/pages/BasicLayout';
import './css/SkinAnalysisResultPage.scss';
import ResultSummarySlider from '../component/ResultSummarySlider';
import SkinResultGuide from '../component/SkinResultGuide';

const SkinAnalysisResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

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
      <div className="detail-page">
        <h1>피부 분석 결과 상세보기</h1>
        <div className="skin-result-container">
          <div className="left-section">
            <SkinResultGuide />
          </div>
          <div className="right-section">
            <ResultSummarySlider result={result} />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default SkinAnalysisResultPage;