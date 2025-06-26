import React from 'react';
import './css/SkinResultGuide.scss';

const SkinResultGuide = () => {
  return (
    <div className="skin-result-guide">
      <div className="guide-header">
        <h3>분석 결과 해석 가이드</h3>
      </div>

      <ul className="guide-list">
        <li>얼굴부위가 충분히 드러나지 않으면 검출이 불가합니다.</li>
        <li>분석 결과가 낯설다면 아래 가이드를 참고해 주세요.</li>
      </ul>

      <div className="interpretation-hint">
        <p>예시 해석 기준</p>
        <ul>
          <li><strong>여드름</strong><br></br> 활발한 피지 활동으로 인한 여드름만 감지됩니다. <br></br>여드름 자국은 분석 대상에 포함되지 않습니다.</li>
          <li><strong>모공/주름/색소침착</strong><br></br> 등급이 높을수록 집중 관리가 필요한 상태입니다.</li>
        </ul>
      </div>
    </div>
  );
};

export default SkinResultGuide;
