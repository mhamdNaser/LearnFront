import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useStateContext } from "../contexts/ContextsProvider";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const PaymentPage = () => {
  const { user, setPaymentInfo } = useStateContext();
  const navigated = useNavigate();
  const [paypal, setPaypal] = useState([]);

  useEffect(() => {
    getPaypal()
  }, [setPaypal]);

  const getPaypal = () => {
    axiosClient.get("/paypal").then((response) => {
      setPaypal(response.data.data)
    });
  }

  const createOrder = (data, actions) => {
    let thisvalue = 0 ;
    paypal.map(ele => {
      thisvalue = ele.MonSub;
    })
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: thisvalue,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    let thisvalue = 0 ;
    paypal.map(ele => {
      thisvalue = ele.MonSub;
    })
    return actions.order.capture().then(() => {
      axiosClient
        .post("/UserPayment", { UsePayment_id: user?.id , UsePayment_value: thisvalue })
        .then((data) => {
            setPaymentInfo(data.data.time_expired);
            navigated('/indexexam');
        })
        .catch(() => {
          console.log("error");
        });
    });
  };

  const handleTry = () => {
    axiosClient
      .post("/UserTry", { UsePayment_id: user?.id , UsePayment_value: 0 })
      .then((data) => {
          setPaymentInfo(data.data.time_expired);
          navigated('/indexexam');
      })
      .catch(() => {
        console.log("error");
      });
  }

  return (
    <div className="payment">
      <h2>Payment Page</h2>
      <div className="d-flex">
        <div className="payment-page">
          <div className="payment-content pe-1">
            In order to fully avail oneself of the advantages offered by the
            complete spectrum of our website's features, we recommend initiating
            the payment process at the outset. This will facilitate
            uninterrupted access to examinations, continuous progress tracking
            of results, and the utilization of various additional
            functionalities.
          </div>
          <div>
            {paypal.map((ele, index) => (
              <div key={index}>
                <PayPalScriptProvider options={{ "client-id": ele?.clientId }}>
                  <PayPalButtons
                    style={{
                      color: "blue",
                      shape: "rect",
                      label: "paypal",
                    }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                  />
                </PayPalScriptProvider>
              </div>
            ))}
          </div>
        </div>
        <div className="payment-page">
          <div className="payment-content pe-1">
            You are presented with a unique opportunity to explore the platform
            over a duration of three days. We encourage you to seize this chance
            and engage in the enriching experience of participating in
            examinations.
            <br /><strong>Try For 3 Days</strong>
          </div>
          <div>
            <button className="btn btn-success" onClick={handleTry}>Try</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
