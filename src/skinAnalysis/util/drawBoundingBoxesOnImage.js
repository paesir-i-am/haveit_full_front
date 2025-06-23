// 여드름 좌표를 이미지에 그려서 새로운 base64 이미지 생성
export default function drawBoundingBoxesOnImage(imageBase64, bboxes) {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.src = imageBase64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      // 원본 이미지 그리기
      ctx.drawImage(img, 0, 0);

      // Bounding Box 스타일
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;

      bboxes.forEach(([x1, y1, x2, y2]) => {
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        ctx.font = '14px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('Acne', x1, y1 - 5); // 박스 위에 라벨
      });

      // 처리된 이미지 반환
      resolve(canvas.toDataURL('image/jpeg'));
    };
  });
}