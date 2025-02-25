# members-only

Members Only is a web application that allows users to sign up, log in, and post messages. The app features user authentication, admin permissions, and message management. Only admins can delete messages. The app is built using Express, EJS, Passport.js, and PostgreSQL.

🚀 Features
- User authentication (Sign up, Login, Logout)
- Role-based access control (Admin vs Regular User)
- Admin-only message deletion
- Flash messages for feedback

 🛠️ Technologies Used
- Backend: Node.js, Express
- Authentication: Passport.js, bcrypt
- Database: PostgreSQL
- Frontend: EJS, Bootstrap for styling

 📂 Project Structure

members-only/
├─ config/
├─  └─ passaportConfig.js
├─ models/
├─  └─ messageModel.js
├─  └─ userModel.js
├─ node_modules/
├─ public/
│   └─ styles.css
├─ routes/
│   ├─ auth.js
│   ├─ index.js
│   ├─ message.js
│   ├─ admin.js
│   ├─ login.js
├─ views/
│   ├─ partials/
│   │   └─ footer.ejs
│   │   └─ header.ejs
│   ├─ layout.ejs
│   ├─ index.ejs
│   ├─ signup.ejs
│   ├─ login.ejs
│   ├─ messages.ejs
├─ .env
├─ app.js
├─ db.js
├─ package.json
└─ README.md

👤 User Roles
- Admin: Can delete messages
- Regular User: Can view and post messages

