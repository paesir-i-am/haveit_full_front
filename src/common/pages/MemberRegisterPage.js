import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberRegisterAgreement from '../components/MemberRegisterAgreement';
import NicknameSet from '../components/NicknameSet';
import { saveAgreements, saveNickname } from '../api/memberApi';
import { useCustomLogin } from '../hook/useCustomLogin';
import './css/MemberRegisterPage.scss';

const MemberRegisterPage = () => {
  const navigate = useNavigate();
  const { memberId, nickname: initialNickname, updateNickname, nicknameSet } = useCustomLogin();
  const [nickname, setNickname] = useState(initialNickname || '');
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);

  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
    sms: false,
    email: false,
  });

  useEffect(() => {
    if (nicknameSet) {
      alert('이미 닉네임이 설정된 사용자입니다.');
      navigate('/'); // 홈 또는 다른 페이지로 이동
    }

    if(!memberId) {
      alert('로그인 후 이용해주세요.');
      navigate('/');
    }
  }, [nicknameSet, navigate, memberId]);

  const handleSubmit = async () => {
    if (!agreements.terms || !agreements.privacy) {
      alert('필수 약관에 동의해야 합니다.');
      return;
    }
    if (!isNicknameAvailable) {
      alert('닉네임 중복 확인이 필요합니다.');
      return;
    }

    try {
      await saveNickname(memberId, nickname);
      await saveAgreements(memberId, agreements);
      updateNickname(nickname);
      alert('회원 가입이 완료되었습니다!');
      navigate('/');
    } catch (err) {
      alert('가입 실패: ' + err.message);
    }
  };

  return (
    <div className="register-page-container">
      <h2>회원 가입</h2>

      <NicknameSet
        nickname={nickname}
        setNickname={setNickname}
        isNicknameAvailable={isNicknameAvailable}
        setIsNicknameAvailable={setIsNicknameAvailable}
      />

      <MemberRegisterAgreement
        agreements={agreements}
        setAgreements={setAgreements}
      />

      <hr className="divider" />

      <div className="submit-button-wrapper">
        <button
          onClick={handleSubmit}
          disabled={!agreements.terms || !agreements.privacy || !isNicknameAvailable}
        >
          가입 완료
        </button>
      </div>
    </div>
  );
};

export default MemberRegisterPage;