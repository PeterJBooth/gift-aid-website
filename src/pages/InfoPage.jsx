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
          <div className="m-auto max-w-10xl px-custom ">
            <div className=" mt-24 flex w-[30rem] flex-col gap-6">
              <div className="text-[55px] font-black tracking-[-1.1px]">
                What Is Gift Aid?
              </div>
              <div className="leading-6">
                Gift Aid is a UK government scheme that allows charities to
                reclaim the basic rate of tax on donations made by taxpayers,
                increasing the value of the donation at no extra cost to the
                donor.
              </div>
            </div>
          </div>
          <div className="mt-32 flex min-h-[22rem] items-center justify-center bg-blue-50">
            <div className="flex w-full items-center justify-center">
              <div className=" flex w-1/2 items-center justify-center pr-8">
                <img src={donationIcon} alt="Donation Icon" />
              </div>
              <div className="flex w-1/2 flex-col gap-6 py-12 pr-8">
                <div className="text-3xl font-bold">
                  How Does Gift Aid work?
                </div>
                <div className="leading-6">
                  When a taxpayer makes a donation, the charity can reclaim 25p
                  every time £1 is donated, boosting the donation by 25%.
                  <br />
                  <br />
                  Gift Aid can be claimed by individuals who are taxpayers in
                  the UK and have paid enough income or capital gains tax to
                  cover the amount reclaimed by the charity as well any forms
                  tax of relief you’ve received. In summary, the charity can
                  only reclaim tax money which you have paid.
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-32 flex max-w-10xl items-center justify-center px-custom">
            <div className="flex w-2/3 flex-col gap-6">
              <div className="text-3xl font-bold">
                Some Assumptions Made When Determining Gift Aid Eligibility...
              </div>
              <div className="leading-6">
                For simplicity the following was not considered when determining
                gift aid eligibility:
                <ul className="list-inside">
                  <li>Capital gains or dividends tax Tax relief</li>
                  <li>for job expenses Tax relief that landlords can claim</li>
                  <li>Tax relief when paying back certain types of loans</li>
                  <li> Tax relief for married couples and parents</li>
                </ul>
                <br />
                These were not considered as they either apply to a small
                minority of tax payers or have little effect on the amount you
                can donate and claim gift aid.
              </div>
            </div>
            <div className="flex h-full w-1/3 items-center justify-center">
              <img
                src={assumptionIcon}
                className="w-56"
                alt="Assumption Icon"
              />
            </div>
          </div>

          <div className=" mx-auto  mt-32 flex w-[35rem] flex-col items-center justify-center gap-12">
            <div className="text-3xl font-bold">Frequently Asked Question</div>
            <hr className="h-px w-full border-none bg-neutral-200" />

            <div className="questions-container flex w-full flex-col gap-12 ">
              <Question
                question="Is Gift Aid only applicable to cash donations?"
                answer="No, Gift Aid can be claimed on various types of donations, including
          those made by debit or credit card, standing order, cheque, or through
          a fundraising event."
              />
            </div>
          </div>
        </main>
        <Footer />
      </ScreenTypeContextProvider>
    </>
  );
};
export { InfoPage };
