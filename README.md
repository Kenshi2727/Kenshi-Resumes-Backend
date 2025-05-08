# Kenshi Resumes Backend

A robust and scalable backend for the Kenshi Resumes application, providing API endpoints to generate, store, and retrieve AI-powered resume data. Built with Node.js, Express, and PostgreSQL, and deployed on Railway for seamless, production-ready hosting.

---

## 📍 Key Highlights

* **AI Integration**: Leverages OpenAI to generate tailored resume content.
* **Express.js Framework**: Fast and minimal server setup with middleware support.
* **PostgreSQL Database**: Reliable relational storage for resume records.
* **Deployment**: Hosted on Railway for zero-downtime production.
* **Modular Architecture**: Well-structured codebase with separate modules for bots, AI logic, and database queries.

---

## 🚀 Features

* **Resume Generation**: Create professional resumes powered by AI.
* **Flash Recommendations**: Quick tips to enhance resume sections.
* **Telegram Bot**: (Optional) Get your resume through a Telegram bot.
* **Database Queries**: Ready-to-use SQL scripts for table setup and data retrieval.

---

## 🛠️ Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: PostgreSQL
* **Query**: Native `pg` library
* **AI Service**: Gemini AI API
* **Deployment**: Railway

---

## 📋 Prerequisites

* [Node.js](https://nodejs.org/) v16 or higher
* [PostgreSQL](https://www.postgresql.org/) v12 or higher (or a hosted DB via Railway)
* [Railway CLI](https://railway.app/) (for deployment)
* Gemini API Key

---

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Kenshi2727/Kenshi-Resumes-Backend.git
   cd Kenshi-Resumes-Backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   * Create a `.env` file in the root directory:

     ```env
     PORT=5000
     DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
     GEMINI_API_KEY=your_openai_api_key
     TELEGRAM_BOT_TOKEN=your_telegram_bot_token (optional)
     ```

4. **Initialize the database**

   * Run the SQL script to create tables:

     ```bash
     psql $DATABASE_URL -f queries.sql
     ```

5. **Run the application**

   ```bash
   npm start
   ```

---

## 📖 API Reference

### Resume Endpoints

* **POST** `api/user-resumes`
  Generate and save a new resume.
  **Body**:

  ```json
   {
    "data": {
             "title": "resumeTitle",
             "documentId": "uuid",
             "userEmail": "userEmail@example.com",
             "userName": "User Full Name"
           }
   }
 

  
  ```

**Response**:

  ```json
     {
      "data": {
               "title": "John Doe",
               "documentId": "**************************",
               "userEmail": "johndoe@example.com",
               "userName": "John Doe"
              }
    }

  ```

* **GET** `/api/user-resumes`
  Retrieve a previously generated resume using query parametrs (req.query.userEmail).

### Flash Recommendations

* **GET** `/api/user-resumes/fetchRecommendations/:id`
  Get quick improvement tips for your resume ATS score.

### Bot Routes (Optional)

* **POST** `/api/user-resumes/upload/:id/:teleUser`
  Endpoint consumed by the Telegram bot for resume delivery.

---

## 🗄️ Directory Structure

```
├── bot.js                    # Telegram bot setup
├── flashAI.js                # AI-driven resume generator
├── flashRecommendations.js   # Quick recommendation logic
├── index.js                  # Express server entry point
├── queries.sql               # SQL script to initialize the database
├── sharedData.js             # Shared constants and helpers
├── package.json              # Project metadata & scripts
├── steps.txt                 # Development & deployment steps
└── README.md                 # Project documentation
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📫 Contact

* **Author**: Abhishek Mathur
* **Email**: [abhishekmathurofficial@gmail.com](mailto:abhishekmathurofficial@gmail.com)
* **GitHub**: [Kenshi2727](https://github.com/Kenshi2727)

Feel free to reach out for feature requests or any questions!
