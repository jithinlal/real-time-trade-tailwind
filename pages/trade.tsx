import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Trade.module.css";
import AppBar from "../components/AppBar";
import TradeChart from "../components/TradeChart";
import { addHighScore } from "../utils/highScore";

const Trade: NextPage = () => {
  const router = useRouter();
  const {
    query: { name },
  } = router;
  if (name === "" || !name) {
    // router is only present in client side
    if (typeof window !== "undefined") {
      router.replace("/");
    }
  }
  const [trigger, setTrigger] = React.useState(false);
  const [cash, setCash] = React.useState(100);
  const [shares, setShares] = React.useState(0);
  const [isBuy, setIsBuy] = React.useState(false);
  const [ip, setIp] = React.useState("");

  const handleBuy = (value: number) => {
    setShares(+(cash / value).toFixed(2));
    setCash(0);
    setTrigger(false);
  };

  const handleSell = (value: number) => {
    setCash(+(shares * value).toFixed(2));
    setShares(0);
    setTrigger(false);
  };

  const setHighScore = () => {
    addHighScore(name as string, cash, ip);
  };

  const getIp = React.useCallback(async () => {
    const response = await fetch("https://geolocation-db.com/json/");
    return await response.json();
  }, []);

  // isMounted is used here for preventing memory leak, render only if it's true
  React.useEffect(() => {
    let isMounted = true;
    getIp().then((data) => {
      if (isMounted) {
        setIp(data.IPv4);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [getIp]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <AppBar />
        <div className="container-fluid w-full flex flex-wrap items-center justify-center px-6 rounded-md h-screen">
          <div className="container-fluid w-full m-10 mx-auto h-screen">
            <div className="container-fluid mx-auto h-screen">
              <div className="flex items-center flex-col border-4 rounded-lg w-full h-screen">
                <div className="w-full h-1/2 p-5">
                  <TradeChart
                    handleBuy={handleBuy}
                    handleSell={handleSell}
                    isBuy={isBuy}
                    trigger={trigger}
                    setHighScore={setHighScore}
                  />
                </div>
                <div className="w-full h-1/2 p-5">
                  <div className="">
                    <div className="items-center flex flex-col flex-wrap justify-center">
                      <button
                        className={`rounded-xl bg-gray-100 px-5 py-2 text-center ${
                          isBuy ? "bg-red-300" : "bg-green-300"
                        }`}
                        onClick={() => {
                          setIsBuy((prev) => !prev);
                          setTrigger(true);
                        }}
                      >
                        {isBuy ? "Sell" : "Buy"}
                      </button>
                    </div>
                    <div className="container-fluid flex flex-wrap justify-around w-full items-center border-2 rounded-lg mt-10">
                      <div className="p-10 container-fluid flex w-1/4 flex-wrap justify-around">
                        <span>Amount</span>
                        <span className="lg:visible md:visible invisible">
                          :
                        </span>
                        <span className="font-bold">$ {cash}</span>
                      </div>
                      <div className="p-10 container-fluid flex w-1/4 flex-wrap justify-around">
                        <span>Share</span>
                        <span className="lg:visible md:visible invisible">
                          :
                        </span>
                        <span className="font-bold">{shares}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Trade;
