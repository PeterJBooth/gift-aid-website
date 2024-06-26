const basicPersonalAllowance = 12570;

const getGiftAidEligibilityInformation = (
  grossIncome,
  donationAmount,
  livesInScotland,
  pensionContribution,
  claimsAdditionalGiftAidTaxRelief,
  claimsAdditionalPensionTaxRelief,
  selectedDonationInterval,
  pensionFormat,
) => {
  const incomeTaxTable = createIncomeTaxTable(grossIncome, livesInScotland);
  let incomeTaxAmount = calculateIncomeTax(incomeTaxTable);

  const taxBand = getTaxPayersTaxBand(incomeTaxTable);

  const yearlyPensionContribution = convertToFixedYearlyAmount(
    pensionContribution,
    pensionFormat,
    grossIncome,
  );
  const pensionTaxReliefAmount = calculatePensionTaxRelief(
    yearlyPensionContribution,
    claimsAdditionalPensionTaxRelief,
    taxBand,
  );

  const totalTaxPaid = calculateTotalTaxPaid(
    incomeTaxAmount,
    pensionTaxReliefAmount,
  );

  const giftAidToClaim = calculateGiftAidToClaim(donationAmount);
  const giftAidTaxRelief = calculateGiftAidTaxRelief(
    claimsAdditionalGiftAidTaxRelief,
    donationAmount,
    taxBand,
  );

  const canClaimGiftAid = determineIfCanClaimGiftAid(
    giftAidToClaim,
    giftAidTaxRelief,
    totalTaxPaid,
    selectedDonationInterval,
  );

  const giftAidDonationCap = calculateGiftAidDonationCap(
    claimsAdditionalGiftAidTaxRelief,
    totalTaxPaid,
    taxBand,
    selectedDonationInterval,
  );

  const giftAidEligibilityInformation = {
    grossIncome: grossIncome,
    pensionContribution: pensionContribution,
    claimsAdditionalGiftAidTaxRelief: claimsAdditionalGiftAidTaxRelief,
    claimsAdditionalPensionTaxRelief: claimsAdditionalPensionTaxRelief,
    pensionFormat: pensionFormat,
    incomeTaxTable: incomeTaxTable,
    incomeTaxAmount: incomeTaxAmount,
    taxBand: taxBand,
    pensionTaxReliefAmount: pensionTaxReliefAmount,
    totalTaxPaid: totalTaxPaid,
    donationAmount: donationAmount,
    giftAidToClaim: giftAidToClaim,
    canClaimGiftAid: canClaimGiftAid,
    giftAidTaxRelief: giftAidTaxRelief,
    giftAidDonationCap: giftAidDonationCap,
    informationRetrieved: true,
    selectedDonationInterval: selectedDonationInterval,
    yearlyPensionContribution: yearlyPensionContribution,
  };
  // console.log(giftAidEligibilityInformation);
  return giftAidEligibilityInformation;
};

