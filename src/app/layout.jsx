"use client";
import "./global.css";
import Link from "next/link";
import { handleLogout } from "./components/authComponent";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
          <ul  className="menuNav">
          <li>
              <Link className="listoflinks" href="/">
                Sign In
              </Link>
            </li>

            <li>
              <Link className="listoflinks" href="/publicChat">
                Public Chat
              </Link>
            </li>

            <li>
              <button className="loggout" onClick={handleLogout}>Loggout</button>
            </li>
          </ul>
        

        {children}
      </body>
    </html>
  );
}
