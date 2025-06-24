import {configureStore} from '@reduxjs/toolkit';
import loginSlice from './loginSlice';
import chatbotSlice from './chatbotSlice';

export default configureStore({
	reducer: {
		loginSlice: loginSlice,
		chatbotSlice: chatbotSlice,
	},
});