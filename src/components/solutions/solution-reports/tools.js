/* src/components/home/5-solutions/solutions.js */
export const productData = [
  {
    id: "MTM",
    slug: "mtm18",
    reportImage: "/mtm-website-1/images/solutions/latest-reports/reports-mtm.png",
    tools: [
      { id: "data-analysis", label: "Data Analysis", icon: "/mtm-website-1/icons/Tools/data-analysis.svg" },
      { id: "trending", label: "Trending", icon: "/mtm-website-1/icons/Tools/trending.svg" },
      { id: "forecasting", label: "Forecasting", icon: "/mtm-website-1/icons/Tools/forecasting.svg" },
    ]

  },
  {
    id: "Junior",
    slug: "juniors",
    reportImage: "/mtm-website-1/images/solutions/latest-reports/reports-junior.png",
    tools: [
      { id: "data-analysis", label: "Data Analysis", icon: "/mtm-website-1/icons/Tools/data-analysis.svg" },
      { id: "trending", label: "Trending", icon: "/mtm-website-1/icons/Tools/trending.svg" },
    ]
    // clientLogos: "/mtm-website-1/images/products/junior.png"
  },
  {
    id: "Newcomers",
    slug: "newcomers",
    reportImage: "/mtm-website-1/images/solutions/latest-reports/reports-newcomers.png",
    tools: [
      { id: "data-analysis", label: "Data Analysis", icon: "/mtm-website-1/icons/Tools/data-analysis.svg" },
      ]
    // clientLogos: "/mtm-website-1/images/products/newcomers.png"
  },
  
];

export function updateReportsUI(productId) {
  const product = productData.find(p => p.id === productId);
  if (!product) return;

  // 1. Update Tools List
  const toolsContainer = document.getElementById('tools-items');
  if (toolsContainer) {
    toolsContainer.innerHTML = '';
    product.tools.forEach(tool => {
      const item = document.createElement('div');
      item.className = 'tool-item';
      item.innerHTML = `
        <img src="${tool.icon}" alt="${tool.label}" class="tool-icon" />
        <span class="body-m">${tool.label}</span>
      `;
      toolsContainer.appendChild(item);
    });
  }

  // 2. Update Hero/Report Image
  const reportImg = document.querySelector('.reports-image img');
  if (reportImg) {
    reportImg.src = product.reportImage;
    reportImg.alt = `${product.id} Report Image`;
  }
}