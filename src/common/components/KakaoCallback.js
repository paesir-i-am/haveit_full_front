import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_SERVER_HOST } from '../api/mainApi';
import {useCustomLogin} from '../hook/useCustomLogin';

const KakaoCallback = () => {
	const navigate = useNavigate();
	const { doSocialLogin } = useCustomLogin();

	useEffect(() => {
		const code = new URL(window.location.href).searchParams.get("code");

		if (code) {
			axios.post(`${API_SERVER_HOST}/api/member/kakao`, new URLSearchParams({ code }), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
					.then((res) => {
						const data = res.data;
						console.log("로그인 유저 정보:", data);
						doSocialLogin(data);
						navigate('/');
					})
					.catch((error) => {
						console.error("카카오 로그인 실패", error);
					});
		}
	}, [navigate]);

	return <p>카카오 로그인 중입니다...</p>;
};

export default KakaoCallback;