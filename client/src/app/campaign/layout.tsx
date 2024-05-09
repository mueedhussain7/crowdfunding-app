import { FC, ReactNode } from "react";

interface CampaignLayoutProps {
  children: ReactNode;
}

const CampaignLayout: FC<CampaignLayoutProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default CampaignLayout;
