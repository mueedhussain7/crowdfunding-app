import React, { FC, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

interface SupportCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pledgeAmount: string) => Promise<boolean>;
  balance: number;
}

const SupportCampaignModal: FC<SupportCampaignModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  balance,
}) => {
  const [pledgeAmount, setPledgeAmount] = useState("");
  return (
    <div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
      >
        <ModalContent className="bg-primary rounded-md">
          <ModalHeader className="flex flex-col gap-1 text-white"></ModalHeader>
          <ModalBody>
            <h2 className="text-xl font-bold text-white">
              Please Enter The Amount
            </h2>
            <p className="text-sm text text-white">
              Remember that the projects will be funded only if the goal is
              reached, you will be refunded otherwise.
            </p>

            <Input
              isClearable
              radius="sm"
              classNames={{
                inputWrapper: [
                  "bg-black text-white",
                  "h-10",
                  "border border-primary",
                  "hover:border hover:border-primary",
                  "!cursor-text",
                ],
              }}
              placeholder="0.00"
              size="sm"
              variant="bordered"
              value={pledgeAmount}
              onChange={(e) => setPledgeAmount(e.target.value)}
              onClear={() => setPledgeAmount("")}
            />
            <p className="text-sm text-black">
              Total Available Balance: {balance.toFixed(6)}{" "}
              <span className="font-bold">ETH</span>
            </p>
          </ModalBody>
          <ModalFooter>
            <div className="flex flex-col w-full">
              <Button color="secondary" onPress={()=>onSubmit(pledgeAmount)} className="w-full">
                Sign and Submit Transaction
              </Button>
              <p className="text-xs text-center text-white mt-4">
                By using this application, you agree to our{" "}
                <span className="text-semibold text-white hover:text-black cursor-pointer">
                  terms and conditions.
                </span>
              </p>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export { SupportCampaignModal };
