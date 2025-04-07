// /frontend/src/Tooltip.js

// Định nghĩa các thông tin tooltip cho từng thông số đầu vào
const tooltipData = {
    // Thông số cơ bản
    'age': {
      title: 'Tuổi',
      content: 'Tuổi của bệnh nhân có thể ảnh hưởng đến nguy cơ mắc Parkinson. Bệnh thường phát triển ở người trên 60 tuổi.'
    },
    'gender': {
      title: 'Giới tính',
      content: 'Nam giới có xu hướng mắc bệnh Parkinson cao hơn nữ giới với tỷ lệ khoảng 1.5:1.'
    },
    
    // Thông số vận động
    'tremor_score': {
      title: 'Mức độ run',
      content: 'Đo lường mức độ run rẩy tay, chân hoặc cơ thể khi nghỉ ngơi. Đánh giá từ 0 (không có) đến 4 (nghiêm trọng).'
    },
    'rigidity_score': {
      title: 'Độ cứng cơ',
      content: 'Đo lường sự cứng cơ khi cử động thụ động. Đánh giá từ 0 (bình thường) đến 4 (nghiêm trọng).'
    },
    'bradykinesia_score': {
      title: 'Chậm vận động',
      content: 'Đo lường tốc độ và biên độ cử động bị giảm sút. Đánh giá từ 0 (bình thường) đến 4 (chậm nghiêm trọng).'
    },
    'posture_score': {
      title: 'Tư thế', 
      content: 'Đánh giá tư thế của bệnh nhân, độ gù và mất thăng bằng. Đánh giá từ 0 (bình thường) đến 4 (nghiêm trọng).'
    },
    
    // Thông số giọng nói
    'jitter': {
      title: 'Jitter (Độ dao động tần số)', 
      content: 'Đo sự dao động chu kỳ giữa các chu kỳ rung âm liên tiếp. Tăng cao trong bệnh nhân Parkinson.'
    },
    'shimmer': { 
      title: 'Shimmer (Độ dao động biên độ)',
      content: 'Đo sự dao động biên độ giữa các chu kỳ rung âm liên tiếp. Thường tăng ở người bệnh Parkinson.'
    },
    'hnr': {
      title: 'Tỷ lệ âm thanh-nhiễu (HNR)',
      content: 'Đo tỷ lệ giữa phần âm thanh và phần nhiễu trong giọng nói. Giảm thấp trong bệnh Parkinson.'
    },
    
    // Thông số xét nghiệm
    'dopamine_level': {
      title: 'Mức Dopamine',
      content: 'Nồng độ dopamine phản ánh tình trạng tế bào thần kinh tạo dopamine trong não. Thấp ở người bệnh Parkinson.'
    },
    'datscan_result': {
      title: 'Kết quả DaTscan',
      content: 'Kết quả chụp cắt lớp phát xạ đơn photon để đánh giá các thụ thể dopamine trong não.'
    }
  };
  
  // Hàm khởi tạo tooltips
  function initializeTooltips() {
    // Lấy tất cả các phần tử có thuộc tính data-tooltip
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
      const tooltipKey = element.getAttribute('data-tooltip');
      
      if (tooltipData[tooltipKey]) {
        // Tạo biểu tượng thông tin
        const infoIcon = document.createElement('span');
        infoIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
        infoIcon.className = 'tooltip-icon';
        
        // Tạo nội dung tooltip
        const tooltipContainer = document.createElement('div');
        tooltipContainer.className = 'tooltip-container';
        tooltipContainer.innerHTML = `
          <div class="tooltip-title">${tooltipData[tooltipKey].title}</div>
          <div class="tooltip-content">${tooltipData[tooltipKey].content}</div>
        `;
        
        // Thêm vào phần tử
        element.classList.add('tooltip-parent');
        element.appendChild(infoIcon);
        element.appendChild(tooltipContainer);
        
        // Xử lý sự kiện
        infoIcon.addEventListener('mouseenter', () => {
          tooltipContainer.classList.add('active');
        });
        
        infoIcon.addEventListener('mouseleave', () => {
          tooltipContainer.classList.remove('active');
        });
      }
    });
  }
  
  // Export để có thể sử dụng từ các file khác
  export { initializeTooltips, tooltipData };