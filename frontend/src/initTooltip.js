// /frontend/src/initTooltip.js
import { initializeTooltips } from './Tooltip';
import './Tooltip.css';

// Khởi tạo hệ thống tooltip khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', () => {
  initializeTooltips();
});