const convertToFixedYearlyAmount = (inputAmount, format, grossIncome) => {
  inputAmount =
    format === "fixed amount"
      ? inputAmount * 12 // monthly -> yearly
      : (inputAmount * grossIncome) / 100; // percentage -> yearly amount

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
        displayName: "Personal Allowance",
        lowerLimit: 0,
        upperLimit: personalAllowance,
        taxRate: 0,
      },
      {
        name: "starterRate",
        displayName: "Starter Rate",

        lowerLimit: personalAllowance,
        upperLimit: 2306 + personalAllowance,
        taxRate: 19,
      },
      {
        name: "basicRate",
        displayName: "Basic Rate",

        lowerLimit: 2306 + personalAllowance,
        upperLimit: 13991 + personalAllowance,
        taxRate: 20,
      },
      {
        name: "intermediateRate",
        displayName: "Intermediate Rate",

        lowerLimit: 13991 + personalAllowance,
        upperLimit: 31092 + personalAllowance,
        taxRate: 21,
      },
      {
        name: "higherRate",
        displayName: "Higher Rate",

        lowerLimit: 31092 + personalAllowance,
        upperLimit: 62430 + personalAllowance,
        taxRate: 42,
      },
      {
        name: "advancedRate",
        displayName: "Advanced Rate",

        lowerLimit: 62430 + personalAllowance,
        upperLimit: 125140,
        taxRate: 45,
      },
      {
        name: "additionalRate",
        displayName: "Additional Rate",
        lowerLimit: 125140,
        taxRate: 48,
      },
    ];
    return taxBands;
  } else {
    let taxBands = [
      {
        name: "personalAllowance",
        displayName: "Personal Allowance",
        lowerLimit: 0,
        upperLimit: personalAllowance,
        taxRate: 0,
      },
      {
        name: "basicRate",
        displayName: "Basic Rate",

        lowerLimit: personalAllowance,
        upperLimit: 37700 + personalAllowance,
        taxRate: 20,
      },
      {
        name: "higherRate",
        displayName: "Higher Rate",

        lowerLimit: 37700 + personalAllowance,
        upperLimit: 125140,
        taxRate: 40,
      },
      {
        name: "additionalRate",
        displayName: "Additional Rate",
        lowerLimit: 125140,
        taxRate: 45,
      },
    ];
    return taxBands;
  }
};

const calculateIncomeTax = (incomeTaxTable) => {
  const incomeTaxAmount = incomeTaxTable.reduce(
    (incomeTaxAmount, taxBand) => incomeTaxAmount + taxBand.taxAmount,
    0,
  );

  return incomeTaxAmount;
};

const getPersonalAllowance = (grossIncome) => {
  if (grossIncome < 100000) {
    return basicPersonalAllowance;
  }

  const personalAllowance =
    basicPersonalAllowance -
    Math.min(basicPersonalAllowance, (grossIncome - 100000) / 2);

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
            upperLimit - lowerLimit,
          )
        : Math.max(grossIncome - lowerLimit, 0);

    taxBand.taxAmount = (taxBand.incomeInBand * taxBand.taxRate) / 100;
  });

  return taxBands;
};

const calculatePensionTaxRelief = (
  pensionContribution,
  claimsAdditionalPensionTaxRelief,
  taxBand,
) => {
  const taxReliefPercentage = getPensionTaxReliefPercentage(
    taxBand,
    claimsAdditionalPensionTaxRelief,
  );
  const pensionTaxRelief = pensionContribution * taxReliefPercentage;
  return pensionTaxRelief;
};

const getPensionTaxReliefPercentage = (
  taxBand,
  claimsAdditionalPensionTaxRelief,
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

const calculateTotalTaxPaid = (incomeTaxAmount, pensionTaxReliefAmount) => {
  const totalTaxPaid = Math.max(incomeTaxAmount - pensionTaxReliefAmount, 0);
  return totalTaxPaid;
};

const calculateGiftAidToClaim = (donationAmount) => {
  const giftAidToClaim = donationAmount * 0.25;

  return giftAidToClaim;
};

const calculateGiftAidTaxRelief = (
  claimsAdditionalGiftAidTaxRelief,
  donationAmount,
  taxBand,
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

const determineIfCanClaimGiftAid = (
  giftAidToClaim,
  giftAidTaxRelief,
  totalTaxPaid,
  selectedDonationInterval,
) => {
  totalTaxPaid = totalTaxPaid / (selectedDonationInterval === "Year" ? 1 : 12);
  const canClaimGiftAid = giftAidToClaim <= totalTaxPaid - giftAidTaxRelief;
  return canClaimGiftAid;
};

const calculateGiftAidDonationCap = (
  claimsAdditionalGiftAidTaxRelief,
  totalTaxPaid,
  taxBand,
  selectedDonationInterval,
) => {
  totalTaxPaid = totalTaxPaid / (selectedDonationInterval === "Year" ? 1 : 12);

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

export { getGiftAidEligibilityInformation, basicPersonalAllowance };
