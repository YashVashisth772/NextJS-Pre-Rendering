import { useState, useEffect } from "react";

export default function LastSales(props) {
  const [sales, setSales] = useState(props.sales);
  const [isLoading, setIsLoading] = useState(false);
    console.log('props,',props);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://nextjs-8826c-default-rtdb.firebaseio.com/sales.json")
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        console.log("data", data);
        const newSales = [];
        for (const key in data) {
          newSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(newSales);
      });
  }, []);
  if (!sales) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ul>
        {sales.map((sale) => {
          return (
            <li key={sale.id}>
              {sale.username}- - ${sale.volume}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-8826c-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();
  const newSales = [];

  for (const key in data) {
    newSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return{ props: {sales: newSales }};
}
