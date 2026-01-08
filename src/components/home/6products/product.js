/* src/components/home/5-solutions/solutions.js */
import { initProductsBoard} from '../6products/productcards.js';

export const productData = [
  {
    id: "18",
    label: "MTM 18+",
    slug: "mtm18",
    subtitle: "Canadians 18+",
    description: "MTM 18+ pioneered media technology monitoring in Canada 25 years ago. Annually surveying over 12,000 Canadians.",
    ctaLabel: "Learn More",
    tools: [
      { id: "data-analysis", label: "Data Analysis", icon: "/mtm-website/icons/Tools/data-analysis.svg" },
      { id: "trending", label: "Trending", icon: "/mtm-website/icons/Tools/trending.svg" },
      { id: "forecasting", label: "Forecasting", icon: "/mtm-website/icons/Tools/forecasting.svg" },
    ]

  },
  {
    id: "Jr",
    label: "Juniors",
    slug: "juniors",
    subtitle: "Canadians 2-17",
    description: "MTM Junior is the first annual youth media survey in Canada. It focuses on the behaviours and activities of Canadians.",
    ctaLabel: "Learn More",
    tools: [
      { id: "data-analysis", label: "Data Analysis", icon: "/mtm-website/icons/Tools/data-analysis.svg" },
      { id: "trending", label: "Trending", icon: "/mtm-website/icons/Tools/trending.svg" },
    ]
    // clientLogos: "/mtm-website/images/products/junior.png"
  },
  {
    id: "NC",
    label: "Newcomers",
    slug: "newcomers",
    subtitle: "Arrivals in the past 5 years",
    description: "MTM Newcomers is the premier media and tech survey focusing on newcomers in Canada (within 5 years).",
    ctaLabel: "Learn More",
    tools: [
      { id: "data-analysis", label: "Data Analysis", icon: "/mtm-website/icons/Tools/data-analysis.svg" },
      ]
    // clientLogos: "/mtm-website/images/products/newcomers.png"
  },
  {
    id: "Census",
    label: "Census",
    slug: "census",
    subtitle: "Demographic data",
    description: "Understanding the Canadian population is critical for making smart business decisions.",
    ctaLabel: "Learn More",
    tools: [
      { id: "snapshot", label: "Snapshot", icon: "/mtm-website/icons/Tools/snapshot.svg" },
      { id: "drilldown", label: "Drilldown", icon: "/mtm-website/icons/Tools/drilldown.svg" },
      { id: "explorer", label: "Explorer", icon: "/mtm-website/icons/Tools/explorer.svg" },
      { id: "charter", label: "Charter", icon: "/mtm-website/icons/Tools/charter.svg" },
      { id: "compare", label: "Compare", icon: "/mtm-website/icons/Tools/compare.svg" }
      ]
    // clientLogos: "/mtm-website/images/products/census.png"
  },
];

export function startProducts() {
  initProductsBoard("18");
}
