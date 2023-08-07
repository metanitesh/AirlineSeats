import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import { sql } from "@vercel/postgres";

const inter = Inter({ subsets: ["latin"] });
async function getFlights() {
  const { rows: flightrows } = await sql`SELECT * FROM flights`;
  const { rows: seatrows } = await sql`SELECT * FROM seats`;
  const { rows: flightSeats } =
    await sql`SELECT flights.flight_id, flights.flight_name, seats.id, seats.name
  FROM flights
  JOIN seats ON flights.flight_id = seats.flight_id;`;
  
  return flightSeats;
}

export default async function Home() {
  const flightSeats = await getFlights();
  console.log("flight seats", flightSeats);
  return (
    <main className={styles.main}>
      <h3>{flightSeats[0].flight_name}</h3>
      {flightSeats.map((flight) => (
        <div key={flight.id}>
          <p>{flight.name}</p>
        </div>
      ))}
    </main>
  );
}
