/* src/components/home/Reports/reportinfo.js */

export const reportInfoData = [
    {
      id: "MTM",
      reportName: "MTM 18+ Report 2025",
      btnText: "READ FULL REPORT", 
      btnLink: "", 
      // Configuration for the Percentage Component
        percentage: 25,
        percentSize: 60,
        percentStroke: 6,
      iconPath: "/mtm-website-1/icons/Reports/latest-report.svg",
      columns: [
        { title: "Broad Reach", desc: "MTM 18+ covers 95% of UK households with comprehensive media data." },
        { title: "Strategic", desc: "Ready-to-use frameworks for understanding nationwide behavior." }
      ]
    },
    {
      id: "Junior",
      reportName: "MTM Junior: Digital Youth",
      btnText: "EXPLORE JUNIOR DATA",
      btnLink: "",
      // Configuration for the Percentage Component
        percentage: 45,
        percentSize: 60,
        percentStroke: 6,
      iconPath: "/mtm-website-1/icons/Reports/latest-report.svg",
      columns: [
        { title: "Youth Trends", desc: "Tracking the fast-moving digital world of children and young people." },
        { title: "Engagement", desc: "Understanding how the next generation consumes media today." }
      ]
    },
    {
      id: "Newcomers",
      reportName: "MTM Newcomers: Emerging Tech",
      btnText: "VIEW NEWCOMERS INSIGHTS",
      btnLink: "",
      // Configuration for the Percentage Component
      percentage: 85,
      percentSize: 60,
      percentStroke: 6,
      iconPath: "/mtm-website-1/icons/Reports/latest-report.svg",
      columns: [
        { title: "New Horizons", desc: "Analyzing the media habits of those new to the technology landscape." },
        { title: "Growth", desc: "Evidence-based strategies for reaching emerging audiences." }
      ]
    }
  ];
  
  export function updateReportInfo(productId) {
    const product = reportInfoData.find(p => p.id === productId);
    if (!product) return;
  
    // Update the Report Name
    const nameElem = document.getElementById('report-name');
    if (nameElem) nameElem.textContent = product.reportName;
  
    // Update the Button Text and Link
    const linkElem = document.getElementById('report-link'); 
    if (linkElem) {
      linkElem.textContent = product.btnText;
      linkElem.href = product.btnLink;
    }

    /* src/components/home/Reports/reportinfo.js */

// Update the Icon in Column 3
const iconElem = document.getElementById('info-icon');
if (iconElem) {
    if (product.iconPath) {
        iconElem.src = product.iconPath;
        iconElem.style.display = "block"; // Show if path exists
        
        // Ensure the parent container is visible if you are using the circular background
        const iconContainer = iconElem.closest('.info-icon-container');
        if (iconContainer) iconContainer.style.display = "flex";
    } else {
        iconElem.style.display = "none"; // Hide if no icon is provided
        
        const iconContainer = iconElem.closest('.info-icon-container');
        if (iconContainer) iconContainer.style.display = "none";
    }
}

    
    // Update the Percentage Ring
    const root = document.getElementById('percentage-root');
  if (root) {
    const textElem = root.querySelector('.percentage__text');
    const ringFg = root.querySelector('.percentage__ring--fg');

    if (textElem) textElem.textContent = `${product.percentage}%`;

    if (ringFg) {
      // Calculate math using the variables from the JS object
      const radius = (product.percentSize - product.percentStroke) / 2;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference * (1 - product.percentage / 100);

      // Update the SVG attributes dynamically
      ringFg.style.strokeDasharray = `${circumference}`;
      ringFg.style.strokeDashoffset = `${offset}`;
      ringFg.setAttribute('stroke-width', product.percentStroke);
    }
  }
  
    // Update dynamic columns 2 and 3
    product.columns.forEach((col, index) => {
      const num = index + 2; 
      const titleElem = document.getElementById(`info-title-${num}`);
      const descElem = document.getElementById(`info-desc-${num}`);
      
      if (titleElem) titleElem.textContent = col.title;
      if (descElem) descElem.textContent = col.desc;
    });
  }