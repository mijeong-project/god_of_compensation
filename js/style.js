// 슬라이드
var swiper = new Swiper(".mySwiper", {
  rewind: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function updateDistrict() {
  const citySelect = document.getElementById('city');
  const districtSelect = document.getElementById('district');
  const selectedCity = citySelect.value;

  // 시군구 데이터
  const districtData = {
    "서울": ["강남구", "서초구", "송파구", "마포구"],
    "경기": ["수원시", "성남시", "고양시", "용인시"],
    "부산": ["해운대구", "수영구", "부산진구", "동래구"]
  };

  // 기존 옵션 삭제
  districtSelect.innerHTML = '<option value="">시/군/구</option>';

  // 선택한 시/도의 구/군 불러오기
  if (selectedCity && districtData[selectedCity]) {
    districtData[selectedCity].forEach(function(district) {
      const option = document.createElement('option');
      option.value = district;
      option.text = district;
      districtSelect.appendChild(option);
    });
  }
}
