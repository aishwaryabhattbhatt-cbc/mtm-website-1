/* src/components/home/5-solutions/solutions.js */
export const productData = [
  {
    id: "MTM",
    slug: "mtm18",
    tools: [
      { id: "data-analysis", label: "Data Analysis", icon: "/mtm-website-1/icons/Tools/data-analysis.svg" },
      { id: "trending", label: "Trending", icon: "/mtm-website-1/icons/Tools/trending.svg" },
      { id: "forecasting", label: "Forecasting", icon: "/mtm-website-1/icons/Tools/forecasting.svg" },
    ]

  },
  {
    id: "Junior",
    slug: "juniors",
    tools: [
      { id: "data-analysis", label: "Data Analysis", icon: "/mtm-website-1/icons/Tools/data-analysis.svg" },
      { id: "trending", label: "Trending", icon: "/mtm-website-1/icons/Tools/trending.svg" },
    ]
    // clientLogos: "/mtm-website-1/images/products/junior.png"
  },
  {
    id: "Newcomers",
    slug: "newcomers",
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
}