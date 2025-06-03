import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const port = 5000;

const app = express();

app.use(express.static("./"));
app.use(express.urlencoded());

const header = `
       <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My Website</title>
    <link rel="stylesheet" href="style.css">
     </head>
  <body>
    <header>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">register</a></li>
        <li><a href="/admit">Admit</a></li>
        <li><a href="/logout">&times; </a></li>
      </ul>
    </header>
<main>
`;

const footer = `
     
    </main>
  </body>
</html>
`;

app.get("/home", (req, res) => {
  res.send(`${header}

    
     <h1>Welcome to Home Page</h1>

    ${footer} `);
});
app.get("/register", (req, res) => {
  res.send(`${header}

    
     <h1>Welcome to Register Page</h1>

    ${footer} `);
});
app.get("/login", (req, res) => {
  res.send(`${header}

    
     <h1>Welcome to Login Page</h1>

    ${footer} `);
});

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
