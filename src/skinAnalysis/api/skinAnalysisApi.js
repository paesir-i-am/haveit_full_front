import axiosInstance from '../../common/api/mainApi';


// 피부 분석 요청 API
export const uploadSkinAnalysisImage = async (image, memberId) => {
	const formData = new FormData();
	formData.append("image", image);
	formData.append("memberId", memberId);

	const response = await axiosInstance.post(
			"/api/skin-analysis/analyze",
			formData,
			{
				headers: { "Content-Type": "multipart/form-data" },
			}
	);

	return response.data;
};

// 히스토리 리스트 조회 API
export const getSkinAnalysisHistoryList = async (memberId, page = 0, size = 8) => {
	const response = await axiosInstance.get(
		"/api/skin-analysis/history",
		{params : {memberId, page, size}}
	);
	return response.data;
};

// 상세 데이터 조회 API
export const getSkinAnalysisDetail = async (memberId, analysisId) => {
	const response = await axiosInstance.get(
		`/api/skin-analysis/history/${analysisId}`,
		{params : {memberId}}
	);
	return response.data;
};