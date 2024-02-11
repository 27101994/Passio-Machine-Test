# Recipe Sharing Platform

Welcome to the Recipe Sharing Platform! This platform allows users to share and explore recipes.

## Admin Login Details

To access the admin dashboard, use the following credentials:

- **Email:** admin@gmail.com
- **Password:** admin@1234

**Note:** The admin dashboard is accessible only after successfully logging in with the provided credentials.

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/recipe-sharing-platform.git
   ```

## React setup

1. Install dependencies for react:
   
   ```bash
   cd Recipe_sharing Frontend_React\Recipee_sharing
   npm install
   ```

2. Start the development server:
   
   ```bash
   npm start
   ```

## Laravel setup  

1. Install dependencies for react:
   
   ```bash
   cd Recipe_sharing_platform
   composer install
   ```

2. Copy Environment File:
   
   ```bash
   copy ".env.example" ".env"
   ```

3. Generate Application Key:
   
   ```bash
   php artisan key:generate
   ```

4. Create Database:

**Note:** Create an empty database for your Laravel project. Update the .env file with your database configuration.

   ```dotenv
   # .env

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   ```

5. Run Migrations:

   ```bash
   php artisan migrate
   ```

6. Install the Laravel Passport package using Composer:

    ```bash
    composer require laravel/passport
    ```

7. Run the Passport installation command:

    ```bash
    php artisan passport:install
    ```

8. After the above steps, obtain the generated API client credentials and update your `.env` file:

    ```dotenv
    # .env

    PASSPORT_PERSONAL_ACCESS_CLIENT_ID=1
    PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET="replace_with_your_secret_key"

    PASSPORT_PASSWORD_CLIENT_ID=2
    PASSPORT_PASSWORD_CLIENT_SECRET="replace_with_your_secret_key"
    ```    

9. Start the Development Server:   

   ```bash
   php artisan serve
   ```
  