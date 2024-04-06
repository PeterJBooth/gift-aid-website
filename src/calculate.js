// Consider when tax paid is negative.

const getGiftAidEligibilityInformation = (
  grossIncome,
  donationAmount,
  livesInScotland,
  pensionContribution,
  claimsAdditionalGiftAidTaxRelief,
  claimsAdditionalPensionTaxRelief,
  selectedIncomeInterval,
  selectedDonationInterval,
  pensionformat
) => {
  // console.log("income " + selectedIncomeInterval);
  // console.log("donation " + selectedDonationInterval);

  // Cost units are in £

  // info we need
  // Income Tax Table (Tax amount) x
  // Income Tax Amount x
  // Tax Band x
  // Adjust Pension Amount (if original Percentage)
  // Pension Tax Relief x
  // gift

  const convertedPensionContribution = convertToFixedAmount(
    pensionContribution,
    pensionformat,
    grossIncome
  );

  const incomeTaxTable = createIncomeTaxTable(grossIncome, livesInScotland);
  let incomeTaxAmount = calculateIncomeTax(incomeTaxTable);
  const taxBand = getTaxPayersTaxBand(incomeTaxTable);
  let pensionTaxReliefAmount = calculatePensionTaxRelief(
    convertedPensionContribution,
    claimsAdditionalPensionTaxRelief,
    taxBand
  );

  const convertedIncomeTaxAmount = convertToDonationTimeScale(
    incomeTaxAmount,
    selectedIncomeInterval,
    selectedDonationInterval
  );
  const convertedPensionTaxReliefAmount = convertToDonationTimeScale(
    pensionTaxReliefAmount,
    selectedIncomeInterval,
    selectedDonationInterval
  );

  const totalTaxPaid = calculateTotalTaxPaid(
    convertedIncomeTaxAmount,
    convertedPensionTaxReliefAmount
  );

  const giftAidToClaim = calculateGiftAidToClaim(donationAmount);
  const giftAidTaxRelief = calculateGiftAidTaxRelief(
    claimsAdditionalGiftAidTaxRelief,
    donationAmount,
    taxBand
  );

  const canClaimGiftAid = determineIfCanClaimGiftAid(
    giftAidToClaim,
    giftAidTaxRelief,
    totalTaxPaid
  );

  const giftAidDonationCap = calculateGiftAidDonationCap(
    claimsAdditionalGiftAidTaxRelief,
    totalTaxPaid,
    taxBand
  );
  const giftAidEligibilityInformation = {
    convertedPensionContribution: convertedPensionContribution,
    incomeTaxTable: incomeTaxTable,
    incomeTaxAmount: incomeTaxAmount,
    taxBand: taxBand,
    pensionTaxReliefAmount: pensionTaxReliefAmount,
    convertedIncomeTaxAmount: convertedIncomeTaxAmount,
    convertedPensionTaxReliefAmount: convertedPensionTaxReliefAmount,
    totalTaxPaid: totalTaxPaid,
    giftAidToClaim: giftAidToClaim,
    canClaimGiftAid: canClaimGiftAid,
    giftAidTaxRelief: giftAidTaxRelief,
    giftAidDonationCap: giftAidDonationCap,
    informationRetrieved: true,
    timeInterval: selectedDonationInterval,
  };

  // console.log(incomeTaxTable);
  // console.log(taxBand);
  console.log("Income Tax: " + incomeTaxAmount);
  console.log("Pension Tax Relief: " + pensionTaxReliefAmount);
  console.log("Total Tax Paid: " + totalTaxPaid);
  console.log("Gift Aid Claimed: " + giftAidToClaim);
  console.log("Gift Aid Tax Relief: " + giftAidTaxRelief);
  console.log("Gift Aid Donation Cap: " + giftAidDonationCap);
  if (canClaimGiftAid) console.log("Can Claim Gift Aid");
  else console.log("CANNOT claim Gift Aid");

  return giftAidEligibilityInformation;
};

const convertToFixedAmount = (inputAmount, format, grossIncome) => {
  inputAmount =
    format === "fixed amount" ? inputAmount : (inputAmount * grossIncome) / 100;

  return inputAmount;
};

const createIncomeTaxTable = (grossIncome, livesInScotland) => {
  let taxBands = getTaxBands(grossIncome, livesInScotland);
  const incomeTaxTable = calculateIncomeTaxInEachBand(taxBands, grossIncome);
  return incomeTaxTable;
};

const getTaxBands = (grossIncome, livesInScotland) => {
  const personalAllowance = getPersonalAllowance(grossIncome);
  if (livesInScotland) {
    let taxBands = [
      {
        name: "personalAllowance",
        lowerLimit: 0,
        upperLimit: personalAllowance,
        taxRate: 0,
      },
      {
        name: "starterRate",
        lowerLimit: personalAllowance,
        upperLimit: 2306 + personalAllowance,
        taxRate: 19,
      },
      {
        name: "basicRate",
        lowerLimit: 2306 + personalAllowance,
        upperLimit: 13991 + personalAllowance,
        taxRate: 20,
      },
      {
        name: "intermidiateRate",
        lowerLimit: 13991 + personalAllowance,
        upperLimit: 31092 + personalAllowance,
        taxRate: 21,
      },
      {
        name: "higherRate",
        lowerLimit: 31092 + personalAllowance,
        upperLimit: 62430 + personalAllowance,
        taxRate: 42,
      },
      {
        name: "advancedRate",
        lowerLimit: 62430 + personalAllowance,
        upperLimit: 125140,
        taxRate: 45,
      },
      { name: "additionalRate", lowerLimit: 125140, taxRate: 48 },
    ];
    return taxBands;
  } else {
    let taxBands = [
      {
        name: "personalAllowance",
        lowerLimit: 0,
        upperLimit: personalAllowance,
        taxRate: 0,
      },
      {
        name: "basicRate",
        lowerLimit: personalAllowance,
        upperLimit: 37700 + personalAllowance,
        taxRate: 20,
      },
      {
        name: "higherRate",
        lowerLimit: 37700 + personalAllowance,
        upperLimit: 125140,
        taxRate: 40,
      },
      { name: "additionalRate", lowerLimit: 125140, taxRate: 45 },
    ];
    return taxBands;
  }
};

