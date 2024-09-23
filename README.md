# Unlocking Database Strategy for Session Management with Auth.js and Qwik.js

This project demonstrates how to implement credentials-based authentication in a Qwik.js application using Auth.js. The focus is on unlocking the database strategy for session management, allowing seamless integration with databases using Drizzle ORM and ensuring secure user sessions.

## Features
- **Credentials-based Authentication**: Secure login system using email and password.
- **Session Management**: Unlocking database-backed session handling with Drizzle ORM.
- **Qwik.js Framework**: Fast, resumable web applications using Qwik.js.
- **Drizzle ORM & PostgreSQL**: Database operations are handled through Drizzle ORM and PostgreSQL.
- **JWT Integration**: Utilizing JSON Web Tokens (JWT) for additional security layers in session handling.

## Getting Started

### Prerequisites
- **Node.js** (version 18.17.1 or higher)
- **PNPM** (version 8.15.3 or higher)
- **PostgreSQL** database (or use NeonDB for hosted Postgres)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Deas-Dose/qwik_auth_js_creds.git
    cd qwik_auth_js_creds
    ```

2. **Install dependencies**:
    ```bash
    pnpm install
    ```

3. **Set up environment variables**:

   Change the `.env.example` file name to just `.env` and replace the `DATABASE_URL` variable with your own:
    ```
    DATABASE_URL=your_db_url
    ```

### Setting Up the Database

1. **Drizzle Config**: 
    Ensure your `drizzle.config.ts` is set up to point to your `schema.ts` and migrations directory.

2. **Generate Database Migrations**:
    Run Drizzle to generate the necessary migrations for your user and session tables:
    ```bash
    pnpm db:generate
    ```

3. **Run Migrations**:
    After generating the migrations, apply them to your database:
    ```bash
    pnpm db:migrate
    ```

### Running the Project

To start the development server:
```bash
pnpm start
```
The app will be available at http://localhost:5173.
### Folder Structure

    plugin@auth.ts: Contains the main authentication setup using Auth.js, including the credentials provider and session handling.
    utils/users.actions.ts: Contains helper functions for database operations, such as fetching users and managing sessions.

### Contributing

Feel free to fork this project, make improvements, and submit a pull request. Contributions are always welcome!
### License

This project is licensed under the MIT License. See the LICENSE file for more details.

Feel free to customize the repository link, and don't forget to add instructions specific to your environment and app requirements!
