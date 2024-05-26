import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ScreenTypeContextProvider } from "../context/ScreenTypeContext";
import donationIcon from "../assets/info-page/donation-icon.svg";
import assumptionIcon from "../assets/info-page/assumption.png";
import { Question } from "../components/Question";

const InfoPage = () => {
  return (
    <>
      <ScreenTypeContextProvider>
        <Header giftAidButtonActive={false} />
        <main>
          <div className="m-auto mt-40 max-w-10xl px-custom">
            <div className=" flex max-w-[30rem] flex-col gap-6">
              <div className="text-[40px] font-black tracking-[-1.1px] largePhone:text-[55px]">
                What Is Gift Aid?
              </div>
              <div className="leading-7">
                Gift Aid is a UK government scheme that allows charities to
                reclaim the basic rate of tax on donations made by taxpayers,
                increasing the value of the donation at no extra cost to the
                donor.
              </div>
            </div>
          </div>
          <div className="mt-40  flex min-h-[22rem] items-center justify-center bg-blue-50 px-custom  desktop:px-12">
            <div className="flex w-full flex-col items-center justify-center desktop:flex-row">
              <div className=" flex items-center justify-center pr-8 pt-8 desktop:w-1/2 desktop:pt-0">
                <img src={donationIcon} alt="Donation Icon" />
              </div>
              <div className="flex flex-col gap-6 py-12 desktop:w-1/2">
                <div className="text-3xl font-bold">
                  How Does Gift Aid work?
                </div>
                <div className="leading-7">
                  When a taxpayer makes a donation, the charity can reclaim 25p
                  for every £1 donated, boosting the donation by 25%.
                  <br />
                  <br />
                  Individuals in the UK who are taxpayers and have paid
                  sufficient income or capital gains tax to cover the amount
                  reclaimed by the charity, as well as any tax relief received,
                  can claim Gift Aid. In short, the charity can only reclaim tax
                  money which you have paid.
                </div>
              </div>
            </div>
          </div>

          <div className=" mx-auto mt-40  grid  max-w-10xl  items-center justify-center gap-12 px-custom desktop:grid-cols-[2fr,1fr]">
            <div className="flex  flex-col gap-6">
              <div className="text-3xl font-bold">
                Some Assumptions Made When Determining Gift Aid Eligibility...
              </div>
              <div className="max-w-[50rem] leading-7">
                For simplicity the following was not considered when determining
                gift aid eligibility:
                <ul className="list-inside list-disc">
                  <li className=" leading-7">
                    Capital gains or dividends tax Tax relief.
                  </li>
                  <li className=" leading-7">
                    Job expenses tax relief that landlords can claim.
                  </li>
                  <li className=" leading-7">
                    Tax relief when paying back certain types of loans.
                  </li>
                  <li className=" leading-7">
                    Tax relief for married couples and parents.
                  </li>
                </ul>
                <br />
                These were not considered as they either apply to a small
                minority of tax payers, or have little effect on the amount you
                can donate and claim gift aid.
              </div>
            </div>
            <div className="hidden items-center justify-center desktop:flex">
              <img
                src={assumptionIcon}
                className=" mb-4 w-64"
                alt="Assumption Icon"
              />
            </div>
          </div>

          <div className=" mx-auto mb-40 mt-52 box-content flex max-w-[35rem] flex-col items-center justify-center gap-12 px-10 largeDesktop:max-w-[45rem]">
            <div className=" text-2xl font-bold  largePhone:text-3xl">
              Frequently Asked Question
            </div>
            <hr className="h-px w-full border-none bg-neutral-200" />

            <div className="flex w-full flex-col gap-12 px-4 largeDesktop:px-16">
              <Question
                question="Is Gift Aid only applicable to cash donations?"
                answer="No, Gift Aid can be claimed on various types of donations, including those made by debit or credit card, standing order, cheque, or through a fundraising event."
                //88
              />
              <Question
                question="What information is required to make a Gift Aid declaration?"
                answer="Donors need to provide their name, address, and confirm that they are a UK taxpayer. The declaration can be verbal or written."
              />
              <Question
                question="How long does a Gift Aid declaration last?"
                answer="Declarations can cover past, present, and future donations, but donors should notify the charity if their circumstances change."
              />{" "}
              <Question
                question="Can Gift Aid be claimed for previous donations?"
                answer="Yes, Gift Aid can be backdated for up to four years if the donor meets the eligibility criteria."
              />{" "}
              <Question
                question="What are the penalties for making a false Gift Aid declaration?"
                answer="If it is discovered that you claimed Gift Aid on donations for which you were not eligible, HMRC may demand repayment of the tax relief received. This means you may have to pay back the additional 25% that was claimed on your donations."
              />{" "}
              <Question
                question="How does Gift Aid impact higher-rate taxpayers?"
                answer="Higher-rate taxpayers can claim additional tax relief on their donations, reducing the amount of tax they pay."
              />{" "}
              <Question
                question="Can Gift Aid be claimed on behalf of someone else?"
                answer="No, the individual making the donation must make the Gift Aid declaration."
              />
              <Question
                question="Are there any restrictions on Gift Aid for certain organizations or activities?"
                answer="An organization must be recognized as a charity or community amateur sports club (CASC) to be eligible for claiming Gift Aid. Also, certain activities, like purchasing items at a charity auction, may not qualify."
              />
              <Question
                question="How can I verify if the charity I'm donating to is eligible for Gift Aid?"
                answer="Check with the charity or look for their Gift Aid registration number. Registered charities are eligible."
              />
            </div>
            <hr className="h-px w-full border-none bg-neutral-200" />
            <div className="text-center leading-7">
              If you still find yourself uncertain about Gift Aid or have
              questions regarding its application to your specific situation, we
              recommend reaching out to the charity you are donating to for
              guidance. Charities often have dedicated teams to assist donors
              with Gift Aid queries.
            </div>
          </div>
        </main>
        <Footer />
      </ScreenTypeContextProvider>
    </>
  );
};
export { InfoPage };
