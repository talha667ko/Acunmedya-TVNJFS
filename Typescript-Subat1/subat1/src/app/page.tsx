"use client";
import styles from "./page.module.css";
import StyledComponents from "./components/styled-components";
import { useState } from "react";

export default function Home() {

  const [userData, setUserData] = useState(null);
  
  const fetchData = async () => {
  try{
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const data = await response.json(); 
      setUserData(data);
    }catch (error) {
    alert(error);
    console.error("Error fetching data: ", error);
  }
}


  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Fetch data fromJSON</h1>
      <button className={styles.fetching} onClick={fetchData}>Fetch</button>
      <div>
        {userData && <StyledComponents user={userData} />}
      </div>
    </div>
  );
}
