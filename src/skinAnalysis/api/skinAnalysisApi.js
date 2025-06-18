import axiosInstance from '../../common/api/mainApi';

export const uploadSkinAnalysisImage = async (image, memberId) => {
	const formData = new FormData();
	formData.append("image", image);
	formData.append("memberId", memberId);

	const response = await axiosInstance.post(
			"/api/file/upload",
			formData,
			{
				headers: { "Content-Type": "multipart/form-data" },
			}
	);

	return response.data;
};