import { useWrite } from "@/hooks/useWrite";
import { CampaignItemType } from "@/types/interfaces";
import { hasReachedGoal } from "@/utils/fn";
import { Button } from "@nextui-org/react";
import React, { FC } from "react";
import { toast } from "react-toastify";

interface OwnerControlProps {
  campaign: CampaignItemType;
  id: string;
  onComplete: () => void;
}

const OwnerControl: FC<OwnerControlProps> = ({ campaign, id, onComplete }) => {
  const { executeFunc, txSuccess, hash } = useWrite();

  const handleWithdraw = async () => {
    try {
      await executeFunc("withdrawInvestment", [id!!]);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
      return false;
    }
  };
  React.useEffect(() => {
    if (txSuccess) {
      toast.success("Transaction Successful: " + hash);
      onComplete();
    }
  }, [txSuccess, hash]);
  return (
    <div>
      {hasReachedGoal(campaign.requestedFunds, campaign.raisedAmount!!) ? (
        !campaign.status ? (
          <div>
            <Button
              className="rounded-md w-full"
              color="primary"
              onClick={handleWithdraw}
            >
              Withdraw Investment
            </Button>
            <p className="text-sm text-primary mt-2">
              The raised funds can be withdrawn
            </p>
          </div>
        ) : (
          campaign.status && (
            <p className="text-sm text-white">Investment Withdrawn</p>
          )
        )
      ) : (
        <p className="text-primary text-base mt-2">
          The campaign has raised {campaign.raisedAmount} ETH so far
        </p>
      )}
      <p className="text-white text-sm mt-1">
        You are the owner of this campaign
      </p>
    </div>
  );
};

export { OwnerControl };
