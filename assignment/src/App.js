import './App.css';
import { useState,useEffect } from 'react';
import { Image } from '@chakra-ui/react';
import Membership from './Components/Membership';
import Badges from './Components/Badges';
import PointHistory from './Components/PointHistory';

const App=()=> {
  const [image, SetImage] = useState("")
  const [rank, SetRank] = useState()
  const [level, SetLevel] = useState([])
  const [loading, setLoading] = useState(null)

  const utility = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'apikey': 'k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be',
      'userid': 'u-a2399489-9cd0-4c94-ad12-568379202b08',
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWEyMzk5NDg5LTljZDAtNGM5NC1hZDEyLTU2ODM3OTIwMmIwOCIsImlhdCI6MTcwNzk4NzYyOSwiZXhwIjoxNzA4NTkyNDI5fQ.fESDqKunAqLUgHBCUsNYpGcNrTeVEty91HqGebX59Uc'
    }
  };

  async function fetchDataFromAPI(url) {
    try {
      const response = await fetch(url, utility);
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const profile = await fetchDataFromAPI('https://staging.questprotocol.xyz/api/users/u-a2399489-9cd0-4c94-ad12-568379202b08');
      SetImage(profile?.data);

      const rankData = await fetchDataFromAPI('https://staging.questprotocol.xyz/api/entities/e-0000000000/users/u-a2399489-9cd0-4c94-ad12-568379202b08/xp-leaderboard-rank');
      SetRank(rankData?.data.position);

      const plData = await fetchDataFromAPI('https://staging.questprotocol.xyz/api/entities/e-0000000000/users/u-a2399489-9cd0-4c94-ad12-568379202b08/xp');
      SetLevel(plData);
    };
    fetchUserData();
  }, []);

  return (
    <div className="App">
      <div style={{
        fontSize: '20px',
        fontWeight: 700,
        fontFamily: 'inherit',
        color: 'white'
      }}>
        <h2>Profile</h2>
      </div>


      <div style={{ display: "flex", flexDirection: "column", margin: "auto", alignItems: "center", marginTop: "65px", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", width: "90%", background: "white", height: "700px", borderRadius: "12px" }}>
        <Image
          src={image?.imageUrl}
          alt={image?.name}
          style={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
            marginTop: "-50px",
            borderRadius: "50%",
            boxSize: '150px',
            border: "3px solid white",
            width: "87px",
            height: "86px"
          }}

        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div>
            <h3 style={{
              fontWeight: 600,
              fontSize: 'x-large',
              fontFamily: 'sans-serif'
            }}>{image?.name}</h3>
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "22px", background: "white" }}>
            <div style={{ padding: "12px 25px", boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px", background: "#6853f2", borderRadius: "12px", color: "white" }}>
              <h5 style={{ fontWeight: "600", fontFamily: "system-ui", fontSize: "larger" }}>{level.xpThreshold}</h5>
              <p>Points</p>
            </div>
            <div style={{ padding: "12px 25px", boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px", background: "#6853f2", borderRadius: "12px", color: "white" }}>
              <h5 style={{ fontWeight: "600", fontFamily: "system-ui", fontSize: "larger" }}>#{rank}</h5>
              <p>Rank</p>
            </div>
            <div style={{ padding: "12px 25px", boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px", background: "#6853f2", borderRadius: "12px", color: "white" }}>
              <h5 style={{ fontWeight: "600", fontFamily: "system-ui", fontSize: "larger" }}>{level.tier}</h5>
              <p>Level</p>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "50px", paddingTop: "22px", background: "white" }}>
          <div style={{ background: "white", color: "#a6a0a0", fontWeight: "600" }}>
            <button onClick={() => setLoading("Membership")}>
              Membership
              </button>
          </div>
          <div style={{ background: "white", color: "#a6a0a0", fontWeight: "600" }} >
            <button onClick={() => setLoading("Badges")}>
              Badges
            </button>
          </div>
          <div style={{ background: "white", color: "#a6a0a0", fontWeight: "600" }}>
            <button onClick={() => setLoading("PointHistory")}>
              Point History
            </button>
          </div>
        </div>
        <div>
            {loading === "Membership" && <Membership />}
            {loading === "Badges" && <Badges />}
            {loading === "PointHistory" && <PointHistory />}
        </div>
      </div>
    </div>
  );
}

export default App;
