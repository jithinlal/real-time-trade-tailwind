import { firestore } from "./firebase";

const addHighScore = async (name: string, cash: number, ip: string) => {
  const highScore = await firestore.collection("highscore").doc(ip).get();
  const highScoreData = highScore.data();

  if (highScoreData) {
    if (highScoreData.cash < cash) {
      return await firestore.collection("highscore").doc(ip).set({
        cash,
        name,
      });
    } else {
      return;
    }
  }
  return await firestore.collection("highscore").doc(ip).set({
    cash,
    name,
  });
};

const getHighScores = async () => {
  const highScores = await firestore
    .collection("highscore")
    .orderBy("cash", "desc")
    .limit(10)
    .get();
  return highScores.docs.map((doc) => doc.data());
};

export { addHighScore, getHighScores };
