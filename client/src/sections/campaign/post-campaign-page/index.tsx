"use client";
import { campaignCategories } from "@/data/campaignConfig";
import { useWrite } from "@/hooks/useWrite";
import {
  Button,
  DateInput,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { getLocalTimeZone, today } from "@internationalized/date";
import useCampaignMetaDataService from "@/hooks/useCampaignMetaService";
import { Textarea } from "@nextui-org/react";

export interface PostCampaignProps {
  id: string;
  title: string;
  requestedFunds: number;
  deadline: number;
  campaignImg: string;
  description: string;
  category: string;
}

const PostCampaignForm: React.FC = () => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { executeFunc, txSuccess, hash } = useWrite();
  const [metadata, setMetadata] = useState<any>();
  const { saveCampaign, updateCampaignTx, removeCampaign } =
    useCampaignMetaDataService();
  const [formValues, setFormValues] = useState<PostCampaignProps>({
    id: "",
    title: "",
    requestedFunds: 0,
    deadline: Math.floor(
      today(getLocalTimeZone())
        .add({ days: 1 })
        .toDate(getLocalTimeZone())
        .getTime() / 1000
    ),
    campaignImg: "",
    description: "",
    category: "",
  });

  const resetForm = () => {
    setFormValues({
      id: "",
      title: "",
      requestedFunds: 0,
      deadline: Math.floor(
        today(getLocalTimeZone())
          .add({ days: 1 })
          .toDate(getLocalTimeZone())
          .getTime() / 1000
      ),
      campaignImg: "",
      description: "",
      category: "",
    });
  };

  React.useEffect(() => {
    if (txSuccess && metadata) {
      updateCampaignTx(metadata.id!!, hash!!).then((_) => {
        toast.success(`Transaction Successful ${hash}`);
        resetForm();
      });
    }
  }, [txSuccess, metadata]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]:
        event.target.type === "number"
          ? parseFloat(event.target.value)
          : event.target.value,
    });
  };
  const handleCategorySelect = (value: string) => {
    setFormValues((prev) => ({
      ...prev,
      category: value,
    }));
  };
  const handleDateChange = (value: number) => {
    const timestamp = Math.floor(value / 1000);
    setFormValues((prev) => ({
      ...prev,
      deadline: timestamp,
    }));
  };

  const validateForm = (data: PostCampaignProps) => {
    if (data.requestedFunds <= 0 || !data.requestedFunds) {
      throw Error("Please enter a valid amount");
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      validateForm(formValues);
      const savedCampaign = await saveCampaign(
        formValues.campaignImg,
        address || "",
        formValues.category,
        formValues.description
      );
      setMetadata(savedCampaign);
      const campaignExec = await executeFunc("createCampaign", [
        savedCampaign.id,
        formValues.title,
        ethers.utils.parseUnits(formValues.requestedFunds.toString(), "ether"),
        formValues.deadline,
        formValues.category,
      ]);
      if (!campaignExec) {
        removeCampaign(savedCampaign.id);
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-text sm:text-3xl">
          Create a new <span className="text-primary">Funding Campaign</span>
        </h1>
        <p className="mx-auto max-w-md text-center text-text">
          Get Started with raising funds for your next idea in crypto!
        </p>

        <form
          onSubmit={onSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 border border-primary"
        >
          <div className="relative mb-2">
            <p className="font-semibold text-primary mb-1">Title:</p>
            <Input
              isRequired={true}
              radius="sm"
              classNames={{
                inputWrapper: [
                  "bg-white text-black",
                  "h-12",
                  "border border-primary",
                  "hover:border hover:border-primary",
                  "!cursor-text",
                ],
              }}
              name="title"
              placeholder="e.g Decentralized Crowdfunding Platform"
              size="sm"
              variant="bordered"
              value={formValues.title}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative mb-2 col-span-1">
              <p className="font-semibold text-primary mb-1">
                Select Category:
              </p>
              <Select
                items={campaignCategories}
                value={formValues.category}
                placeholder="Select a Category"
                onChange={(e) => {
                  handleCategorySelect(e.target.value);
                }}
                name="category"
                isRequired={true}
                classNames={{
                  trigger: ["h-12", "rounded-md"],
                  base: ["h-12"],
                  popoverContent: ["text-black", "rounded-md"],
                }}
              >
                {campaignCategories.map((category, index) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="relative mb-2 col-span-1">
              <p className="font-semibold text-primary mb-1">Deadline:</p>
              <DateInput
                radius="sm"
                defaultValue={today(getLocalTimeZone()).add({ days: 1 })}
                isRequired={true}
                classNames={{
                  base: ["h-12"],
                  inputWrapper: ["h-12", "rounded-md"],
                }}
                name="deadline"
                minValue={today(getLocalTimeZone()).add({ days: 1 })}
                onChange={(e) =>
                  handleDateChange(
                    Number(e.toDate(getLocalTimeZone()).getTime())
                  )
                }
              />
            </div>
          </div>
          <div className="relative mb-2">
            <p className="font-semibold text-primary mb-1">
              Goal (Amount) in Eth:
            </p>
            <Input
              isRequired={true}
              radius="sm"
              classNames={{
                inputWrapper: [
                  "bg-white text-black",
                  "h-12",
                  "border border-primary",
                  "hover:border hover:border-primary",
                  "!cursor-text",
                ],
              }}
              name="requestedFunds"
              placeholder="e.g 4.5"
              size="sm"
              type="number"
              variant="bordered"
              value={formValues.requestedFunds.toString()}
              onChange={handleChange}
            />
          </div>

          <div className="relative mb-2">
            <p className="font-semibold text-primary mb-1">Description:</p>
            <Textarea
              isRequired={true}
              name="description"
              placeholder="Describe your campaign..."
              size="lg"
              radius="sm"
              value={formValues.description}
              onChange={handleChange}
              className="w-full"
              rows={4}
              classNames={{
                inputWrapper: [
                  "bg-white text-black",
                  "h-12",
                  "border border-primary",
                  "hover:border hover:border-primary",
                  "!cursor-text",
                ],
              }}
            />
          </div>

          <div className="relative mb-2">
            <p className="font-semibold text-primary mb-1">Image URL:</p>
            <Input
              isRequired={true}
              radius="sm"
              classNames={{
                inputWrapper: [
                  "bg-white text-black",
                  "h-12",
                  "border border-primary",
                  "hover:border hover:border-primary",
                  "!cursor-text",
                ],
              }}
              name="campaignImg"
              placeholder="e.g http://domain.com/my_campaign_image.png"
              size="sm"
              variant="bordered"
              value={formValues.campaignImg}
              onChange={handleChange}
            />
          </div>

          {address ? (
            <>
              <Button
                type="submit"
                variant="solid"
                color="primary"
                className="w-full rounded-md"
              >
                Post Campaign
              </Button>
            </>
          ) : (
            <Button
              variant="solid"
              color="primary"
              onClick={openConnectModal}
              className="w-full rounded-md"
            >
              Connect Wallet
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export { PostCampaignForm };
