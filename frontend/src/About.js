import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

const About = () => {
  useEffect(() => {
    // Script điều khiển accordion
    const accordionHeaders = document.querySelectorAll(`.${styles.accordionHeader}`);
    
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        accordionItem.classList.toggle(styles.active);
      });
    });
    
    // Cleanup khi component unmount
    return () => {
      accordionHeaders.forEach(header => {
        header.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <nav className={styles.navBar}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <Link to="/" className={styles.navButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Trang chủ</span>
            </Link>
            <Link to="/dashboard" className={styles.navButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span>Dự đoán</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className={styles.aboutContainer}>
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <h1>Hiểu Về Bệnh Parkinson</h1>
            <p className={styles.lead}>Công cụ hỗ trợ phát hiện và theo dõi sớm các dấu hiệu bệnh Parkinson</p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.container}>
            <div className={styles.card}>
              <h2>Bệnh Parkinson là gì?</h2>
              <p>Bệnh Parkinson là một rối loạn thần kinh thoái hóa tiến triển, ảnh hưởng đến hệ thống vận động của cơ thể. Bệnh phát triển do sự suy giảm tế bào thần kinh trong một vùng não gọi là chất đen (substantia nigra), dẫn đến giảm sản xuất dopamine - một chất dẫn truyền thần kinh quan trọng.</p>
              
              <div className={styles.infoBox}>
                <p><strong>Số liệu thống kê:</strong> Bệnh Parkinson ảnh hưởng đến hơn 10 triệu người trên toàn cầu. Tại Việt Nam, ước tính có khoảng 100.000 người mắc bệnh này.</p>
              </div>
            </div>

            <div className={styles.card}>
              <h2>Dấu hiệu và triệu chứng</h2>
              <div className={styles.symptomsGrid}>
                <div className={styles.symptomItem}>
                  <div className={styles.symptomIcon}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
                      <path d="M12 2v4"></path><path d="M12 18v4"></path>
                      <path d="M4.93 4.93l2.83 2.83"></path>
                      <path d="M16.24 16.24l2.83 2.83"></path>
                    </svg>
                  </div>
                  <h3>Run rẩy (Tremor)</h3>
                  <p>Thường bắt đầu ở một tay hoặc ngón tay và xảy ra khi nghỉ ngơi.</p>
                </div>
                
                <div className={styles.symptomItem}>
                  <div className={styles.symptomIcon}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <h3>Cứng cơ (Rigidity)</h3>
                  <p>Cứng cơ ở tay, chân và thân người, gây khó khăn khi cử động.</p>
                </div>
                
                <div className={styles.symptomItem}>
                  <div className={styles.symptomIcon}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 16l-4-4 4-4"></path>
                      <path d="M4 8l4 4-4 4"></path>
                      <path d="M16 4l-4 16"></path>
                    </svg>
                  </div>
                  <h3>Chậm vận động (Bradykinesia)</h3>
                  <p>Giảm tốc độ cử động và khó bắt đầu các động tác.</p>
                </div>
                
                <div className={styles.symptomItem}>
                  <div className={styles.symptomIcon}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20"></path>
                      <path d="M6 14h12"></path>
                      <path d="M6 6h12"></path>
                    </svg>
                  </div>
                  <h3>Mất thăng bằng</h3>
                  <p>Khó giữ tư thế thẳng và dễ bị ngã.</p>
                </div>
                
                <div className={styles.symptomItem}>
                  <div className={styles.symptomIcon}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 10L19 18C19 19.1046 18.1046 20 17 20H7C5.89543 20 5 19.1046 5 18V10"></path>
                      <path d="M12 3L12 15"></path>
                      <path d="M9 6L12 3L15 6"></path>
                    </svg>
                  </div>
                  <h3>Thay đổi giọng nói</h3>
                  <p>Giọng nhỏ đi, đơn điệu hoặc lặp từ khi nói.</p>
                </div>
                
                <div className={styles.symptomItem}>
                  <div className={styles.symptomIcon}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <path d="M16 17l5-5-5-5"></path>
                      <path d="M21 12H9"></path>
                    </svg>
                  </div>
                  <h3>Khó viết chữ</h3>
                  <p>Chữ viết nhỏ đi và khó đọc (micrographia).</p>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h2>Cách sử dụng công cụ dự đoán</h2>
              <div className={styles.usageSteps}>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h3>Nhập thông tin cá nhân</h3>
                    <p>Điền đầy đủ thông tin cá nhân cơ bản như tuổi và giới tính.</p>
                  </div>
                </div>
                
                <div className={styles.step}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h3>Cung cấp thông số lâm sàng</h3>
                    <p>Điền các thông số vận động như mức độ run, cứng cơ và chậm vận động.</p>
                  </div>
                </div>
                
                <div className={styles.step}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h3>Thêm dữ liệu giọng nói (nếu có)</h3>
                    <p>Nếu có phân tích giọng nói, hãy nhập các chỉ số như jitter, shimmer và HNR.</p>
                  </div>
                </div>
                
                <div className={styles.step}>
                  <div className={styles.stepNumber}>4</div>
                  <div className={styles.stepContent}>
                    <h3>Nhập kết quả xét nghiệm bổ sung</h3>
                    <p>Nếu có kết quả DaTscan hoặc mức dopamine, hãy cung cấp thông tin này.</p>
                  </div>
                </div>
                
                <div className={styles.step}>
                  <div className={styles.stepNumber}>5</div>
                  <div className={styles.stepContent}>
                    <h3>Nhận kết quả dự đoán</h3>
                    <p>Hệ thống sẽ phân tích và cung cấp dự đoán về nguy cơ mắc bệnh Parkinson.</p>
                  </div>
                </div>
              </div>

              <div className={styles.importantNote}>
                <h3>Lưu ý quan trọng</h3>
                <p>Công cụ này chỉ hỗ trợ sàng lọc ban đầu và không thay thế chẩn đoán của bác sĩ chuyên khoa. Vui lòng tham khảo ý kiến bác sĩ để được chẩn đoán và điều trị chính xác.</p>
              </div>
            </div>

            <div className={styles.card}>
              <h2>Lựa chọn điều trị</h2>
              <p>Hiện tại không có cách chữa khỏi hoàn toàn bệnh Parkinson, nhưng có nhiều biện pháp giúp kiểm soát triệu chứng và cải thiện chất lượng cuộc sống:</p>
              
              <div className={styles.treatmentOptions}>
                <div className={styles.treatmentItem}>
                  <h3>Thuốc</h3>
                  <p>Levodopa, chất đối kháng dopamine và thuốc MAO-B có thể giúp giảm các triệu chứng vận động.</p>
                </div>
                
                <div className={styles.treatmentItem}>
                  <h3>Phẫu thuật</h3>
                  <p>Kích thích não sâu (DBS) có thể giúp giảm run và cứng cơ ở một số bệnh nhân không đáp ứng với thuốc.</p>
                </div>
                
                <div className={styles.treatmentItem}>
                  <h3>Vật lý trị liệu</h3>
                  <p>Các bài tập vật lý trị liệu giúp cải thiện sự linh hoạt, thăng bằng và khả năng đi lại.</p>
                </div>
                
                <div className={styles.treatmentItem}>
                  <h3>Âm ngữ trị liệu</h3>
                  <p>Hỗ trợ cải thiện các vấn đề về giọng nói và nuốt.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <h2>Câu hỏi thường gặp</h2>
            
            <div className={styles.accordion}>
              <div className={styles.accordionItem}>
                <div className={styles.accordionHeader}>Bệnh Parkinson có di truyền không?</div>
                <div className={styles.accordionContent}>
                  <p>Khoảng 10-15% trường hợp Parkinson có yếu tố di truyền. Đa số trường hợp là do sự kết hợp giữa yếu tố di truyền và môi trường.</p>
                </div>
              </div>
              
              <div className={styles.accordionItem}>
                <div className={styles.accordionHeader}>Công cụ này có thể chẩn đoán chính xác bệnh Parkinson không?</div>
                <div className={styles.accordionContent}>
                  <p>Không, công cụ này chỉ cung cấp dự đoán về khả năng mắc bệnh dựa trên các thông số đầu vào. Chẩn đoán chính xác cần được thực hiện bởi bác sĩ chuyên khoa thần kinh.</p>
                </div>
              </div>
              
              <div className={styles.accordionItem}>
                <div className={styles.accordionHeader}>Tôi nên làm gì nếu kết quả dự đoán cho thấy nguy cơ cao?</div>
                <div className={styles.accordionContent}>
                  <p>Hãy tham khảo ý kiến bác sĩ chuyên khoa thần kinh càng sớm càng tốt. Bác sĩ sẽ thực hiện các kiểm tra lâm sàng và có thể chỉ định các xét nghiệm bổ sung để chẩn đoán chính xác.</p>
                </div>
              </div>
              
              <div className={styles.accordionItem}>
                <div className={styles.accordionHeader}>Bệnh có thể được phát hiện qua xét nghiệm máu không?</div>
                <div className={styles.accordionContent}>
                  <p>Hiện tại không có xét nghiệm máu đơn lẻ nào có thể chẩn đoán bệnh Parkinson. Chẩn đoán chủ yếu dựa vào triệu chứng lâm sàng và đánh giá của bác sĩ chuyên khoa thần kinh.</p>
                </div>
              </div>
              
              <div className={styles.accordionItem}>
                <div className={styles.accordionHeader}>Bệnh Parkinson có điều trị được không?</div>
                <div className={styles.accordionContent}>
                  <p>Hiện tại chưa có phương pháp điều trị khỏi hoàn toàn, nhưng có nhiều cách để kiểm soát triệu chứng và cải thiện chất lượng cuộc sống. Các phương pháp bao gồm thuốc, phẫu thuật và liệu pháp hỗ trợ.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;