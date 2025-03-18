import { LotteryView } from "../../views/LotteryView.jsx";
import Header from "../../components/header/header.jsx";
import MainContent from "../../components/mainContent/mainContent.jsx";

import "./style.css"; 

export function Home() {
  return (
    <main>
      <Header />
      <div className="content-row">
        <div className="content-one">
        < MainContent />
        </div>
        <div className="content-two">
        <LotteryView />
        </div>
      </div>
    </main>
  );
}
