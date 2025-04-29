// ============== 슬라이드 ==============
var swiper = new Swiper(".mySwiper", {
  rewind: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// ============== input 필터 (시,군,구) ==============
function updateDistrict() {
  const citySelect = document.getElementById('city');
  const districtSelect = document.getElementById('district');
  const selectedCity = citySelect.value;

  const districtData = {
    "서울": ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
    "경기": ["수원시", "성남시", "의정부시", "안양시", "부천시", "광명시", "평택시", "동두천시", "안산시", "고양시", "과천시", "구리시", "남양주시", "오산시", "시흥시", "군포시", "의왕시", "하남시", "용인시", "파주시", "이천시", "안성시", "김포시", "화성시", "광주시", "양주시", "포천시", "여주시", "연천군", "가평군", "양평군"],
    "인천": ["계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군"],
    "강원": ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"],
    "충북": ["청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "음성군", "단양군"],
    "충남": ["천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"],
    "대전": ["대덕구", "동구", "서구", "유성구", "중구"],
    "세종특별자치시": ["세종특별자치시"],
    "전북": ["전주시", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"],
    "전남": ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"],
    "광주": ["광산구", "남구", "동구", "북구", "서구"],
    "경북": ["포항시", "경주시", "긴천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"],
    "경남": ["창원시", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군"],
    "부산": ["강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구", "기장군"],
    "대구": ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"],
    "울산": ["남구", "동구", "북구", "중구", "울주군군"],
    "제주특별자치도": ["서귀포시", ""]
  };

  districtSelect.innerHTML = '<option value="">시/군/구</option>';

  if (selectedCity && districtData[selectedCity]) {
    districtData[selectedCity].forEach(function (district) {
      const option = document.createElement('option');
      option.value = district;
      option.text = district;
      districtSelect.appendChild(option);
    });
  }
}

// 모달 열기
document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', function () {
    const target = document.getElementById(this.dataset.target);
    if (!target) return;

    target.style.display = 'flex';
    setTimeout(() => {
      target.classList.add('active');
      target.querySelector('.modal__content').classList.add('slide-up');
    }, 10);
  });
});

// 모달 닫기 (누른 버튼이 속한 모달 타입에 따라 구분)
document.querySelectorAll('.close, .submit__btn, .modal__button').forEach(btn => {
  btn.addEventListener('click', function () {
    const closestModal = this.closest('.modal');
    const closestFormSection = this.closest('.form__section');

    if (closestModal) {
      closestModal.classList.remove('active');
      closestModal.querySelector('.modal__content')?.classList.remove('slide-up');
      setTimeout(() => {
        closestModal.style.display = 'none';
      }, 400);
    }

    if (closestFormSection) {
      closestFormSection.classList.remove('active');
      setTimeout(() => {
        closestFormSection.style.display = 'none';
        document.body.classList.remove('modal-open');
      }, 400);
    }
  });
});

// ============== 체크박스 상태 토글 ==============
function toggleCheck(element) {
  let checkbox;
  let customDiv;

  if (element.tagName === 'LABEL') {
    const id = element.getAttribute('for');
    checkbox = document.getElementById(id);
    customDiv = checkbox.parentElement;
  } else {
    checkbox = element.querySelector('input[type="checkbox"]');
    customDiv = element;
  }

  if (!checkbox) return;

  checkbox.checked = !checkbox.checked;

  if (checkbox.id === 'selectall') {
    selectAll(checkbox);
  } else {
    if (checkbox.checked) {
      customDiv.classList.add('checked');
    } else {
      customDiv.classList.remove('checked');
    }
    checkSelectAll();
  }
}

// 전체 동의 체크
function selectAll(selectAllInput) {
  const checkboxes = document.getElementsByName('agree');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAllInput.checked;
    if (checkbox.parentElement.classList.contains('custom-checkbox')) {
      if (selectAllInput.checked) {
        checkbox.parentElement.classList.add('checked');
      } else {
        checkbox.parentElement.classList.remove('checked');
      }
    }
  });

  const selectAllDiv = selectAllInput.parentElement;
  if (selectAllInput.checked) {
    selectAllDiv.classList.add('checked');
  } else {
    selectAllDiv.classList.remove('checked');
  }
}

// 개별 체크 시 전체 동의 체크 여부 확인
function checkSelectAll() {
  const selectAllInput = document.getElementById('selectall');
  const checkboxes = document.getElementsByName('agree');
  const isAllChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);

  selectAllInput.checked = isAllChecked;

  const selectAllDiv = selectAllInput.parentElement;
  if (isAllChecked) {
    selectAllDiv.classList.add('checked');
  } else {
    selectAllDiv.classList.remove('checked');
  }
}

// ============== 상담 신청 모달 (.form__section.modal) ==============
const formModal = document.querySelector('.form__section.modal');
const fixedBtn = document.querySelector('.fixed a');

fixedBtn.addEventListener('click', function (e) {
  e.preventDefault();
  formModal.style.display = 'block';
  setTimeout(() => {
    formModal.classList.add('active');
    document.body.classList.add('modal-open');
  }, 10);
});
