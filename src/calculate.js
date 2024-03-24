// Legibility
// support
const calculateGiftAidEligibility = (
  grossIncome,
  donationAmount,
  livesInScotland,
  pensionAmount,
  claimsAdditionalPensionTaxRelief,
  claimsAdditionalGiftAidTaxRelief
) => {
  // Cost units are in £

  // const grossIncome = 53000;
  // const livesInScotland = false;

  // const donationAmount = 10000;

  const incomeTaxTable = createIncomeTaxTable(grossIncome, livesInScotland);
  const incomeTaxAmount = calculateIncomeTax(incomeTaxTable);

  const pensionTaxReliefAmount = calculatePensionTaxRelief(
    pensionAmount,
    claimsAdditionalPensionTaxRelief,
    incomeTaxTable
  );

  const totalTaxPaid = calculateTotalTaxPaid(
    incomeTaxAmount,
    pensionTaxReliefAmount
  );

  const giftAidClaimed = donationAmount * 0.25;

  const giftAidDonationCap = totalTaxPaid * 4;
  const donationCap = calculateDonationCap(
    totalTaxPaid,
    claimsAdditionalGiftAidTaxRelief
  );

  console.log("Income Tax: " + incomeTaxAmount);
  console.log("Pension Tax Relief: " + pensionTaxReliefAmount);
  console.log("Total Tax Paid: " + totalTaxPaid);
  console.log("Gift Aid Claimed: " + giftAidClaimed);
  console.log();
  console.log("Gift Aid Donation Cap: " + donationCap);

  //   const giftAidTaxReliefAmount =
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
        upperLimit: 2162 + personalAllowance,
        taxRate: 19,
      },
      {
        name: "basicRate",
        lowerLimit: 2162 + personalAllowance,
        upperLimit: 13118 + personalAllowance,
        taxRate: 20,
      },
      {
        name: "intermidiateRate",
        lowerLimit: 13118 + personalAllowance,
        upperLimit: 31092 + personalAllowance,
        taxRate: 21,
      },
      {
        name: "higherRate",
        lowerLimit: 31092 + personalAllowance,
        upperLimit: 125140,
        taxRate: 42,
      },
      { name: "additionalRate", lowerLimit: 125140, taxRate: 47 },
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
  console.log(personalAllowance);
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

    taxBand.taxAmount = (taxBand.incomeInBand * taxBand.taxRate) / 100;
  });

  return taxBands;
};

const calculatePensionTaxRelief = (
  pensionAmount,
  claimsAdditionalPensionTaxRelief,
  incomeTaxTable
) => {
  const taxReliefPercentage = getPensionTaxReliefPercentage(
    incomeTaxTable,
    claimsAdditionalPensionTaxRelief
  );
  const pensionTaxRelief = pensionAmount * taxReliefPercentage;
  return pensionTaxRelief;
};

const getPensionTaxReliefPercentage = (
  incomeTaxTable,
  claimsAdditionalPensionTaxRelief
) => {
  if (claimsAdditionalPensionTaxRelief) {
    const currentTaxBand = incomeTaxTable
      .filter((taxBand) => {
        return taxBand.incomeInBand !== 0;
      })
      .slice(-1)[0];

    const reliefPercentage =
      currentTaxBand.taxRate / (100 - currentTaxBand.taxRate);

    return reliefPercentage;
  } else {
    const reliefPercentage = 20 / (100 - 20);
    return reliefPercentage;
  }
};

const calculateTotalTaxPaid = (incomeTaxAmount, pensionTaxReliefAmount) => {
  const totalTaxPaid = incomeTaxAmount - pensionTaxReliefAmount;
  return totalTaxPaid;
};

const calculateDonationCap = (
  totalTaxPaid,
  claimsAdditionalGiftAidTaxRelief
) => {
  if (claimsAdditionalGiftAidTaxRelief) {
    return 123;
  } else {
    return totalTaxPaid * 4;
  }
};
export { calculateGiftAidEligibility };
