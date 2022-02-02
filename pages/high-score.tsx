import React from "react";
import type { NextPage } from "next";
import AppBar from "../components/AppBar";
import styles from "../styles/Home.module.css";
import { getHighScores } from "../utils/highScore";

const HighScore: NextPage = () => {
  const [scores, setScores] = React.useState<any[]>([]);
  const getScores = React.useCallback(async () => {
    const result = await getHighScores();
    setScores(result);
  }, []);

  React.useEffect(() => {
    getScores();
  }, [getScores]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <AppBar />
        <div className="container-fluid w-full flex flex-wrap items-center justify-center px-6 rounded-md">
          <div className="container-fluid m-10 flex flex-wrap items-center justify-center mx-auto">
            <div className="container-fluid mx-auto flex flex-wrap items-center justify-center w-full rounded-lg border-2">
              <table className="table-fixed w-full p-10">
                <thead>
                  <tr className="items-center justify-center">
                    <th className="text-red-500">Rank</th>
                    <th className="text-red-500">Username</th>
                    <th className="text-red-500">Cash</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score, index) => (
                    <tr key={index} className="text-center">
                      <td>{index + 1}</td>
                      <td>{score.name}</td>
                      <td>$ {score.cash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HighScore;
