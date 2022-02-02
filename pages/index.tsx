import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import AppBar from "../components/AppBar";

const Home: NextPage = () => {
  const [name, setName] = React.useState("");
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <AppBar />
        <div className="container-fluid w-full flex flex-wrap items-center justify-center px-6 rounded-md">
          <div className="container-fluid m-10 mx-auto">
            <div className="container-fluid mx-auto">
              <div className="flex items-center justify-center flex-col border-4 rounded-lg">
                <div className="flex items-center justify-center flex-col p-20">
                  <div>
                    <input
                      className="rounded-xl h-10 bg-gray-100 p-2 text-center outline-none"
                      placeholder="Username"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div className="pt-3">
                    <Link
                      href={
                        name !== ""
                          ? { pathname: "/trade", query: { name } }
                          : { pathname: "/" }
                      }
                    >
                      <a className="rounded-xl bg-gray-100 px-5 py-2 bg-green-200 text-center w-full">
                        Start
                      </a>
                    </Link>
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

export default Home;
