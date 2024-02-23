function getColorAverage(hexColor: string) {
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);
  return (r + g + b) / 3;
}

export function getRandomColor(opacity: number) {
  const MAX_HEX_COLOR_VALUE: number = 16777215;
  const COLOR_AVERAGE_THRESHOLD: number = 128; // 색상 평균 임계값 설정
  let randomColor: string, backgroundColor: string;

  do {
    randomColor = Math.floor(Math.random() * MAX_HEX_COLOR_VALUE)
      .toString(16)
      .padStart(6, '0');
    backgroundColor = `#${randomColor}${Math.floor(opacity * 255)
      .toString(16)
      .padStart(2, '0')}`;
  } while (
    randomColor === 'ffffff' ||
    randomColor === '000000' ||
    backgroundColor === '#ffffff' ||
    backgroundColor === '#000000' ||
    getColorAverage(randomColor) >= COLOR_AVERAGE_THRESHOLD // 색상 평균이 임계값 이상인 경우 다시 색상 생성
  );

  return { color: `#${randomColor}`, backgroundColor };
}
