import { FC } from "react";
import { CampaignItemType } from "@/types/interfaces";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";
import { hasDeadlinePassed, hasReachedGoal } from "@/utils/fn";

interface CampaignItemProps {
  campaign: CampaignItemType;
  userType?: "owner" | "contributor";
}

const CampaignItem: FC<CampaignItemProps> = ({ campaign, userType }) => {
  return (
    <Card className="max-w-[400px] h-full bg-primary bg-opacity-10 text-white rounded-md border border-primary">
      <CardHeader className="flex flex-col gap-2">
        <div className="h-[225px]">
          <Image
            src={campaign.imageUrl || ""}
            alt=""
            width={1000}
            height={1000}
            className="w-full h-full object-cover transition duration-500"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="mt-4 text-md font-medium text-primary">
            {campaign.title}
          </h3>
          <p className="text-xs">{campaign.desc}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-sm">
              Requested Funds:{" "}
              <span className="font-bold text-secondary">
                {campaign.requestedFunds} ETH
              </span>
            </p>
            <p className="text-sm">
              Deadline:{" "}
              <span className="font-bold text-primary">
                {campaign.deadline}
              </span>
            </p>
          </div>
          {userType && (
            <Chip className={getBadgeMeta(campaign, userType).style}>
              {getBadgeMeta(campaign, userType).text}
            </Chip>
          )}
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex flex-col w-full gap-2">
          <Button className="rounded-md" variant="bordered" color="primary">
            <Link
              href={`/campaign?id=${campaign.id}`}
              className="w-full h-full flex justify-center items-center"
            >
              View Details
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const getBadgeMeta = (
  campaign: CampaignItemType,
  userType: "owner" | "contributor"
): { style: string; text: string } => {
  const goalReached = hasReachedGoal(
    Number(campaign.requestedFunds),
    Number(campaign.raisedAmount)
  );
  const deadlinePassed = hasDeadlinePassed(Number(campaign.deadline));

  if (goalReached) {
    if (!campaign.status) {
      return {
        style: "bg-green-300 border border-green-500 text-xs text-green-800",
        text: userType === "owner" ? "Withdraw Now" : "Goal Met",
      };
    } else {
      return {
        style: "bg-green-900 border border-white text-xs text-white",
        text: userType === "owner" ? "Withdrawn" : "Investment Withdrawn",
      };
    }
  } else {
    if (deadlinePassed) {
      return {
        style: "bg-red-300 border border-red-500 text-xs text-red-200",
        text: userType === "owner" ? "Failed" : "Pull Investment",
      };
    } else {
      return {
        style: "bg-yellow-300 border border-yellow-500 text-xs text-yellow-800",
        text: "On-going",
      };
    }
  }
};

export { CampaignItem };
