import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { app } from "fbase";

const Home = ({ userObj }) => {
  // console.log(userObj);
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  // const getNweets = async () => {
  //   const db = getFirestore(app);
  //   const dbNweets = await getDocs(collection(db, "nweets"));
  //   dbNweets.forEach((doc) => {
  //     const nweetsObject = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setNweets((prev) => [nweetsObject, ...prev]);
  //   });
  // };
  useEffect(() => {
    // getNweets();
    const db = getFirestore(app);
    const q = query(collection(db, "nweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const nweetArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    console.log("Document written with ID: ", docRef.id);
    setNweet("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => {
          return (
            <div key={nweet.id}>
              <h4>{nweet.text}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
