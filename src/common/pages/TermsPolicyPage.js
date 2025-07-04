import React from "react";
import { termsText } from "../constants/terms";
import "./css/PrivacyPolicyPage.scss";
import BasicLayout from "./BasicLayout";

const TermsPolicyPage = () => {
  return (
    <BasicLayout>
      <div className="privacy-page-container">
        <h1>이용약관</h1>
        <div className="privacy-content" dangerouslySetInnerHTML={{ __html: termsText }} />
      </div>
    </BasicLayout>
  )
}

export default TermsPolicyPage