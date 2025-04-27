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
    "서울": ["강남구", "서초구", "송파구", "마포구"],
    "경기": ["수원시", "성남시", "고양시", "용인시"],
    "부산": ["해운대구", "수영구", "부산진구", "동래구"]
  };

  districtSelect.innerHTML = '<option value="">시/군/구</option>';

  if (selectedCity && districtData[selectedCity]) {
    districtData[selectedCity].forEach(function(district) {
      const option = document.createElement('option');
      option.value = district;
      option.text = district;
      districtSelect.appendChild(option);
    });
  }
}

// ============== 약관 모달 열기 ==============
document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', function() {
    const target = document.getElementById(this.dataset.target);
    target.style.display = 'flex';
    setTimeout(() => {
      target.classList.add('active');
    }, 10);
  });
});

// ============== 약관 모달 닫기 ==============
document.querySelectorAll('.close, .submit__btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const modal = this.closest('.modal');
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 400);
  });
});

// 모달 바깥 클릭 시 닫기
window.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
    setTimeout(() => {
      e.target.style.display = 'none';
    }, 400);
  }
});

// ============== 체크박스 상태 토글 ==============
function toggleCheck(element) {
  let checkbox;

  if (element.tagName === 'LABEL') {
    const id = element.getAttribute('for');
    checkbox = document.getElementById(id);
    element = checkbox.parentElement;
  } else {
    checkbox = element.querySelector('input[type="checkbox"]');
  }

  if (!checkbox) return;

  if (checkbox.id === 'selectall') {
    checkbox.checked = !checkbox.checked;
    selectAll(checkbox);
  } else {
    checkbox.checked = !checkbox.checked;
    element.classList.toggle('checked');
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

// form 모달 열기 (아래서 위로 스르륵)
fixedBtn.addEventListener('click', function (e) {
  e.preventDefault();
  formModal.style.display = 'block';
  setTimeout(() => {
    formModal.classList.add('active');
    document.body.classList.add('modal-open'); // 스크롤 막기
  }, 10);
});

// form 모달 바깥 클릭 시 닫기
window.addEventListener('click', function (e) {
  if (e.target.classList.contains('form__section') && e.target.classList.contains('modal')) {
    formModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
      formModal.style.display = 'none';
    }, 500);
  }
});
