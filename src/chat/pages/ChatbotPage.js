import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCustomLogin } from '../../common/hook/useCustomLogin';
import { getLatestChatHistory, sendChatToBot } from '../api/ChatbotApi';
import {
  addUserMessage,
  addBotMessage,
  setLoading,
  setToolsAndScore,
  setMessages,
} from '../../common/slice/chatbotSlice';
import { v4 as uuid } from 'uuid';

import ChatHistoryList from '../component/ChatHistoryList';
import ChatInputBox from '../component/ChatInputBox';
import SelectedToolBar from '../component/SelectedToolBar';
import BasicLayout from '../../common/pages/BasicLayout';
import './css/ChatbotPage.scss';

const ChatbotPage = () => {
  const dispatch = useDispatch();
  const { memberId } = useCustomLogin();
  const [input, setInput] = useState('');
  const [showPanel, setShowPanel] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const loading = useSelector(state => state.chatbotSlice.loading);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchLatestChatHistory = async () => {
      if (!memberId) {
        // 비로그인 안내 멘트
        const messagesWithId = [{
          id: uuid(),
          sender: 'bot',
          message: '챗봇 서비스를 이용하려면 로그인이 필요합니다.',
          timestamp: new Date().toISOString(),
        }];
        dispatch(setMessages(messagesWithId));
        return;
      }
      const response = await getLatestChatHistory(memberId);
      let messagesWithId = (response || []).map(msg => ({
        ...msg,
        id: uuid(),
      }));

      if (messagesWithId.length === 0) {
        messagesWithId = [{
          id: uuid(),
          sender: 'bot',
          message: '안녕하세요! 무엇을 도와드릴까요?',
          timestamp: new Date().toISOString(),
        }];
      }

      dispatch(setMessages(messagesWithId));
      console.log('response:', response);
      console.log('messagesWithId:', messagesWithId);
    };
    fetchLatestChatHistory();
  }, [memberId, dispatch]);

  const handleSend = async () => {
    if (!input.trim()) return;

    dispatch(addUserMessage(input));
    dispatch(setLoading(true));

    try {
      const response = await sendChatToBot(memberId, input);

      dispatch(addBotMessage(response.result));
      dispatch(setToolsAndScore({
        selectedTools: response.selected_tools,
        qualityScore: response.quality_score,
      }));
    } catch (e) {
      dispatch(addBotMessage('죄송합니다. 챗봇 응답에 실패했어요.'));
    } finally {
      dispatch(setLoading(false));
      setInput('');
    }
  };

  return (
    <BasicLayout>
      <div className="chatbot-page">
        <div className="chatbot-layout">
          {isMobile && (
            <div className="mobile-toggle-area">
              {!showPanel && (
                <button
                  className="mobile-toggle-btn"
                  onClick={() => setShowPanel(true)}
                  aria-label="정보 패널 열기"
                >
                  ▼
                </button>
              )}
            </div>
          )}
          {(!isMobile || showPanel) && (
            <div className={`left-panel${isMobile ? ' mobile' : ''} ${showPanel ? 'open' : 'closed'}`}>
              {isMobile && (
                <button
                  className="panel-close-btn"
                  onClick={() => setShowPanel(false)}
                  aria-label="정보 패널 닫기"
                >
                  ✖
                </button>
              )}
              <div className="headline">
                <p className="sub-text">너만을 위한 케어 도우미</p>
                <h1 className="main-title">HAVEIT</h1>
              </div>
              <div className="description">
                <p className="description-text first-text"><span className="color-point">HAVEIT</span>은 피부 전문 자료를 참고하여, <br></br> 전문적이고 체계적인 답변이 가능합니다.</p>
                <p className="description-text second-text">지금 바로 전문가와 상담해보세요.</p>
                <p className="notice-text">
                  ※ 일부 응답은 전문 자료 확인을 위해 답변에 시간이 소요될 수 있습니다.
                </p>
              </div>
            </div>
          )}
          <div className="chatbot-wrapper">
            <ChatHistoryList />
            <SelectedToolBar />
            <ChatInputBox
              input={input}
              setInput={setInput}
              onSend={handleSend}
              loading={loading}
              disabled={!memberId}
            />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default ChatbotPage;