import React, { useState } from "react";
import "./css/MemberRegisterAgreement.scss";
import { termsText } from "../constants/terms";
import { privacyText } from "../constants/privacy";

const MemberRegisterAgreement = ({ agreements, setAgreements }) => {
  const [openDetail, setOpenDetail] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const toggleAll = () => {
    const all = !agreements.all;
    setAgreements({
      all,
      terms: all,
      privacy: all,
      marketing: all,
      sms: all,
      email: all,
    });
  };

  const toggle = (key) => {
    const newState = { ...agreements };
    if (key === "marketing") {
      const val = !agreements.marketing;
      newState.marketing = val;
      newState.sms = val;
      newState.email = val;
    } else {
      newState[key] = !agreements[key];
    }
    newState.all = Object.entries(newState)
      .filter(([k]) => k !== "all")
      .every(([, v]) => v);
    setAgreements(newState);
  };

  const toggleDetail = (key) => {
    setOpenDetail((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="agreement-container">
      <h3>약관 동의</h3>

      {/* 전체 동의 */}
      <label className="agreement-checkbox">
        <input type="checkbox" checked={agreements.all} onChange={toggleAll} />
        <strong>전체 동의</strong>
      </label>

      <div className="agreement-list">
        {/* 이용약관 */}
        <div className="agreement-item">
          <label>
            <input
              type="checkbox"
              checked={agreements.terms}
              onChange={() => toggle("terms")}
            />
            이용약관 동의 (필수)
          </label>
          <button onClick={() => toggleDetail("terms")}>
            {openDetail.terms ? "▲ 닫기" : "▼ 보기"}
          </button>
          {openDetail.terms && (
              <div
                className="agreement-detail scroll-box"
                dangerouslySetInnerHTML={{ __html: termsText }}
              />
          )}
        </div>

        {/* 개인정보 처리방침 */}
        <div className="agreement-item">
          <label>
            <input
              type="checkbox"
              checked={agreements.privacy}
              onChange={() => toggle("privacy")}
            />
            개인정보 수집 및 이용 동의 (필수)
          </label>
          <button onClick={() => toggleDetail("privacy")}>
            {openDetail.privacy ? "▲ 닫기" : "▼ 보기"}
          </button>
          {openDetail.privacy && (
            <div className="agreement-detail scroll-box">
              <div
                className="agreement-detail scroll-box"
                dangerouslySetInnerHTML={{ __html: privacyText }}
              />
            </div>
          )}
        </div>

        {/* 마케팅 수신 동의 */}
        <div className="agreement-item">
          <label>
            <input
              type="checkbox"
              checked={agreements.marketing}
              onChange={() => toggle("marketing")}
            />
            개인정보 이용 수신 동의 (선택)
          </label>
          <button onClick={() => toggleDetail("marketing")}>
            {openDetail.marketing ? "▲ 닫기" : "▼ 보기"}
          </button>
          {openDetail.marketing && (
            <div className="agreement-detail">
              <p>혜택 정보 수신 방법</p>
              <label>
                <input
                  type="checkbox"
                  checked={agreements.sms}
                  onChange={() => toggle("sms")}
                />
                SMS 수신
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={agreements.email}
                  onChange={() => toggle("email")}
                />
                이메일 수신
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberRegisterAgreement;
