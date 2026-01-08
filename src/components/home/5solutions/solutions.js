/* src/components/home/5-solutions/solutions.js */
import { initSolutionsBoard } from '../../home/5 solutions/rolebutton';

export const solutionsData = [
  {
    id: "advertising",
    label: "Advertising",
    description: "Tailor your campaigns with precision. Access audience data that helps you optimize spend and reach the right segments at the right time.",
    ctaLabel: "EXPLORE SOLUTIONS FOR ADVERTISING",
    clientLogos: "/mtm-website/client-logos/advertising.svg"
  },
  {
    id: "industry",
    label: "Industry",
    description: "Understand your customers better with in-depth media consumption data. Refine your marketing strategies to boost engagement and drive conversions.",
    ctaLabel: "EXPLORE SOLUTIONS FOR INDUSTRIES",
    clientLogos: "/mtm-website/client-logos/industry.svg"
  },
  {
    id: "media",
    label: "Media",
    description: "Access clear insights into audience behaviours and emerging trends to guide your programming choices, strengthen your content strategy, and improve media planning outcomes.",
    ctaLabel: "EXPLORE SOLUTIONS FOR MEDIA",
    clientLogos: "/mtm-website/client-logos/media.svg"
  },
  {
    id: "education",
    label: "Education",
    description: "Equip your education team with data-driven insights to identify opportunities, understand client needs, and close deals more effectively.",
    ctaLabel: "EXPLORE SOLUTIONS FOR EDUCATION",
    clientLogos: "/mtm-website/client-logos/education.svg"
  },
  {
    id: "govn",
    label: "Govn & NGO",
    description: "Leverage comprehensive media and technology data to inform your strategic decisions, identify growth opportunities, and stay ahead of industry trends.",
    ctaLabel: "EXPLORE SOLUTIONS FOR GOVN & NGO",
    clientLogos: "/mtm-website/client-logos/govn.svg"
  }
];

export function startSolutions() {
    initSolutionsBoard(solutionsData);
}