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
        <div className="coming-soon h1">Cooming Soon</div>

        {/* <main>
          <div className="summary-info-container">
            <div className="info-page-title">What Is Gift Aid?</div>
            <div className="title2">
              Gift Aid is a UK government scheme that allows charities to
              reclaim the basic rate of tax on donations made by taxpayers,
              increasing the value of the donation at no extra cost to the
              donor.
            </div>
          </div>
          <div className="blue-stripe">
            <div className="how-does-gift-aid-work-section">
              <div className="donation-icon-container">
                <img src={donationIcon} alt="Donation Icon" />
              </div>
              <div className="how-does-gift-aid-work-summary-container">
                <div className="h1 bold">How Does Gift Aid work?</div>
                <div className="title2">
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

          <div className="assumptions-section">
            <div className="assumptions-summary-container">
              <div className="h1 bold">
                Some Assumptions Made When Determining Gift Aid Eligibility...
              </div>
              <div className="title2">
                For simplicity the following was not considered when determining
                gift aid eligibility:
                <ul>
                  <li>Capital gains or dividends tax Tax relief</li>
                  <li>for job expenses Tax relief that landlords can claim</li>
                  <li>
                    Tax relief when paying back certain types of loans
                  </li>{" "}
                  <li> Tax relief for married couples and parents</li>
                </ul>
                <br />
                These were not considered as they either apply to a small
                minority of tax payers or have little effect on the amount you
                can donate and claim gift aid.
              </div>
            </div>
            <div className="assumption-icon-container">
              <img
                src={assumptionIcon}
                className="assumption-icon"
                alt="Assumption Icon"
              />
            </div>
          </div>

          <div className="qna-section">
            <div className="h1 bold">Frequently Asked Question</div>
            <hr />

            <div className="questions-container">
              <Question
                question="Is Gift Aid only applicable to cash donations?"
                answer="No, Gift Aid can be claimed on various types of donations, including
          those made by debit or credit card, standing order, cheque, or through
          a fundraising event."
              />
            </div>
          </div>
        </main> */}
        {/* <Footer /> */}
      </ScreenTypeContextProvider>
    </>
  );
};
export { InfoPage };
