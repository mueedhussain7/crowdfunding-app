import { SupportCampaignModal } from "@/components/Modals";
import { useWrite } from "@/hooks/useWrite";
import { CampaignItemType } from "@/types/interfaces";
import { hasDeadlinePassed, hasReachedGoal } from "@/utils/fn";
import { Button } from "@nextui-org/react";
import { ethers } from "ethers";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useBalance } from "wagmi";

interface SupporterControlProps {
  campaign: CampaignItemType;
  id: string;
  onComplete: () => void;
}

const SupporterControl: FC<SupporterControlProps> = ({
  campaign,
  id,
  onComplete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address } = useAccount();
  const balance = useBalance({ address: address });
  const { executeFunc, txSuccess, hash } = useWrite();

  const handleSupportNowClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (pledgeAmount: string) => {
    try {
      await executeFunc(
        "contribute",
        [id!!],
        ethers.utils.parseUnits(pledgeAmount.toString(), "ether")
      );
      return true;
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
      return false;
    }
  };

  const handleClaimRefund = async () => {
    try {
      await executeFunc("claimRefund", [id!!]);
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
      setIsModalOpen(false);
      onComplete();
    }
  }, [txSuccess, hash]);

  return (
    <div className="w-full">
      {!hasReachedGoal(campaign.requestedFunds, campaign.raisedAmount!!) ? (
        <>
          {hasDeadlinePassed(Number(campaign.deadline)) ? (
            <Button
              className="rounded-md w-full"
              color="primary"
              onClick={handleClaimRefund}
            >
              Reclaim Pledged Amount
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              <Button
                className="rounded-md w-full"
                color="primary"
                onClick={handleSupportNowClick}
              >
                Support Now
              </Button>
              <p className="text-primary text-sm">
                The campaign has raised {campaign.raisedAmount} ETH so far
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <p className = "text-white">This campaign has met it's target!</p>
          {campaign.status ? (
            <p className="text-sm text-primary mt-2">
              The amount was withdrawn by the campaign Owner
            </p>
          ) : (
            <p className="text-sm text-primary mt-2">
              The campaign funds can be withdrawn by the campaign creator
            </p>
          )}
        </>
      )}

      <SupportCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        balance={parseFloat(
          ethers.utils.formatEther(
            balance.data?.value ? balance.data?.value : 0
          )
        )}
      />
    </div>
  );
};

export { SupporterControl };
