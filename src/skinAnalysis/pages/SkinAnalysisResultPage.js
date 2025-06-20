import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicLayout from '../../common/pages/BasicLayout';
import './css/SkinAnalysisResultPage.scss';
import AnnotatedImageBox from '../component/AnnotatedImageBox';
import ResultSummarySlider from '../component/ResultSummarySlider';

const SkinAnalysisResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="error-section">
        <p>분석 결과가 없습니다.</p>
        <button onClick={() => navigate('/')}>메인으로</button>
      </div>
    );
  }

  return (
    <BasicLayout>
      <div className="skin-result-container">
        <div className="left-section">
          <AnnotatedImageBox imagePath={result.imagePath} acneBoxes={result.acneBoxes} />
        </div>
        <div className="right-section">
          <ResultSummarySlider result={result} />
        </div>
      </div>
    </BasicLayout>
  );
};

export default SkinAnalysisResultPage;