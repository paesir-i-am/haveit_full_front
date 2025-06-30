import {addAuthHeader, handleAuthError} from '../util/jwtUtil';
import axios from 'axios';

// export const API_SERVER_HOST = "http://localhost:8080"; // 개발용 주소
export const API_SERVER_HOST = "https://onepm-2025.shop"; // 배포용 주소


const axiosInstance = axios.create({
	baseURL: API_SERVER_HOST,
	headers: {
		"Content-Type": "application/json",
	},
});

// 요청 및 응답 인터셉터 등록
axiosInstance.interceptors.request.use(addAuthHeader, (error) =>
		Promise.reject(error),
);

axiosInstance.interceptors.response.use(
		(response) => response,
		handleAuthError, // 응답 에러 처리
);

export default axiosInstance;
