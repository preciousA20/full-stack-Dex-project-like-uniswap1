
import Header from "../components/Header.js";
import Main from "../components/Main.js";
import TransactionHistory from "../components/TransactionHistory.js";


export default function Home() {
  const style = {
     wrapper: ` bg-[#20242F] text-white flex flex-col justify-between`
  }
  return (
    <main className={style.wrapper}>
     
    <Header />
    
    <Main />

    <TransactionHistory />
    </main>
  );
}