const calculateIncomeTax = (incomeTaxTable) => {
  const incomeTaxAmount = incomeTaxTable.reduce(
    (incomeTaxAmount, taxBand) => incomeTaxAmount + taxBand.taxAmount,
    0
  );

  return incomeTaxAmount;
};

const getPersonalAllowance = (grossIncome) => {
  const personalAllowance =
    grossIncome < 100000
      ? 12570
      : 12570 - Math.min(12570, (grossIncome - 100000) * 2);
  // console.log(personalAllowance);
  return personalAllowance;
};

const calculateIncomeTaxInEachBand = (taxBands, grossIncome) => {
  taxBands.forEach((taxBand) => {
    let upperLimit = taxBand.upperLimit;
    let lowerLimit = taxBand.lowerLimit;

    taxBand.incomeInBand =
      upperLimit != null
        ? Math.min(
            Math.max(grossIncome - lowerLimit, 0),
            upperLimit - lowerLimit
          )
        : Math.max(grossIncome - lowerLimit, 0);

    // console.log(taxBand.incomeInBand);

    taxBand.taxAmount = (taxBand.incomeInBand * taxBand.taxRate) / 100;
  });

  return taxBands;
};

const calculatePensionTaxRelief = (
  pensionContribution,
  claimsAdditionalPensionTaxRelief,
  taxBand
) => {
  const taxReliefPercentage = getPensionTaxReliefPercentage(
    taxBand,
    claimsAdditionalPensionTaxRelief
  );
  const pensionTaxRelief = pensionContribution * taxReliefPercentage;
  return pensionTaxRelief;
};

const getPensionTaxReliefPercentage = (
  taxBand,
  claimsAdditionalPensionTaxRelief
) => {
  if (claimsAdditionalPensionTaxRelief && taxBand.taxRate > 20) {
    // If Basic Rate pays 80 -> They get 20 in relief
    // If Higher Rate pays 60 -> They get 40 in relief
    // If Additional Rate pays 55 -> They get 45 in relief

    const reliefPercentage = taxBand.taxRate / (100 - taxBand.taxRate);

    return reliefPercentage;
  } else {
    const reliefPercentage = 20 / (100 - 20);
    return reliefPercentage;
  }
};

const getTaxPayersTaxBand = (incomeTaxTable) => {
  return incomeTaxTable
    .filter((taxBand) => {
      return taxBand.incomeInBand !== 0;
    })
    .slice(-1)[0];
};

const convertToDonationTimeScale = (
  inputAmount,
  interval,
  donationInterval
) => {
  if (interval === donationInterval) {
    return inputAmount;
  }
  if (interval === "Year" && donationInterval === "Month") {
    return inputAmount / 12;
  }
  if (interval === "Month" && donationInterval === "Year") {
    return inputAmount * 12;
  }

  return inputAmount;
};

const calculateTotalTaxPaid = (incomeTaxAmount, pensionTaxReliefAmount) => {
  const totalTaxPaid = Math.max(incomeTaxAmount - pensionTaxReliefAmount, 0);
  return totalTaxPaid;
};

const calculateGiftAidToClaim = (donationAmount) => {
  const giftAidToClaim = donationAmount * 0.25;

  return giftAidToClaim;
};

const determineIfCanClaimGiftAid = (
  giftAidToClaim,
  giftAidTaxRelief,
  totalTaxPaid
) => {
  const canClaimGiftAid = giftAidToClaim <= totalTaxPaid - giftAidTaxRelief;
  return canClaimGiftAid;
};

const calculateGiftAidTaxRelief = (
  claimsAdditionalGiftAidTaxRelief,
  donationAmount,
  taxBand
) => {
  if (claimsAdditionalGiftAidTaxRelief && taxBand.taxRate > 20) {
    // Donation * Gift Aid Claim Percentage Increase * Tax Relief Percentage

    const taxRelief = (donationAmount * 1.25 * (taxBand.taxRate - 20)) / 100;
    return taxRelief;
  } else {
    const taxRelief = 0;
    return taxRelief;
  }
};

const calculateGiftAidDonationCap = (
  claimsAdditionalGiftAidTaxRelief,
  totalTaxPaid,
  taxBand
) => {
  // console.log(taxBand.taxRate > 20);

  if (claimsAdditionalGiftAidTaxRelief && taxBand.taxRate > 20) {
    // Reverse the gift Aid claim and Tax Relief functions
    const giftAidDonationCap =
      totalTaxPaid / (0.25 + (1.25 * (taxBand.taxRate - 20)) / 100);
    return giftAidDonationCap;
  } else {
    const giftAidDonationCap = totalTaxPaid * 4;
    return giftAidDonationCap;
  }
};
export { getGiftAidEligibilityInformation };
