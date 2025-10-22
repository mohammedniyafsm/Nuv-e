
# Nuvée


## 📖 Introduction 
###
Nuvee is a cloud-powered perfume e-commerce project where users can browse, search, and purchase perfumes seamlessly. It features secure authentication, fast performance, and scalable deployment using AWS services.
 

## 🛠️ Technologies Used


- MERN Stack
- TypeScript

- Tailwind CSS 

- Nodemailer 

- Razorpay 

- AWS S3 – For storing product images

- AWS EC2 – For cloud hosting

- AWS CloudFront (CDN) – For faster global content delivery

- CI/CD – Automated build and deployment pipeline

#

## 🚀 Getting Started 🧭 Cloning the Repository
###

To clone the repository locally:
```markdown
git clone https://github.com/mohammedniyafsm/Nuv-e.git 
cd Nuv-e
```

📦 Installation

This project contains both frontend and backend folders. Install dependencies for each part as shown below:

Install backend dependencies
```
cd backend 
npm install
```

Install frontend dependencies
```
cd ../frontend 
npm install
```

⚙️ Configuration

Create .env files in both backend and frontend directories. Use the following environment variable structure:

🖥️ Frontend .env 
```
VITE_BACKEND_URL= 
VITE_RAZORPAY_KEY_ID= 
VITE_RAZORPAY_SECRET=
```
⚙️ Backend .env
```
PORT= MONGODB_URL=
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
```

▶️ Running the Project (Run Backend)
```
cd backend
npm run dev
```
Run Frontend 
```
cd frontend 
npm run dev
```

The project will start on your configured ports, typically:
```
Frontend: http://localhost:5173
Backend: http://localhost:3000
```
#
💳 Payment Integration

Nuvee integrates Razorpay for fast and secure payments. Ensure your Razorpay credentials are set correctly in both .env files before running the app.
#

☁️ Cloud Deployment

AWS EC2 hosts the backend server.

AWS S3 stores product images.

AWS CloudFront serves static assets via CDN for faster load times.

CI/CD pipelines ensure smooth automated deployment and updates.
#

## 🤝 Contribution Guide

I hearty welcome contributions! Please follow these steps:

- Fork the repository

- Create a new branch ```(git checkout -b feature-branch-name)```

- Make your changes and commit them ```(git commit -m "Add feature description").```

- Push your changes ```(git push origin feature-branch-name). Create a Pull Request.```

---

Thank you for checking out this project! Feel free to open an issue if you have any questions or suggestions.
