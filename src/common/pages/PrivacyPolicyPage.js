import React from "react";
import { privacyText } from "../constants/privacy";
import "./css/PrivacyPolicyPage.scss";
import BasicLayout from "./BasicLayout";

const PrivacyPolicyPage = () => {
  return (
    <BasicLayout>
    <div className="privacy-page-container">
      <h1>개인정보처리방침</h1>
      <div
        className="privacy-content"
        dangerouslySetInnerHTML={{ __html: privacyText }}
      />
    </div>
    </BasicLayout>
  );
};

export default PrivacyPolicyPage;