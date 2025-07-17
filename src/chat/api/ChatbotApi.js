import axiosInstance from "../../common/api/mainApi"

export const sendChatToBot = async (memberId, userQuery) => {
  const response = await axiosInstance.post("/api/chatbot", {
    memberId,
    userQuery,
  }); 

  // console.log(userQuery);
  // console.log(response.data);
  return response.data.response;
}

export const getLatestChatHistory = async (memberId) => {
  const response = await axiosInstance.get(`/api/chatbot/session/latest?memberId=${memberId}`);
  return response.data;
}