// src/utils/format.js

// 꼭 앞에 'export'가 있어야 다른 파일에서 가져다 쓸 수 있습니다!
export const formatDays = (dateString) => {
  // 방어 코드: 데이터가 없거나 길이가 안 맞으면 기본값 반환
  if (!dateString || dateString.length !== 7) return "반복 없음";
  
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const activeDays = [];

  for (let i = 0; i < 7; i++) {
    // '-'가 아니면(보통 1이나 다른 문자면) 해당 요일 활성화
    if (dateString[i] !== '-') { 
      activeDays.push(days[i]);
    }
  }

  if (activeDays.length === 7) return "매일";
  if (activeDays.length === 0) return "반복 없음";
  
  return activeDays.join(', ');
};