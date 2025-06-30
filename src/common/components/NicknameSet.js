import React from 'react';
import { checkNicknameDuplicate } from '../api/memberApi';
import { useCustomLogin } from '../hook/useCustomLogin';
import './css/NicknameSet.scss';

const NicknameSet = ({ nickname, setNickname, isNicknameAvailable, setIsNicknameAvailable }) => {
  const { memberId } = useCustomLogin();

  const handleCheck = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const res = await checkNicknameDuplicate(nickname, memberId);
      setIsNicknameAvailable(res.available);
    } catch (err) {
      console.error(err);
      alert("중복 확인 중 오류 발생");
    }
  };

  return (
    <div className="nickname-container">
      <h3>닉네임 설정</h3>
      <div className="nickname-input-group">
        <input
          type="text"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setIsNicknameAvailable(null);
          }}
          placeholder="닉네임 입력"
        />
        <button onClick={handleCheck}>중복 확인</button>
      </div>

      {isNicknameAvailable === true && (
        <p className="nickname-status available">사용 가능</p>
      )}
      {isNicknameAvailable === false && (
        <p className="nickname-status unavailable">이미 사용 중</p>
      )}
    </div>
  );
};

export default NicknameSet;