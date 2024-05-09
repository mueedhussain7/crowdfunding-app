// SPDX-License-Identifier: MIT
pragma solidity >0.7.0 <=0.9.0;

contract CampaignFactory {
    struct Contributor {
        uint amount;
        bool exists;
    }

    struct Campaign {
        string title;
        uint goal;
        bool completed;
        uint noOfContributors;
        uint raisedAmount;
        uint deadline;
        string category;
        mapping(address => Contributor) contributors;
        address[] contributorAddresses;
        address campaignCreator;
    }

    mapping(string => Campaign) public campaigns;
    string[] public campaignIds; // Array to store campaign IDs
    uint public numCampaigns;

    // Mapping to track campaign IDs by owner
    mapping(address => string[]) public campaignsByOwner;

    // Events declaration
    event ContributionReceived(
        address contributor,
        string campaignId,
        uint amount
    );
    event RefundIssued(address contributor, string campaignId, uint amount);

    event CampaignCreated(
        string campaignId,
        string title,
        uint goal,
        address creator
    );
    event InvestmentWithdrawn(string campaignId, uint amount);

    // Function for any user to create their campaign
    function createCampaign(
        string memory _campaignId,
        string memory _title,
        uint _goal,
        uint _deadline,
        string memory _category
    ) public {
        require(bytes(_campaignId).length > 0, "Campaign ID cannot be empty");
        require(campaigns[_campaignId].campaignCreator == address(0), "Campaign with this ID already exists");

        Campaign storage newCampaign = campaigns[_campaignId];
        newCampaign.title = _title;
        newCampaign.category = _category;
        newCampaign.goal = _goal;
        newCampaign.completed = false;
        newCampaign.noOfContributors = 0;
        newCampaign.raisedAmount = 0;
        newCampaign.deadline = _deadline;
        newCampaign.campaignCreator = msg.sender;

        campaignIds.push(_campaignId); // Add campaign ID to array
        campaignsByOwner[msg.sender].push(_campaignId);
        numCampaigns++;

        emit CampaignCreated(_campaignId, _title, _goal, msg.sender);
    }

    // Function to contribute to a specific campaign
    function contribute(string memory _campaignId) public payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(
            block.timestamp < campaign.deadline,
            "Deadline for this campaign has passed"
        );

        if (!campaign.contributors[msg.sender].exists) {
            campaign.noOfContributors++;
            campaign.contributors[msg.sender] = Contributor(msg.value, true);
            campaign.contributorAddresses.push(msg.sender);
        } else {
            campaign.contributors[msg.sender].amount += msg.value;
        }
        campaign.raisedAmount += msg.value;

        emit ContributionReceived(msg.sender, _campaignId, msg.value);
    }

    // Function to withdraw investment by campaign creator
    function withdrawInvestment(string memory _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(
            msg.sender == campaign.campaignCreator,
            "Only campaign creator can withdraw funds"
        );
        require(campaign.raisedAmount >= campaign.goal, "Target not met");
        require(!campaign.completed, "Campaign already completed");

        payable(msg.sender).transfer(campaign.raisedAmount);
        campaign.completed = true;

        emit InvestmentWithdrawn(_campaignId, campaign.raisedAmount);
    }

    // Function to get campaign IDs owned by a specific address
    function getCampaignIdsByOwner(
        address owner
    ) public view returns (string[] memory) {
        return campaignsByOwner[owner];
    }

    // Function to get all active campaigns
    function getAllCampaigns()
        public
        view
        returns (
            string[] memory,
            string[] memory,
            uint[] memory,
            uint[] memory
        )
    {
        uint activeCount = 0;
        for (uint i = 0; i < campaignIds.length; i++) {
            if (!campaigns[campaignIds[i]].completed) {
                activeCount++;
            }
        }

        if (activeCount == 0) {
            revert("No active campaigns");
        }

        string[] memory ids = new string[](activeCount);
        string[] memory titles = new string[](activeCount);
        uint[] memory goals = new uint[](activeCount);
        uint[] memory deadlines = new uint[](activeCount);

        uint activeIndex = 0;
        for (uint i = 0; i < campaignIds.length; i++) {
            string memory campaignId = campaignIds[i];
            if (!campaigns[campaignId].completed) {
                ids[activeIndex] = campaignId;
                titles[activeIndex] = campaigns[campaignId].title;
                goals[activeIndex] = campaigns[campaignId].goal;
                deadlines[activeIndex] = campaigns[campaignId].deadline;
                activeIndex++;
            }
        }

        return (ids, titles, goals, deadlines);
    }

    // Function to get a campaign by its ID
    function getCampaign(
        string memory _campaignId
    )
        public
        view
        returns (
            string memory title,
            uint goal,
            bool completed,
            uint noOfContributors,
            uint raisedAmount,
            uint deadline,
            address campaignCreator,
            string memory category
        )
    {
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.title,
            campaign.goal,
            campaign.completed,
            campaign.noOfContributors,
            campaign.raisedAmount,
            campaign.deadline,
            campaign.campaignCreator,
            campaign.category
        );
    }

    // Function to get all campaign details by a specific address
    function getCampaignsByAddress(
        address owner
    )
        public
        view
        returns (
            string[] memory ids,
            string[] memory titles,
            uint[] memory goals,
            uint[] memory deadlines,
            string[] memory categories,
            bool[] memory completed,
            uint[] memory raisedAmounts
        )
    {
        string[] memory ownedCampaignIds = campaignsByOwner[owner];
        uint count = ownedCampaignIds.length;

        ids = new string[](count);
        titles = new string[](count);
        goals = new uint[](count);
        deadlines = new uint[](count);
        categories = new string[](count);
        completed = new bool[](count);
        raisedAmounts = new uint[](count);

        for (uint i = 0; i < count; i++) {
            string memory campaignId = ownedCampaignIds[i];
            Campaign storage campaign = campaigns[campaignId];
            ids[i] = campaignId;
            titles[i] = campaign.title;
            goals[i] = campaign.goal;
            deadlines[i] = campaign.deadline;
            categories[i] = campaign.category;
            completed[i] = campaign.completed;
            raisedAmounts[i] = campaign.raisedAmount;
        }
        return (
            ids,
            titles,
            goals,
            deadlines,
            categories,
            completed,
            raisedAmounts
        );
    }

    // Function to get all campaign details where a specific address has contributed
    function getContributions(
        address contributor
    )
        public
        view
        returns (
            string[] memory ids,
            string[] memory titles,
            uint[] memory goals,
            uint[] memory deadlines,
            string[] memory categories,
            bool[] memory completed,
            uint[] memory raisedAmounts
        )
    {
        string[] memory tempIds = new string[](numCampaigns);
        uint count = 0;
        for (uint i = 0; i < campaignIds.length; i++) {
            string memory campaignId = campaignIds[i];
            if (campaigns[campaignId].contributors[contributor].exists) {
                tempIds[count] = campaignId;
                count++;
            }
        }

        ids = new string[](count);
        titles = new string[](count);
        goals = new uint[](count);
        deadlines = new uint[](count);
        categories = new string[](count);
        completed = new bool[](count);
        raisedAmounts = new uint[](count);

        for (uint j = 0; j < count; j++) {
            string memory campaignId = tempIds[j];
            Campaign storage campaign = campaigns[campaignId];
            ids[j] = campaignId;
            titles[j] = campaign.title;
            goals[j] = campaign.goal;
            deadlines[j] = campaign.deadline;
            categories[j] = campaign.category;
            completed[j] = campaign.completed;
            raisedAmounts[j] = campaign.raisedAmount;
        }
        return (
            ids,
            titles,
            goals,
            deadlines,
            categories,
            completed,
            raisedAmounts
        );
    }

    function getContributors(string memory _campaignId)
    public
    view
    returns (address[] memory, uint[] memory)
{
    Campaign storage campaign = campaigns[_campaignId];
    uint numContributors = campaign.contributorAddresses.length;
    address[] memory addresses = new address[](numContributors);
    uint[] memory amounts = new uint[](numContributors);

    for (uint i = 0; i < numContributors; i++) {
        address contributorAddress = campaign.contributorAddresses[i];
        addresses[i] = contributorAddress;
        amounts[i] = campaign.contributors[contributorAddress].amount;
    }
    return (addresses, amounts);
}


    function claimRefund(string memory _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(
            block.timestamp > campaign.deadline,
            "Campaign deadline has not yet passed"
        );
        require(
            campaign.raisedAmount < campaign.goal,
            "Campaign funding goal was met"
        );
        Contributor storage contributor = campaign.contributors[msg.sender];
        require(contributor.exists, "You did not contribute to this campaign");
        require(contributor.amount > 0, "No funds to claim");

        uint refundAmount = contributor.amount;
        contributor.amount = 0;
        payable(msg.sender).transfer(refundAmount);
        emit RefundIssued(msg.sender, _campaignId, refundAmount);
    }
}
