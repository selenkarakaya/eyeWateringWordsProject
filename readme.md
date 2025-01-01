<h1 align="center">
  📝💧 Eye Watering Words
</h1>
<p align="center">
    <em>User Authentication, MongoDB Integration, Real-Time Feedback, CRUD Operations, Interactive UI
</em>
</p>
<p align="center">

**Eye Watering Words** is an interactive feedback platform where users can share their thoughts, ideas, and experiences. Built with **React**, **Redux**, **Tailwind CSS**, **Node.js**, and **MongoDB**, it provides a dynamic, user-friendly space for open expression. Users can register, post entries, comment on others' posts, and customize their profiles.

---

## 🚀 Features

- **User Authentication**:
  - Secure registration with email validation and password checks.
  - Users can select a custom username or generate one randomly.
- **Dynamic Entries & Comments**:
  - Users can create entries with custom tags, edit, or delete them.
  - Add comments on entries (their own or others’), with edit and delete functionality.
- **Personalized Profiles**:
  - Upload an avatar, and view your entries and comments in one place.
- **Search Functionality**:
  - Search entries by tags, usernames, or entry content.
- **Data Management**:
  - All data is securely saved in **MongoDB** via **Node.js** and managed with **Redux** for optimal state handling.
---

## 🛠️ Tech Stack

- **Frontend**: React, Redux, Tailwind CSS, HTML, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB

---
## Demo 🔗

 👉 [**You can check out a live demo of the Eye Watering Words!**](https://eyewateringword-468f399c8e55.herokuapp.com/) 


## 📸 Screenshots

- **Add new entry page**
  ![entry page](./frontend/src/components/image/entry.png)
- **Comment page**
  ![Comment page](./frontend/src/components/image/comment.png)
- **Register&Log in page**
  <p><img width="49%" height="250" src="./frontend/src/components/image/login.png"><img width="49%" height="250" src="./frontend/src/components/image/register.png"></p>

---

## 🔑 Usage

1. Register an account with email, username, and password.
2. Log in and start creating entries!
3. Edit/Delete entries and comments you’ve posted.
4. Search for entries by tag, username, or keywords.
5. Profile Customization: Upload an avatar and manage your entries and comments.

---

## 📚 Learning & Insights

Through the **Eye Watering Words** project, I gained valuable insights and skills, including:

- **User Authentication**: Enhanced my ability to implement secure user registration and login features, allowing users to create personalized accounts.
- **Dynamic Content Management**: Improved my skills in handling user-generated content, enabling users to write, edit, and delete their thoughts and feedback seamlessly.
- **Commenting System**: Learned to build an interactive commenting feature, allowing users to provide feedback on others' entries, fostering community interaction.
- **Data Storage with MongoDB**: Gained experience in using MongoDB for efficient data storage and retrieval, ensuring all user entries and comments are managed effectively.
- **Responsive Design**: Developed skills in creating a responsive user interface using Tailwind CSS, ensuring a smooth experience across various devices.

This project solidified my understanding of full-stack development and deepened my passion for creating applications that promote user engagement and expression.

---

## 🏗️ Setup & Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/selenkarakaya/eyeWateringWordsProject.git
    cd eyeWateringWordsProject
    ```
2. **Install dependencies** for both frontend and backend:
    ```bash
    # Install frontend dependencies
    cd frontend
    npm install

    # Install backend dependencies
    cd backend
    npm install
    ```

3. **Environment Variables**:
   Set up a `.env` file in the root directory.

   ```plaintext
   NODE_ENV = development
   PORT = 8000
   MONGODB_URI=your_mongodb_connection_string
   MONGO_URI = your mongodb uri
   JWT_SECRET=your_jwt_secret
   ```
4. **Start the application**: To run both frontend and backend concurrently, navigate to the root folder and run:
   ```
   npm run dev
   ```
5. Run Tests: To run tests for the project, make sure Jest or your chosen test framework is installed:
   - Frontend Testing: Navigate to the frontend folder and run the frontend tests:
    ```
    cd frontend
    npm test
    ```
## 📄 License

This project is open-source and available for personal or educational use.

---

## 📬 Contact

If you have any questions or feedback, feel free to reach out via [LinkedIn](https://www.linkedin.com/in/selenkarakaya/) or [GitHub](https://github.com/selenkarakaya).


## Happy coding! 👩‍💻👨‍💻
