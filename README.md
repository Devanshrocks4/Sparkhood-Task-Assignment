AI Safety Incident
Dashboard

Deployed link: https://aiguardianhub.netlify.app/


Getting Started with the Project 🚀
Hey there! Thanks for checking out the project.
Here’s a simple guide to help you set everything up and run it locally on your machine.

🛠 Tech Stack
Backend: Node.js + Express.js

Database: MongoDB

Payments: Stripe API

Frontend: (Depending on the project) likely vanilla HTML/CSS/JS or React

🧰 How to Install and Run the Project
1. Download or Clone the Project
First, download the project files (or clone the repo if it’s hosted online).
If you downloaded the .zip, just unzip it anywhere you like.

bash
Copy
Edit
git clone <repository-link>
Navigate into the project folder:

bash
Copy
Edit
cd <your-project-folder>
2. Install Dependencies
Before you do anything else, make sure you have Node.js and npm installed.

Now, install all the required Node.js packages by running:

bash
Copy
Edit
npm install
This will pull in everything needed like Express, Stripe SDK, Mongoose (for MongoDB), etc.

3. Set Up Environment Variables
Create a .env file in the root directory of the project.

You'll need to add a few keys, something like this:

env
Copy
Edit
PORT=3000
MONGO_URI=your_mongo_database_connection_string
STRIPE_SECRET_KEY=your_secret_stripe_key
STRIPE_PUBLIC_KEY=your_public_stripe_key
🔥 Important: Never share your .env file or commit it to GitHub — it contains sensitive information!

4. Run the Project
Once everything’s set up, you can fire up the server with:

bash
Copy
Edit
npm start
or if you have nodemon installed (recommended for development):

bash
Copy
Edit
npm run dev
If all goes well, you should see something like:

arduino
Copy
Edit
Server is running on http://localhost:3000
Now, open your browser and visit http://localhost:3000 — you're live locally!

✨ Some Quick Design Notes
Why MongoDB?
It’s perfect for handling flexible and dynamic data like menus, orders, and user profiles without needing strict schemas.

Why Stripe?
It's super secure, widely trusted, and offers a smooth developer experience for integrating online payments.

Why Express.js?
Fast, minimalistic, and perfect for creating REST APIs without much setup hassle.

🚧 Challenges Faced
Handling Stripe payments securely, especially the webhook events, was tricky.

Structuring the database for a real-world restaurant menu (with categories, prices, options) took some careful thinking.

Making sure the payment flow is smooth and error-free so users have a good experience.