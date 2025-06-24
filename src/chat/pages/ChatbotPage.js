import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCustomLogin } from '../../common/hook/useCustomLogin';
import { sendChatToBot } from '../api/ChatbotApi';
import {
  addUserMessage,
  addBotMessage,
  setLoading,
  setToolsAndScore,
} from '../../common/slice/chatbotSlice';

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
      <ChatInputBox input={input} setInput={setInput} onSend={handleSend} loading={loading} />
    </div>
    </div>
    </BasicLayout>
  );
};

export default ChatbotPage;