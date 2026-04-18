const express = require("express");
const fs = require("fs");
const path = require("path");

console.log("Starting server...");

const filePath = path.join(__dirname, "people.json");
let users = [];
try {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    users = JSON.parse(jsonData);
    console.log("Successfully loaded", users.length, "users");
} catch (error) {
    console.error("Error loading people.json:", error.message);
    console.error("Please check that people.json exists and is valid JSON");
    process.exit(1);
}

const app = express();

// Add body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});

app.get("/", (req, res) => {
    res.send("Server is running! Loaded " + users.length + " users.");
});

app.get("/login", (req, res) => {
    const { name, pass } = req.query;

    // 1. Validate input
    if (!name || !pass) {
        return res.status(400).send("Name and password are required");
    }

    // 2. Find user (data file uses "User name"/"Password")
    const user = users.find(u => u["User name"] === name && u["Password"] === pass);

    // 3. Check result
    if (!user) {
        return res.status(401).send("Invalid credentials");
    }

    // 4. Success
    res.send({
        message: "Login successful",
        user
    });
});

app.post("/signup", (req, res) => {
    try {
        const { name, pass } = req.query;

        // 1. Validate input
        if (!name || !pass) {
            return res.status(400).send("Name and password are required");
        }

        // 2. Check if user already exists
        const existingUser = users.find(u => u["User name"] === name);
        if (existingUser) {
            return res.status(409).send("User already exists");
        }

        // 3. Add new user with full schema
        const newUser = {
            "User name": name,
            "Password": pass,
            "Jobs completed": 0,
            "Trades completed": 0,
            "Verification": "Pending",
            "Profile photo": "https://example.com/profiles/default.jpg",
            "Sector": "General",
            "Ranking": 0.0
        };
        users.push(newUser);

        // 4. Write to file
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        console.log("New user registered:", name);
        res.send({
            message: "Signup successful",
            user: newUser
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).send("Internal server error");
    }
});

app.listen(3000, () => {
    console.log("Server has started on port 3000");
    console.log("Available endpoints:");
    console.log("  GET  /         - Server status");
    console.log("  GET  /login    - User login");
    console.log("  POST /signup   - User registration");
});
