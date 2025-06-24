import axiosInstance from "../../common/api/mainApi"

export const sendChatToBot = async (memberId, userQuery) => {
  const response = await axiosInstance.post("/api/chatbot", {
    memberId,
    userQuery,
  }); 

  console.log(userQuery);
  console.log(memberId);
  console.log(response.data);
  return response.data.response;
}