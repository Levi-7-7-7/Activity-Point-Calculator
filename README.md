# 🎓 Activity Points Management System

A full-stack MERN web application to help academic institutions manage and track student activity points. This system allows students to upload certificates and view their point status while admins can review and approve submissions.

---

## 🚀 Features

- 🔐 Secure Login & Registration (JWT-based)
- 📤 Upload Certificates (with file/image support)
- 📊 Auto-Calculation of Activity Points
- ✅ Admin Review & Approval Dashboard
- 🧾 MongoDB-based Data Storage
- 🧑‍🎓 Role-Based Access (Student/Admin)
- 📁 File Uploads using Multer

---

## 🧰 Tech Stack

| Frontend | Backend | Database | Others |
|----------|---------|----------|--------|
| React.js | Node.js | MongoDB  | Express.js, JWT, Axios, Multer, Bootstrap |

---

## 📁 Project Structure

```

major-project/
├── activity-points-system/
│   ├── client/    # React Frontend
│   └── server/    # Express + MongoDB Backend
├── .gitignore
├── README.md
└── LICENSE

````

---

## ⚙️ Getting Started

### 🔽 Clone the Repository

```bash
git clone https://github.com/Levi-7-7-7/major-project.git
cd major-project/activity-points-system
````

### ▶️ Start Backend Server

```bash
cd server
npm install
npm run dev
```

### 🌐 Start React Frontend

Open a **new terminal** and run:

```bash
cd client
npm install
npm start
```

* Backend will run on `http://localhost:5000`
* Frontend will run on `http://localhost:3000`

---

## 🔐 Environment Variables

Create a `.env` file inside the `server/` folder with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> ⚠️ Don't forget: `.env` is already listed in `.gitignore`.

---

## 📸 Screenshots

![Screenshot 2025-07-05 205058](https://github.com/user-attachments/assets/398d21b5-268a-46c1-a0f4-2cd57d238668)

![Screenshot 2025-07-05 205104](https://github.com/user-attachments/assets/998672f3-3f79-47b3-bf3b-3c84b2d364e3)

![Screenshot 2025-07-05 205053](https://github.com/user-attachments/assets/aa3ab841-d3c7-42cc-95d7-4ab747567f2b)

![Screenshot 2025-07-05 205046](https://github.com/user-attachments/assets/1495853e-1069-43a9-adc9-3af526ff2e5e)


---

## 🚧 Future Improvements

* 📬 Email Notifications
* 📊 Admin Analytics Dashboard
* 🧾 PDF Certificate Generation
* 📁 Export Data (CSV or PDF)

---

## 👨‍💻 Author

**Levi**
📎 GitHub: [@Levi-7-7-7](https://github.com/Levi-7-7-7)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

```
