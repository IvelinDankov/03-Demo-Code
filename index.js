import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const port = 5000;

const app = express();

let users = [];
const SECRET = "mysecret";

app.use(express.static("./"));
app.use(express.urlencoded());
app.use(cookieParser());

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
        <li><a href="/admin">Admin</a></li>
        <li><a href="/logout">&times; </a></li>
      </ul>
    </header>
<main>
`;

const footer = `
     
    </main>

    <footer> &copy; all rigths reserved </footer>
  </body>
</html>
`;

const form = `
    
`;

app.get("/", (req, res) => {
  res.send(`${header}

    
     <h1>Welcome to Home Page</h1>
     <p> Please Log in First </p>

    ${footer} `);
});
app.get("/home", (req, res) => {
  const token = req.cookies["auth"];

  if (!token) return res.send("User does not exist!");

  const decodedToken = jwt.verify(token, SECRET);

  res.send(`${header}

    
     <h1>Welcome to Home Page</h1>
     <h4> Hi,   ${decodedToken.username}</h4>

 

    ${footer} `);
});
app.get("/register", (req, res) => {
  res.send(`${header}

    
     <h1>Welcome to Register Page</h1>

      <form method="post">
        <h3>Register form</h3>
        <p class="form-group">
          <label for="username">username</label>
          <input type="text" name="username" id="username" />
        </p>
        <p class="form-group">
          <label for="password">password</label>
          <input type="password" name="password" id="password" />
        </p>
        <p class="cta-btns">
            <button type="submit">Sign up</button>
        </p>
      </form>

    ${footer} `);
});
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const salt = bcrypt.genSaltSync(10);

  const hashedPass = bcrypt.hashSync(password, salt);

  users.push({ username, password: hashedPass });

  res.redirect("/login");
});
app.get("/login", (req, res) => {
  res.send(`${header}

    
     <h1>Welcome to Login Page</h1>

     <form method="post">
        <h3>Login form</h3>
        <p class="form-group">
          <label for="username">username</label>
          <input type="text" name="username" id="username" />
        </p>
        <p class="form-group">
          <label for="password">password</label>
          <input type="password" name="password" id="password" />
        </p>
        <p class="cta-btns">
            <button type="submit">Login</button>
        </p>
      </form>

    ${footer} `);
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (!user) return res.send("<p>There is no such username</p>");

  const isValid = bcrypt.compareSync(password, user.password);

  if (!isValid) return res.send(`User password is not Valid!`);

  const payload = {
    username,
    role: "admin",
  };

  try {
    const token = jwt.sign(payload, SECRET, { expiresIn: "3h" });
    res.cookie("auth", token);
    res.send(`${header}

    
     <h1>Welcome to Login Page</h1>

     <form method="post">
        <h3>Login form</h3>
        <p class="form-group">
          <label for="username">username</label>
          <input type="text" name="username" id="username" />
        </p>
        <p class="form-group">
          <label for="password">password</label>
          <input type="password" name="password" id="password" />
        </p>
        <p class="cta-btns">
            <button type="submit">Login</button>
        </p>
      </form>

    ${footer} `);
  } catch (err) {
    res.clearCookie("auth");
    res.status(403).send("Token is not valid");
  }
});

app.get("/admin", (req, res) => {
  res.send(`${header}

    
     <h1>Welcome to Admin Page</h1>

    ${footer} `);
});

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
