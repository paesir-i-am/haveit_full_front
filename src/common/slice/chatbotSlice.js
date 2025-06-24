import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
  messages: [],
  loading: false,
  error: null,
  selectedTools: [],
  qualityScore: null,
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({
        id: uuid(),
        sender: 'user',
        message: action.payload,
        timestamp: new Date().toISOString(),
      });
    },
    addBotMessage: (state, action) => {
      state.messages.push({
        id: uuid(),
        sender: 'bot',
        message: action.payload,
        timestamp: new Date().toISOString(),
      });
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setToolsAndScore: (state, action) => {
      state.selectedTools = action.payload.selectedTools;
      state.qualityScore = action.payload.qualityScore;
    },
    resetChat: () => initialState,
  },
});

export const {
  addUserMessage,
  addBotMessage,
  setLoading,
  setToolsAndScore,
  resetChat,
} = chatbotSlice.actions;

export default chatbotSlice.reducer;