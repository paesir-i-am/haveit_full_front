import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import PieChartWithNeedle from './PieChartWithNeedle';
import AnnotatedImageBox from '../component/AnnotatedImageBox';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './css/ResultSummarySlider.scss';

const ResultSummarySlider = ({ result }) => {
  // 모바일 감지
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 각 슬라이드별 선택 상태 (모바일에서만 사용)
  const [selectedPore, setSelectedPore] = useState('leftCheek');
  const [selectedWrinkle, setSelectedWrinkle] = useState('forehead');
  const [selectedPigmentation, setSelectedPigmentation] = useState('forehead');

  // 드롭다운 옵션
  const poreOptions = [
    { key: 'leftCheek', label: '왼쪽 볼' },
    { key: 'rightCheek', label: '오른쪽 볼' },
  ];
  const wrinkleOptions = [
    { key: 'forehead', label: '이마' },
    { key: 'rightEyeArea', label: '오른쪽 눈' },
    { key: 'leftEyeArea', label: '왼쪽 눈' },
  ];
  const pigmentationOptions = [
    { key: 'forehead', label: '이마' },
    { key: 'rightCheek', label: '오른쪽 볼' },
    { key: 'leftCheek', label: '왼쪽 볼' },
  ];

  const slides = [
    {
      title: '사용자 사진 분석 결과',
      content: <AnnotatedImageBox imagePath={result.imagePath} acneBoxes={result.acneBoxes} />,
    },
    {
      title: '모공 분석',
      content: isMobile ? (
        <div className="chart-grid">
          <div className="chart-item">
            <div style={{ marginBottom: '1rem', width: '100%' }}>
              <select className="custom-select" value={selectedPore} onChange={e => setSelectedPore(e.target.value)}>
                {poreOptions.map(opt => (
                  <option key={opt.key} value={opt.key}>{opt.label}</option>
                ))}
              </select>
            </div>
            <p>{poreOptions.find(opt => opt.key === selectedPore).label} 분석 등급: {result.pores[selectedPore] ?? '검출 불가 '}</p>
            <PieChartWithNeedle value={typeof result.pores[selectedPore] === 'number' ? result.pores[selectedPore] : 0} maxValue={5} title={poreOptions.find(opt => opt.key === selectedPore).label} />
          </div>
        </div>
      ) : (
        <div className="chart-grid">
          <div className="chart-item">
            <p>왼쪽 볼 분석 등급: {result.pores.leftCheek}</p>
            <PieChartWithNeedle value={result.pores.leftCheek} maxValue={5} title="왼쪽 볼" />
          </div>
          <div className="chart-item">
            <p>오른쪽 볼 분석 등급: {result.pores.rightCheek}</p>
            <PieChartWithNeedle value={result.pores.rightCheek} maxValue={5} title="오른쪽 볼" />
          </div>
        </div>
      ),
    },
    {
      title: '주름 분석',
      content: isMobile ? (
        <div className="chart-grid">
          <div className="chart-item">
            <div style={{ marginBottom: '1rem', width: '100%' }}>
              <select className="custom-select" value={selectedWrinkle} onChange={e => setSelectedWrinkle(e.target.value)}>
                {wrinkleOptions.map(opt => (
                  <option key={opt.key} value={opt.key}>{opt.label}</option>
                ))}
              </select>
            </div>
            <p>{wrinkleOptions.find(opt => opt.key === selectedWrinkle).label} 분석 등급: {result.wrinkles[selectedWrinkle] ?? '검출 불가 '}</p>
            <PieChartWithNeedle value={typeof result.wrinkles[selectedWrinkle] === 'number' ? result.wrinkles[selectedWrinkle] : 0} maxValue={6} title={wrinkleOptions.find(opt => opt.key === selectedWrinkle).label} />
          </div>
        </div>
      ) : (
        <div className="chart-grid">
          <div className="chart-item">
            <p>이마 분석 등급: {result.wrinkles.forehead ?? '검출 불가 '}</p>
            <PieChartWithNeedle value={result.wrinkles.forehead ?? 0} maxValue={6} title="이마" />
          </div>
          <div className="chart-item">
            <p>오른쪽 눈가 분석 등급: {result.wrinkles.rightEyeArea ?? '검출 불가 '}</p>
            <PieChartWithNeedle value={result.wrinkles.rightEyeArea ?? 0} maxValue={6} title="오른쪽 눈" />
          </div>
          <div className="chart-item">
            <p>왼쪽 눈가 분석 등급: {result.wrinkles.leftEyeArea ?? '검출 불가 '}</p>
            <PieChartWithNeedle value={result.wrinkles.leftEyeArea ?? 0} maxValue={6} title="왼쪽 눈" />
          </div>
        </div>
      ),
    },
    {
      title: '색소침착 분석',
      content: isMobile ? (
        <div className="chart-grid">
          <div className="chart-item">
            <div style={{ marginBottom: '1rem', width: '100%' }}>
              <select className="custom-select" value={selectedPigmentation} onChange={e => setSelectedPigmentation(e.target.value)}>
                {pigmentationOptions.map(opt => (
                  <option key={opt.key} value={opt.key}>{opt.label}</option>
                ))}
              </select>
            </div>
            <p>{pigmentationOptions.find(opt => opt.key === selectedPigmentation).label} 분석 등급: {result.pigmentations[selectedPigmentation] ?? '검출 불가 '}</p>
            <PieChartWithNeedle value={typeof result.pigmentations[selectedPigmentation] === 'number' ? result.pigmentations[selectedPigmentation] : 0} maxValue={5} title={pigmentationOptions.find(opt => opt.key === selectedPigmentation).label} />
          </div>
        </div>
      ) : (
        <div className="chart-grid">
          <div className="chart-item">
            <p>이마 분석 등급: {result.pigmentations.forehead ?? '검출 불가 '}</p>
            <PieChartWithNeedle value={result.pigmentations.forehead ?? 0} maxValue={5} title="이마" />
          </div>
          <div className="chart-item">
            <p>오른쪽 볼 분석 등급: {result.pigmentations.rightCheek ?? '검출 불가 '}</p>
            <PieChartWithNeedle value={result.pigmentations.rightCheek ?? 0} maxValue={5} title="오른쪽 볼" />
          </div>
          <div className="chart-item">
            <p>왼쪽 볼 분석 등급: {result.pigmentations.leftCheek ?? '검출 불가 '}</p>
            <PieChartWithNeedle value={result.pigmentations.leftCheek ?? 0} maxValue={5} title="왼쪽 볼" />
          </div>
        </div>
      ),
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div className='slider-container'>
    <Slider {...settings}>
      {slides.map((slide, idx) => (
        <div key={idx} className={`slide-item ${slide.title === '사용자 사진 분석 결과' ? 'centered-text' : ''}`}>
          <h3>{slide.title}</h3>
          <div>{slide.content}</div>
        </div>
      ))}
    </Slider>
    </div>
  );
};

export default ResultSummarySlider;