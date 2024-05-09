import { getLocalTimeZone, today } from "@internationalized/date";

export function truncateAddress(address?: string) {
  if (!address) return "";
  return `${address?.slice(0, 6)}…${address?.slice(-4)}`;
}

export function hasReachedGoal(
  requestedFunds: number | bigint,
  raisedAmount: number | bigint
): boolean {
  return Number(requestedFunds) <= Number(raisedAmount);
}

export function hasDeadlinePassed(deadline: number): boolean {
  return (
    Math.floor(
      today(getLocalTimeZone())
        .toDate(getLocalTimeZone())
        .getTime() / 1000
    ) > deadline
  );
}
