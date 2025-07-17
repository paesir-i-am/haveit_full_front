import React, { useState } from "react";
import SkinAnalysisUploadBox from "../component/SkinAnalysisUploadBox";
import { uploadSkinAnalysisImage } from "../api/skinAnalysisApi";
import "./css/SkinAnalysisPage.scss";
import BasicLayout from "../../common/pages/BasicLayout";
import { useCustomLogin } from "../../common/hook/useCustomLogin";
import { useNavigate } from "react-router-dom";

const SkinAnalysisPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();

  const { isLogin, memberId } = useCustomLogin();

  const handleAnalysis = async () => {
    if (!isLogin) {
      alert("로그인이 필요합니다");
      return;
    }

    if (!selectedFile) return;
    setAnalyzing(true);
    try {
      const result = await uploadSkinAnalysisImage(selectedFile, memberId);
      // console.log("분석 결과:", result);
      navigate("/skin-analysis/result", { state: { result } });
    } catch (error) {
      console.error("분석 실패:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <BasicLayout>
      <div className="skin-analysis-page">
        <div className="title-section">
          <h1>내 피부, 들여다보기</h1>
          <div className="sub-title">
            사진을 업로드하면, HAVIT이 당신의 피부 상태를 분석해드립니다.
          </div>
        </div>

        <div className="upload-section">
          <div className="guideline-box">
            <h3>더 정확한 분석을 위해 아래의 가이드라인을 참고해주세요!</h3>
            <div className="guideline-content">
              <div className="image-box">
                <img
                  src="/img/skinanalysis_img.png"
                  alt="Skin Analysis Reference"
                />
              </div>
              <div className="text-list">
                {[
                  "1. 얼굴을 정면에서 촬영하세요.",
                  "2. 밝은 조명에서 촬영하세요.",
                  "3. 깨끗한 얼굴로 촬영하세요.",
                  "4. 고해상도 이미지를 사용하세요.",
                ].map((text, idx) => (
                  <div className="tip-box" key={idx}>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <SkinAnalysisUploadBox
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            handleAnalysis={handleAnalysis}
            analyzing={analyzing}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default SkinAnalysisPage;
