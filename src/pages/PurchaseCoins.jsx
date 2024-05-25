import { Link } from "react-router-dom";

const PurchaseCoins = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div>
        <Link to="/payment" state={{ dollarAmount: 1 }}>
          Buy 100 Coins by 1 dollar
        </Link>
      </div>
      <div>
        <Link to="/payment" state={{ dollarAmount: 5 }}>
          Buy 500 Coins by 5 dollar
        </Link>
      </div>
      <div>
        <Link to="/payment" state={{ dollarAmount: 10 }}>
          Buy 1000 Coins by 10 dollar
        </Link>
      </div>
    </div>
  );
};

export default PurchaseCoins;
