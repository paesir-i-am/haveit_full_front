import React from 'react';
import { useSelector } from 'react-redux';

const SelectedToolBar = () => {
  const selectedTools = useSelector(state => state.chatbotSlice.selectedTools);
  const qualityScore = useSelector(state => state.chatbotSlice.qualityScore);

  if (!selectedTools.length && qualityScore === null) return null;

  return (
    <div className="selected-tool-bar">
      <div>추천 도구: {selectedTools.join(', ')}</div>
      <div>품질 점수: {qualityScore}</div>
    </div>
  );
};  

export default SelectedToolBar;