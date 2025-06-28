# Expense Tracker

A feature-rich web application designed to help users track, manage, and analyze their expenses. Built using modern technologies to provide a seamless and intuitive experience.

## 🚀 Live Demo
[View Live Project](https://xpensr-system-react.netlify.app/)

## 📸 Screenshots

### Dashboard
![dashboard](https://github.com/user-attachments/assets/efe38fc3-6e40-4db4-851f-7f4cefd4033c)

### Transaction
![transaction-view](https://github.com/user-attachments/assets/6abaf6b0-2625-41ed-8a41-8be147b5ec56)

### Sign Up
![sign-up view](https://github.com/user-attachments/assets/47dac344-e19a-4e2a-92f7-2293843f0472)

### Sign In
![sign-in view](https://github.com/user-attachments/assets/af2f128e-bcf3-4368-a17d-7adc3a556a3a)

### Report Generation
![report generate](https://github.com/user-attachments/assets/47c805ea-2cbe-4fef-99cc-646a705adfe3)

## 🛠️ Features
- **User Authentication**: Secure sign-up and log-in with Firebase Authentication.
- **Expense Management**: Add, update, delete, and view expenses effortlessly.
- **Budget Management**: Keep track of budgets and adjust them dynamically.
- **Expense Categories**: Organize expenses with custom categories.
- **Source of Transaction Management**: Add and manage sources of transactions while logging expenses.
- **Dashboard with Charts**: Visualize expenses and budgets through interactive charts.
- **Report Generation**: Generate detailed reports for better expense analysis.
- **Responsive Design**: Built with Bootstrap and Reactstrap for a smooth device experience.
- **User Profile Management**: Update personal details and preferences.

## 🖥️ Tech Stack
- **Frontend**: React.js, Redux.js, Reactstrap, Bootstrap
- **Backend**: Firebase
- **Charts**: Chart.js

## 🏗️ Installation

Follow these steps to run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Firebase**:
   - Go to [Firebase Console](https://firebase.google.com/).
   - Create a new project and get your Firebase configuration.
   - Add your Firebase config to a `.env` file or directly into the Firebase initialization in the code.

 Example `.env` file:
   ```env
   VITE_APP_ID=your-firebase-api-key
   VITE_FIREBASE_API=your-firebase-api
   VITE_MESSAGING_SENDER_ID=your-messaging-sender-id
   ```

4. **Run the Project**:
   ```bash
   npm start
   ```
