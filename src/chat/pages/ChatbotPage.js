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
  const loading = useSelector(state => state.chatbotSlice.loading);


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
    </BasicLayout>
  );
};

export default ChatbotPage;