import { CampaignSupporterType } from "@/types/interfaces";
import { ScrollShadow, Spinner } from "@nextui-org/react";
import React from "react";
import { FC } from "react";

interface CampaignSupportsPreviewProps {
  isLoading: boolean;
  supporters: CampaignSupporterType[];
}
const CampaignSupportsPreview: FC<CampaignSupportsPreviewProps> = ({
  supporters,
  isLoading,
}) => {
  return (
    <div className="bg-[#16102F] p-6 rounded-lg shadow-lg gap-2 h-[45vh] flex flex-col">
      <h2 className="text-secondary text-lg font-semibold mb-4">Supporters</h2>
      <div className="w-full h-full flex flex-col overflow-y-hidden">
        <ScrollShadow className="w-full h-full">
          {supporters && supporters.length > 0 ? (
            <>
              {supporters.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-[#16102F] px-4 py-2 sm:py-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center border border-[#9646FA] mb-4"
                  >
                    <div className="flex flex-col mb-2 sm:mb-0 w-full sm:w-auto">
                      <span className="font-medium text-sm  text-white">
                        Wallet Address:
                      </span>
                      <span className="font-mono text-xs text-white break-all">
                        {item.walletAddress}
                      </span>
                    </div>
                    <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
                      <span className="block text-sm  text-white">
                        {item.amountEth} ETH
                      </span>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex flex-col w-full h-full items-center justify-center">
              {isLoading ? (
                <Spinner color="primary" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <p className="font-semibold text-center">
                    No Supporters found
                  </p>
                  <p className="text-center text-sm">
                    Be the first one to support
                  </p>
                </div>
              )}
            </div>
          )}
        </ScrollShadow>
      </div>
    </div>
  );
};

export { CampaignSupportsPreview };
