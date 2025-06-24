import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSkinAnalysisHistoryList, getSkinAnalysisDetail } from '../api/skinAnalysisApi';
import './css/SkinAnalysisHistoryPage.scss';
import { useCustomLogin } from '../../common/hook/useCustomLogin';
import { API_SERVER_HOST } from '../../common/api/mainApi';
import BasicLayout from '../../common/pages/BasicLayout';

const SkinAnalysisHistoryPage = () => {
  const { memberId, isLogin } = useCustomLogin(); 
  const [historyList, setHistoryList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLogin) {
      alert('로그인이 필요합니다.');
      navigate('/');
      return;
    }
    if(memberId) {
      loadHistory();
    }
  }, [memberId, page, isLogin]);

  const loadHistory = async () => {
    try {
      const result = await getSkinAnalysisHistoryList(memberId, page, 10);
      console.log(result);
      setHistoryList(result.content);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error('히스토리 로딩 실패:', err);
    }
  };

  const handleClickDetail = async (analysisId) => {
    try {
      const result = await getSkinAnalysisDetail(memberId, analysisId);
      console.log(result);
      navigate('/skin-analysis/result', { state: { result } });
    } catch (err) {
      console.error('상세 데이터 불러오기 실패:', err);
    }
  };

  return (
    <BasicLayout>
    <div className="history-page">
      <h1>피부 분석 히스토리</h1>
      <div className="history-list">
        {historyList.map(item => (
          <div key={item.id} className="history-card" onClick={() => handleClickDetail(item.id)}>
            <img src={`${API_SERVER_HOST}${item.imagePath}`} alt="분석 이미지" />
            <div className="summary">{item.summary.length > 20 ? item.summary.slice(0, 15) + '...' : item.summary}</div>
            <div className="time">{new Date(item.analyzedTime).toLocaleDateString('ko-KR')}</div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>이전</button>
        <span>{page + 1} / {totalPages}</span>
        <button disabled={page + 1 >= totalPages} onClick={() => setPage(p => p + 1)}>다음</button>
      </div>
    </div>
    </BasicLayout>
  );
};

export default SkinAnalysisHistoryPage;