# Admin App Setup (Backend & Frontend)

This guide will help you set up the Admin App, including the Laravel backend and React frontend.

## Prerequisites

Make sure the following PHP extensions are enabled in your `php.ini` file:

- extension=fileinfo
- extension=openssl
- extension=pdo_mysql
- extension_dir = "ext"

---

## Backend Setup (Laravel)

1. **Clone the repository:**
   
   Run the following command to clone the repository:
   `git clone https://github.com/lembugoreng/admin-app-khind.git`

2. **Navigate to the backend directory:**
   
   `cd admin-app-khind/backend`

3. **Install dependencies:**
   
   Update the dependencies by running:
   `composer update`

4. **Configure environment variables:**
   
   Update the `.env` file with your local MySQL configuration. Example:
   
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=laravel_db
    DB_USERNAME=root
    DB_PASSWORD=


5. **Generate application key:**

`php artisan key:generate`

6. **Run database migrations:**

`php artisan migrate`

7. **Create a new user:**

    Open an integrated terminal and run the following command:

    `php artisan tinker`

    Then paste the following code to create a new user:

    use App\Models\User;

    $user = User::create([
        'username' => 'newuser',
        'password' => bcrypt('password123'),
    ]);



8. **Start the Laravel server:**

    `php artisan serve`

---

## Frontend Setup (React)

1. **Navigate to the frontend directory:**

    `cd admin-app-khind/frontend`

2. **Install dependencies:**

    `npm install`

3. **Start the React development server:**

    `npm start`

---

    Now you're all set! The backend will be running on `http://127.0.0.1:8000` and the frontend on `http://localhost:3000`.
