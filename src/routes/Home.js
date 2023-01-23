import React, { useState, useEffect } from "react";
import {
  collection,
  getFirestore,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { app } from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  // console.log(userObj);
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

  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((nweet) => {
          return (
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Home;
