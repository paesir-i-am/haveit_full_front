import React from 'react';
import Slider from 'react-slick';
import PieChartWithNeedle from './PieChartWithNeedle';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './css/ResultSummarySlider.scss';

const ResultSummarySlider = ({ result }) => {
  const slides = [
    {
      title: '사용자 사진 분석 결과',
      content: <p style={{ whiteSpace: 'pre-line' }}>{result.summary}</p>,
    },
    {
      title: '모공 분석',
      content: (
        <div className="chart-grid">
          <div className="chart-item">
            <p>왼쪽 볼 모공 분석 등급: {result.pores.leftCheek}</p>
            <PieChartWithNeedle value={result.pores.leftCheek} maxValue={5} title="왼쪽 볼" />
          </div>
          <div className="chart-item">
            <p>오른쪽 볼 모공 분석 등급: {result.pores.rightCheek}</p>
            <PieChartWithNeedle value={result.pores.rightCheek} maxValue={5} title="오른쪽 볼" />
          </div>
        </div>
      ),
    },
    {
      title: '주름 분석',
      content: (
        <div className="chart-grid">
          <div className="chart-item">
            <p>이마 주름 분석 등급: {result.wrinkles.forehead ?? '검출 불가 '}</p>
            <PieChartWithNeedle value={result.wrinkles.forehead ?? 0} maxValue={6} title="이마" />
          </div>
          <div className="chart-item">
            <p>오른쪽 눈가 주름 분석 등급: {result.wrinkles.rightEyeArea ?? '검출 불가 '}</p>
            <PieChartWithNeedle value={result.wrinkles.rightEyeArea ?? 0} maxValue={6} title="오른쪽 눈" />
          </div>
          <div className="chart-item">
            <p>왼쪽 눈가 주름 분석 등급: {result.wrinkles.leftEyeArea ?? '검출 불가 '}</p>
            <PieChartWithNeedle value={result.wrinkles.leftEyeArea ?? 0} maxValue={6} title="왼쪽 눈" />
          </div>
        </div>
      ),
    },
    {
      title: '색소침착 분석',
      content: (
        <div className="chart-grid">
          <div className="chart-item">
            <p>이마 색소침착 분석 등급: {result.pigmentations.forehead ?? '검출 불가 '}</p>
            <PieChartWithNeedle value={result.pigmentations.forehead ?? 0} maxValue={5} title="이마" />
          </div>
          <div className="chart-item">
            <p>오른쪽 볼 색소침착 분석 등급: {result.pigmentations.rightCheek ?? '검출 불가 '}</p>
            <PieChartWithNeedle value={result.pigmentations.rightCheek ?? 0} maxValue={5} title="오른쪽 볼" />
          </div>
          <div className="chart-item">
            <p>왼쪽 볼 색소침착 분석 등급: {result.pigmentations.leftCheek ?? '검출 불가 '}</p>
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
    adaptiveHeight: false,
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