import React from 'react';
import './css/SkinResultGuide.scss';

const SkinResultGuide = () => {
  return (
    <div className="skin-result-guide">
      <div className="guide-header">
        <h3>분석 결과 해석 가이드</h3>
      </div>

      <ul className="guide-list">
        <li>얼굴 전체가 충분히 드러나지 않을 경우, 일부 부위(예: 이마, 턱 등)가 감지되지 않아 해당 부위는 검출불가로 표시됩니다.</li>
        <li>분석 결과가 낯설다면 아래 가이드를 참고해 주세요.</li>
      </ul>

      <div className="interpretation-hint">
        <p>예시 해석 기준</p>
        <ul>
          <li><strong>여드름</strong>: 피지 활동이 활발한 상태의 여드름만 감지되며, 이미 흉터로 남은 자국은 분석 대상에 포함되지 않습니다.</li>
          <li><strong>모공/주름/색소침착</strong>: 등급이 높을수록 집중관리가 필요한 피부 상태를 의미합니다.</li>
        </ul>
      </div>
    </div>
  );
};

export default SkinResultGuide;
