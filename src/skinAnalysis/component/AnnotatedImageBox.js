import React, { useEffect, useState } from 'react';
import drawBoundingBoxesOnImage from '../util/drawBoundingBoxesOnImage';
import { API_SERVER_HOST } from '../../common/api/mainApi';
import './css/AnnotatedImageBox.scss';

// 여드름 박스 그려진 이미지를 보여주는 컴포넌트
const AnnotatedImageBox = ({ imagePath, acneBoxes }) => {
  const [annotatedImage, setAnnotatedImage] = useState(null);
  const [containerStyle, setContainerStyle] = useState({});
  const [containerStylePC, setContainerStylePC] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchAndAnnotate = async () => {
      try {
        const response = await fetch(`${API_SERVER_HOST}${imagePath}`);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = reader.result;
          const boxCoords = acneBoxes.map((box) => [box.x1, box.y1, box.x2, box.y2]);
          const annotated = await drawBoundingBoxesOnImage(base64, boxCoords);
          setAnnotatedImage(annotated);
        };

        reader.readAsDataURL(blob);
      } catch (err) {
        console.error('이미지 주석 처리 중 오류 발생:', err);
      }
    };

    fetchAndAnnotate();
  }, [imagePath, acneBoxes]);

  // 이미지 로드 후 비율에 따라 컨테이너 스타일 동적 적용 (모바일/PC 모두)
  const handleImgLoad = (e) => {
    const img = e.target;
    const { naturalWidth, naturalHeight } = img;
    if (isMobile) {
      if (naturalWidth > naturalHeight) {
        setContainerStyle({ width: '100%', height: 'auto', aspectRatio: 'unset', maxWidth: '100%', maxHeight: 'unset' });
      } else {
        setContainerStyle({ height: '100%', width: 'auto', aspectRatio: 'unset', maxHeight: '100%', maxWidth: 'unset' });
      }
    } else {
      // PC: 더 짧은 쪽이 100%가 되게
      if (naturalWidth < naturalHeight) {
        setContainerStylePC({ width: '100%', height: 'auto' });
      } else {
        setContainerStylePC({ height: '100%', width: 'auto' });
      }
    }
  };

  return (
    <div className="annotated-image-container" style={isMobile ? containerStyle : containerStylePC}>
      {annotatedImage ? (
        <img src={annotatedImage} alt="Bounding Box 시각화 이미지" onLoad={handleImgLoad} />
      ) : (
        <p>이미지 처리 중...</p>
      )}
    </div>
  );
};

export default AnnotatedImageBox;