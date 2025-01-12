# Expense Tracker

A feature-rich web application designed to help users track, manage, and analyze their expenses. Built using modern technologies to provide a seamless and intuitive experience.

## 🚀 Live Demo
[View Live Project](https://xpensr-system-react.netlify.app/)

## 🛠️ Features
- **User Authentication**: Secure sign-up and log-in with Firebase Authentication.
- **Expense Management**: Add, update, delete, and view expenses effortlessly.
- **Budget Management**: Keep track of budgets and adjust them dynamically.
- **Expense Categories**: Organize expenses with custom categories.
- **Source of Transaction Management**: Add and manage sources of transactions while logging expenses.
- **User Profile Management**: Update personal details and preferences.
- **Dashboard with Charts**: Visualize expenses and budgets through interactive charts.
- **Report Generation**: Generate detailed reports for better expense analysis.
- **Responsive Design**: Built with Bootstrap and Reactstrap for a smooth experience on all devices.

## 🖥️ Tech Stack
- **Frontend**: React.js, Redux.js, Reactstrap, Bootstrap
- **Backend**: Firebase
- **Charts**: Chart.js

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/1200x600?text=Dashboard+Screenshot)

### Expense Management
![Expense Management](https://via.placeholder.com/1200x600?text=Expense+Management+Screenshot)

### Profile Management
![Profile Management](https://via.placeholder.com/1200x600?text=Profile+Management+Screenshot)

### Report Generation
![Report Generation](https://via.placeholder.com/1200x600?text=Report+Generation+Screenshot)

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

5. **Access the Application**:
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure
```plaintext
expense-tracker/
├── src/
│   ├── components/        # Reusable components
│   ├── screens/           # Application pages (Dashboard, Profile, etc.)
│   ├── feature/           # Redux store and slices
│   ├── assets/            # Static files (images, styles)
│   ├── lib/               # Utility functions
│   ├── constant/          # Constant Objects
│   └── App.js             # Main app entry point
├── public/                # Public assets
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

## 🛠️ Technologies Used

1. **Frontend**: React.js manages the UI and state using Redux.js.
2. **Backend**: Firebase handles authentication, database, and storage.
3. **Visualization**: Chart.js generates interactive charts for data insights.

## 🤝 Contributions

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## 📃 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
