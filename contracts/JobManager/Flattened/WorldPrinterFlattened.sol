
// File: 
@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol


pragma solidity ^0.8.0;

interface AggregatorV3Interface {
  function decimals() external view returns (uint8);

  function description() external view returns (string memory);

  function version() external view returns (uint256);

  function getRoundData(uint80 _roundId)
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    );

  function latestRoundData()
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    );
}

// File: contracts/ThreeDToken.sol


// Importing required libraries and contracts
pragma solidity ^0.8.7;


contract WorldPrinter {
    // Address of the Chainlink ETH/USD price oracle contract
    AggregatorV3Interface internal priceFeed;
    /**
     * Network: Mumbai Testnet
     * Aggregator: ETH/USD
     * Address: 0x0715A7794a1dc8e42615F059dD6e406A6594651A
     */

    // Address of the admin of the marketplace
    address public admin;

    //Create a mapping of all addresses to how much they have earned from 
printing
    mapping(address => uint256[]) public printIDsByAddress;
    mapping(string => int[]) public printerLocations;

    // Struct for representing a print job
    struct PrintJob {
        address user;
        address printer;
        string fileCID;
        uint256 priceUSD;
        uint256 priceWei;
        Material material;
        Status status;
        uint256 releaseTime;
        string location;
    }

    enum Status {
        ACCEPTED,
        PAID,
        RELEASED,
        DISPUTED
    }

    enum Material {
        ABS,
        PLA,
        NYLON,
        TPU
    }

    // Array of all print jobs
    PrintJob[] public printJobs;

    // Mapping of print job IDs to their respective print job objects
    mapping(uint256 => PrintJob) public printJobMap;

    // Constructor function
    constructor() {
        admin = msg.sender;
        priceFeed = 
AggregatorV3Interface(0x0715A7794a1dc8e42615F059dD6e406A6594651A);
    }

    //* function for converting USD to wei
    function usdToWei(uint256 _usdAmount) public view returns (uint256) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int256 price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        // calculate the conversion rate
        uint256 conversionRate = uint256(price);
        // calculate the wei amount
        uint256 weiAmount = (_usdAmount * 10 ** 26) / conversionRate;
        return weiAmount;
        }

    // Function for posting a print job
    function postPrintJob(string memory fileCID, uint256 priceUSD, string 
memory locale, Material _material) public payable {
        require(msg.value >= usdToWei(priceUSD), "Incorrect payment 
amount.");
        PrintJob memory newPrintJob = PrintJob({
            user: msg.sender,
            printer: address(0),
            fileCID: fileCID,
            priceUSD: priceUSD,
            priceWei: msg.value,
            material: _material,
            location: locale,
            status: Status.PAID,
            releaseTime: 0
        });
        printJobs.push(newPrintJob);
        uint256 newPrintJobId = printJobs.length - 1;
        printJobMap[newPrintJobId] = newPrintJob;
    }

    // Function for accepting a print job, 
    //release time set to 1 minute but needs to be set to five days in the 
final 
    function acceptPrintJob(uint256 printJobId) public {
        require(msg.sender != printJobMap[printJobId].user, "Cannot accept 
own print job.");
        //require(!printJobMap[printJobId].accepted, "Print job has 
already been accepted.");
        require(printJobMap[printJobId].status == Status.PAID, "Print job 
doesn't exist");
        printJobMap[printJobId].printer = msg.sender;
        printJobMap[printJobId].status = Status.ACCEPTED;
        printJobMap[printJobId].releaseTime = block.timestamp + 1 minutes;
    }

    // Function for printer to request funds from a print job from escrow
    function requestFunds(uint256 printJobId) public {
        require(msg.sender == printJobMap[printJobId].printer, "Only the 
printer can request release of funds.");
        require(printJobMap[printJobId].status == Status.ACCEPTED, "Print 
job has not been accepted yet");
        require(printJobMap[printJobId].status != Status.RELEASED, "Funds 
have already been released.");
        require(printJobMap[printJobId].status != Status.DISPUTED, "The 
user has disputed the print.");
        require(printJobMap[printJobId].releaseTime <= block.timestamp, 
"Cannot release funds before escrow period ends.");
        printJobMap[printJobId].status = Status.RELEASED;
        // Pays the printer 90% of the amount (rest is kept in the 
contract)
        uint256 amountpay = printJobMap[printJobId].priceWei*9/10;
        payable(msg.sender).transfer(amountpay);
    }

    // Function for escalating to arbitration
    function dispute(uint256 printJobId) public {
        require(msg.sender == printJobMap[printJobId].user, "Only the user 
can dispute a print job");
        require(printJobMap[printJobId].status == Status.ACCEPTED, "Print 
job has not been accepted yet.");
        require(printJobMap[printJobId].status!= Status.RELEASED, "Funds 
have already been released.");    
        printJobMap[printJobId].status = Status.DISPUTED;
    }

    // Function for admin to resolve arbitration
    function resolve(uint256 printJobId, uint256 payUser, uint256 
payPrinter) public {
        require(printJobMap[printJobId].status == Status.DISPUTED, "This 
print job is not being disputed");
        require(msg.sender == admin, "Only the admin can resolve a 
dispute");
        require(payUser+payPrinter==printJobMap[printJobId].priceWei, 
"incorrect amounts supplied");
        address payable 
payUserAddress=payable(printJobMap[printJobId].user);
        address payable 
payPrinterAddress=payable(printJobMap[printJobId].printer);
        payable(payUserAddress).transfer(payUser);
        payable(payPrinterAddress).transfer(payPrinter);

    }

    function getPrintJobDetails(uint256 printJobId) public view returns 
(address, address, string memory, uint256, Status, uint256, Material) {
        PrintJob memory printJob = printJobMap[printJobId];
        return (printJob.user, printJob.printer, printJob.fileCID, 
printJob.priceUSD, printJob.status, printJob.releaseTime, 
printJob.material);
    }

}
