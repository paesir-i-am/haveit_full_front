import React from 'react';
import { useSelector } from 'react-redux';

const SelectedToolBar = () => {
  const chatbot = useSelector((state) => state.chatbotSlice);

  // ✅ chatbot 자체가 undefined일 경우 방어
  if (!chatbot || (!chatbot.selectedTools?.length && chatbot.qualityScore == null)) return null;

  const { selectedTools = [], qualityScore } = chatbot;

  return (
    <div className="selected-tool-bar">
      {selectedTools.length > 0 && (
        <div>추천 도구: {selectedTools.join(', ')}</div>
      )}
      {qualityScore != null && (
        <div>품질 점수: {qualityScore}</div>
      )}
    </div>
  );
};

export default SelectedToolBar;