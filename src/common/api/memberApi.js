import axios from 'axios';
import {API_SERVER_HOST} from './mainApi';

const host = `${API_SERVER_HOST}/api/member`;

// ✅ 로그인 API
export const loginPost = async (loginParam) => {
	const header = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };

	const form = new URLSearchParams();
	form.append("id", loginParam.id);
	form.append("password", loginParam.password);

	console.log("전송할 데이터:", form.toString());

	try {
		const res = await axios.post(`${host}/login`, form, header);
		console.log("응답 데이터:", res.data);
		return res.data;
	} catch (error) {
		console.error("API 호출 실패:", error.response || error.message);
		throw error.response?.data || error;
	}
};