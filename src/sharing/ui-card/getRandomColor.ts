let currentIndex = 0;

export function getRandomColor(opacity: number) {
  const colorList = [
    '73a8dc',
    'a2d7c5',
    'a6df8e',
    'fccd7f',
    'f59b9b',
    'e18ebc',
    '9b74b3',
  ];

  // 현재 인덱스에 해당하는 색상을 선택합니다.
  const selectedColor = colorList[currentIndex];

  // 배경색을 생성합니다.
  const backgroundColor = `#${selectedColor}${Math.floor(opacity * 255)
    .toString(16)
    .padStart(2, '0')}`;

  // 인덱스를 증가시키거나, 필요한 경우에 리셋합니다.
  currentIndex = (currentIndex + 1) % colorList.length;

  return { color: `#${selectedColor}`, backgroundColor };
}
