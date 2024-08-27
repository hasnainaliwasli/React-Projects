# 🎯 Todo App - Your Personal Task Manager

Welcome to the **Todo App**—a modern, intuitive task management tool designed to help you stay organized and productive. With user-specific todos, secure authentication, and a responsive design, managing your daily tasks has never been easier!

![Todo App Preview](https://github.com/hasnainaliwasli/pictures/blob/main/todo_home.png)

## ✨ Key Features

- 🔒 **Secure Authentication**: Only registered users can access the app.
- 🔑 **Private Routing**: Ensures that each user's data is kept secure and private.
- 📋 **User-Specific Todos**: View and manage todos specific to your user account, with data stored in Firebase Firestore.
- 📱 **Responsive Design**: The app is fully responsive, ensuring a seamless experience across all devices.
- 🗂️ **Organized Navigation**: Easily switch between Home, Todos, About, and Contact Us pages.
- 🔔 **Instant Notifications**: Stay informed with real-time alerts and notifications via React-Toastify.

## 🛠️ Built With

This project leverages the power of the following technologies:

- **React**: A flexible and powerful JavaScript library for building user interfaces.
- **Firebase Firestore**: A scalable and real-time NoSQL database for efficient data management.
- **Bootstrap**: A sleek, intuitive, and powerful front-end framework for faster and easier web development.
- **SCSS**: An extension of CSS that enables more efficient and maintainable styles.
- **Ant Design**: A comprehensive design system for enterprise-level products.
- **React-Toastify**: A lightweight and customizable library for handling notifications in React.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**
- **npm** or **yarn**
- **Firebase account**

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Firebase:**
   - Create a new project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore and Authentication (Email/Password).
   - Replace the Firebase config details in `src/firebaseConfig.js` with your project’s credentials.

4. **Run the App:**
   ```bash
   npm start
   # or
   yarn start
   ```

### Project Directory Structure

```
/src
  /assets          # Images, icons, etc.
  /components      # Reusable components (Navbar, Footer, etc.)
  /context         # React context and hooks for managing global state
  /pages           # Page components (Home, Todos, About, ContactUs)
  /services        # Firebase service configurations
  /styles          # SCSS styles and global styling
  App.js           # Root component
  index.js         # Entry point
```

## 🌍 Live Demo

Check out the live version of the app [here](https://your-live-demo-link.com).

## 📷 Screenshots

- **Login Page**
  ![Login Page](https://github.com/hasnainaliwasli/pictures/blob/main/todo_login.png)
- **Dashboard**
  ![Dashboard](https://github.com/hasnainaliwasli/pictures/blob/main/todo_dashboard.png)
- **Add Todo**
  ![Add Todo](https://github.com/hasnainaliwasli/pictures/blob/main/todo_home.png)
- **Show Todo**
  ![Add Todo](https://github.com/hasnainaliwasli/pictures/blob/main/todo_show.png)

## 📚 Documentation

- **React**: [Official Docs](https://reactjs.org/docs/getting-started.html)
- **Firebase Firestore**: [Official Docs](https://firebase.google.com/docs/firestore)
- **Bootstrap**: [Official Docs](https://getbootstrap.com/docs/)
- **SCSS**: [Official Docs](https://sass-lang.com/documentation)
- **Ant Design**: [Official Docs](https://ant.design/docs/react/introduce)
- **React-Toastify**: [Official Docs](https://fkhadra.github.io/react-toastify/introduction/)


## ❤️ Acknowledgements

Thanks to the open-source community for the libraries and tools that made this project possible.

