import { ConnectButton as ConnectButtonBase } from "@rainbow-me/rainbowkit";
import { useDisconnect } from "wagmi";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  User,
} from "@nextui-org/react";

import { truncateAddress } from "@/utils/fn";
import Link from "next/link";

export function ConnectButton() {
  const { disconnect } = useDisconnect();

  return (
    <ConnectButtonBase.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    className="rounded-md"
                    variant="solid"
                    color="primary"
                    onClick={openConnectModal}
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    className="rounded-md"
                    color="primary"
                    variant="bordered"
                    onClick={openChainModal}
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <Dropdown
                  radius="sm"
                  classNames={{
                    base: "before:bg-default-200",
                    content: "p-0 border-small border-divider bg-background",
                  }}
                >
                  <DropdownTrigger>
                    <Button
                      className="rounded-md"
                      variant="bordered"
                      color="primary"
                    >
                      {truncateAddress(account.address)}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label=""
                    disabledKeys={["profile"]}
                    className="p-1"
                    itemClasses={{
                      base: [
                        "rounded-md",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "data-[hover=true]:bg-primary",
                        "dark:data-[hover=true]:bg-primary",
                        "data-[selectable=true]:focus:bg-primary",
                        "data-[pressed=true]:opacity-70",
                        "data-[focus-visible=true]:ring-default-500",
                      ],
                    }}
                  >
                    <DropdownSection aria-label="Profile & Actions">
                      <DropdownItem
                        isReadOnly
                        key="profile"
                        className="h-14 gap-2"
                      >
                        <User
                          name={truncateAddress(account.address)}
                          description={account.displayBalance}
                          classNames={{
                            name: "text-black font-semibold",
                            description: "text-default-500",
                          }}
                        />
                      </DropdownItem>
                      <DropdownItem
                        key="dashboard"
                        onClick={() => copyToClipBoard(account.address)}
                      >
                        Copy Address
                      </DropdownItem>
                      <DropdownItem key="dashboard" href="/campaign/dashboard">
                        View Dashboard
                      </DropdownItem>
                      <DropdownItem key="settings" onClick={() => disconnect()}>
                        Disconnect
                      </DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              );
            })()}
          </div>
        );
      }}
    </ConnectButtonBase.Custom>
  );
}

const copyToClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
