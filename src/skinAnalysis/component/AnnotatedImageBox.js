import React, { useEffect, useState } from 'react';
import drawBoundingBoxesOnImage from '../util/drawBoundingBoxesOnImage';
import { API_SERVER_HOST } from '../../common/api/mainApi';

// 여드름 박스 그려진 이미지를 보여주는 컴포넌트
const AnnotatedImageBox = ({ imagePath, acneBoxes }) => {
  const [annotatedImage, setAnnotatedImage] = useState(null);

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

  if (!annotatedImage) return <p>이미지 처리 중...</p>;

  return (
    <img
      src={annotatedImage}
      alt="Bounding Box 시각화 이미지"
      style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
    />
  );
};

export default AnnotatedImageBox;