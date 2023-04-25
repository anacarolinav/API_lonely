import React from 'react';
import "../assets/style.css";


export default function Home() {
    return (
      <div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Signup</a></li>
          </ul>
        </nav>
        <div>
          <h1>Welcome to React App</h1>
          <p>Feel free to explore our page</p>
        </div>
      </div>
    );
  }
  


