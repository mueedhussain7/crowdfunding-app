import { Badge } from "@/components/Badge";
import { CampaignItemType } from "@/types/interfaces";
import { hasReachedGoal } from "@/utils/fn";
import { Button, Progress } from "@nextui-org/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { SupporterControl } from "./supporter-control";
import { OwnerControl } from "./owner-control";

interface CampaignDetailsProps {
  campaign: CampaignItemType;
  id: string;
  onComplete: () => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({
  campaign,
  id,
  onComplete,
}) => {
  const account = useAccount();
  const { openConnectModal } = useConnectModal();

  return (
    <div className="w-full h-full bg-[#0D111C] rounded-lg p-6 flex flex-col gap-3 relative shadow-xl shadow-[#FF00C7]/20">
      <div className="absolute inset-x-0 top-0 -translate-y-1/2 mx-auto w-max">
        <span className="text-sm font-semibold uppercase text-[#9646FA] bg-[#251645] border border-[#9646FA] rounded-full px-3 py-1">
          {campaign.category}
        </span>
      </div>
      <div className="flex flex-col gap-2 mt-8">
        <h2 className="text-2xl font-bold text-white">{campaign.title}</h2>
        <div className="flex flex-row gap-4 text-sm items-center text-gray-300">
          <p>
            <span className="font-medium mr-1">Campaign Deadline: </span>
            {campaign.deadline}
          </p>
          <p>
            <span className="font-medium mr-1">Status: </span>
            <Badge
              title={
                campaign.status
                  ? "Withdrawn"
                  : hasReachedGoal(
                      campaign.requestedFunds,
                      campaign.raisedAmount!!
                    )
                  ? "Closed"
                  : "Active"
              }
            />
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-md text-[#FF00C7]">Funds Pledged</p>
          <p className="text-4xl text-[#FF00C7]">
            {campaign.requestedFunds} <span className="font-bold">ETH</span>
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <Progress
            color="primary"
            size="md"
            aria-label="Loading..."
            value={
              (Number(campaign.raisedAmount) / campaign.requestedFunds) * 100
            }
          />
        </div>
        {account.address ? (
          <>
            {campaign.campaignCreator == account.address ? (
              <OwnerControl
                campaign={campaign}
                id={id}
                onComplete={onComplete}
              />
            ) : (
              <SupporterControl
                campaign={campaign}
                id={id}
                onComplete={onComplete}
              />
            )}
          </>
        ) : (
          <>
            <Button
              className="rounded-md"
              variant="solid"
              color="primary"
              onClick={openConnectModal}
            >
              Connect Wallet
            </Button>
            <p className="text-white">Please connect your wallet to support</p>
          </>
        )}
      </div>
    
    </div>
  );
};

export { CampaignDetails }
