Nuvée

Nuvee is a perfume-based e-commerce platform built using the MERN stack with modern cloud integrations and payment gateways.
It allows users to explore premium perfumes, make secure purchases, and enjoy a smooth shopping experience with AWS cloud hosting, Razorpay integration, and automated CI/CD pipelines.

📖 Introduction

Nuvee is a cloud-powered perfume e-commerce project where users can browse, search, and purchase perfumes seamlessly.
It features secure authentication, fast performance, and scalable deployment using AWS services.

🛠️ Technologies Used

MongoDB – Database for storing product and user data

Express.js – Backend web framework

React.js – Frontend user interface

Node.js – Server-side runtime

TypeScript – For strong typing and maintainability

Tailwind CSS – For responsive UI styling

Nodemailer – For email notifications and OTP delivery

Razorpay – For secure online payments

AWS S3 – For storing product images

AWS EC2 – For cloud hosting

AWS CloudFront (CDN) – For faster global content delivery

CI/CD – Automated build and deployment pipeline

🚀 Getting Started
🧭 Cloning the Repository

To clone the repository locally:

git clone https://github.com/mohammedniyafsm/Nuv-e.git
cd Nuv-e

📦 Installation

This project contains both frontend and backend folders.
Install dependencies for each part as shown below:

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

⚙️ Configuration

Create .env files in both backend and frontend directories.
Use the following environment variable structure:

🖥️ Frontend .env
VITE_BACKEND_URL=
VITE_RAZORPAY_KEY_ID=
VITE_RAZORPAY_SECRET=

⚙️ Backend .env
PORT=
MONGODB_URL=
JWT_SECRET_KEY=
OTP_SECRET_KEY=

EMAIL_USER=
EMAIL_PASS=

REGION=
ACCESS_KEY_ID=
SECRET_ACCESS_KEY=
BUCKET_NAME=
CLOUDFRONT_DOMAIN=

RAZORPAY_KEY_ID=
RAZORPAY_SECRET=

FRONTEND_URL=

▶️ Running the Project
Run Backend
cd backend
npm run dev

Run Frontend
cd frontend
npm run dev


The project will start on your configured ports, typically:

Frontend: http://localhost:5173

Backend: http://localhost:5000

💳 Payment Integration

Nuvee integrates Razorpay for fast and secure payments.
Ensure your Razorpay credentials are set correctly in both .env files before running the app.

☁️ Cloud Deployment

AWS EC2 hosts the backend server.

AWS S3 stores product images.

AWS CloudFront serves static assets via CDN for faster load times.

CI/CD pipelines ensure smooth automated deployment and updates.

🤝 Contribution Guide

We welcome contributions from the community! 💖

Fork the repository

Create a new branch

git checkout -b feature-branch-name


Commit your changes

git commit -m "Add feature description"


Push to your fork

git push origin feature-branch-name


Open a Pull Request

📫 Contact

For any issues, suggestions, or contributions, feel free to open an issue or reach out.

GitHub: @mohammedniyafsm