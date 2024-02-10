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

## React setup

1. Install dependencies for react:
   
   ```bash
   cd Recipe_sharing Frontend_React\Recipee_sharing
   npm install

2. Start the development server:
   
   ```bash
   npm start

## Laravel setup  

1. Install dependencies for react:
   
   ```bash
   cd Recipe_sharing_platform
   composer install

2. Copy Environment File:
   
   ```bash
   cp .env.example .env

3. Generate Application Key:
   
   ```bash
   php artisan key:generate

4. Create Database:

**Note:** Create an empty database for your Laravel project. Update the .env file with your database configuration.

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password

5. Run Migrations:

   ```bash
   php artisan migrate

6. Start the Development Server:   

   ```bash
   php artisan serve

  