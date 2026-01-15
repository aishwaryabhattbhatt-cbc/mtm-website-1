/* src/components/home/Reports/reportinfo.js */
export function updateReportInfo(productId, reportData) {
  // Find the product in the data array passed from the Astro component
  const product = reportData.find(p => p.id.toLowerCase() === productId.toLowerCase());
  if (!product) return;

  // Update Text Content
  const nameElem = document.getElementById('report-name');
  if (nameElem) nameElem.textContent = product.reportName;

  // Update Percentage Ring
  const root = document.getElementById('percentage-root');
  if (root) {
    const textElem = root.querySelector('.percentage__text');
    const ringFg = root.querySelector('.percentage__ring--fg');
    if (textElem) textElem.textContent = `${product.percentage}%`;
    if (ringFg) {
      const radius = (60 - 6) / 2;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference * (1 - product.percentage / 100);
      ringFg.style.strokeDasharray = `${circumference}`;
      ringFg.style.strokeDashoffset = `${offset}`;
    }
  }

  // Update Columns
  document.getElementById('info-title-2').textContent = product.col1Title;
  document.getElementById('info-desc-2').textContent = product.col1Desc;
  document.getElementById('info-title-3').textContent = product.col2Title;
  document.getElementById('info-desc-3').textContent = product.col2Desc;

  // Update the Hero/Report Image using the CSV path
  const reportImg = document.querySelector('.reports-image img'); 
  if (reportImg && product.reportImage) {
    reportImg.src = product.reportImage;
    reportImg.alt = `${product.id} Report Image`; 
  }
  }
