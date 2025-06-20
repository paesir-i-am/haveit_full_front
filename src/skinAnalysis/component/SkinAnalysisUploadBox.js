import React, { useRef } from 'react';
import './css/SkinAnalysisUploadBox.scss';

const SkinAnalysisUploadBox = ({
	                               selectedFile,
	                               setSelectedFile,
	                               previewImage,
	                               setPreviewImage,
	                               handleAnalysis,
	                               analyzing,
                               }) => {
	const fileInputRef = useRef();

	const handleImageClick = () => {
		fileInputRef.current.click();
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setSelectedFile(file);
		setPreviewImage(URL.createObjectURL(file));
	};

	return (
			<div className="upload-box">
				<h2>Upload the image</h2>

				<div className="image-click-area" onClick={handleImageClick}>
					{previewImage ? (
							<img src={previewImage} alt="미리보기" className="preview-img" />
					) : (
						<div>
							<span className="placeholder-text">이미지를 업로드하려면 클릭하세요</span><br/>
							<span className="placeholder-text">jpg, jpeg, png 확장자만 사용 가능합니다.</span>
							</div>
					)}
				</div>

				<input
						type="file"
						accept="image/jpeg, image/png, image/jpg"
						ref={fileInputRef}
						onChange={handleImageChange}
						style={{ display: 'none' }}
				/>

				<button onClick={handleAnalysis} disabled={analyzing}>
					{analyzing ? '분석 중...' : '분석 시작'}
				</button>
			</div>
	);
};

export default SkinAnalysisUploadBox;