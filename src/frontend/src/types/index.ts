export type {
  NavLink,
  PortfolioItem,
  ProcessStep,
  Service,
  Stat,
} from "@/lib/site";

export type RevealDirection = "up" | "left" | "right" | "scale" | "cover";

export type InquiryDraft = {
  name: string;
  email: string;
  service: string;
  message: string;
};
