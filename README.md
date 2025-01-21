# Project Name Car Judge

## Overview

This project is a web application for "Car Judge" car review site.

## Features

- User authentication with JWT
- CRUD operations for posts
- Responsive design with CSS

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/varickt/Group1-CapstoneProject2024.git
2. NPM install in the root of directory
3. CD into client, NPM install in client directory
4. Create .env file and add your credentials including: 
   DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase?schema=public" (If on mac insert your required credentials)
   JWT_SECRET="your_jwt_secret"
   PORT=3000
EMAIL_SECRET=your_email_secret

CLIENT_URL=http://localhost:3000
5. In the root type this command into your terminal: npx prisma migrate dev --name init
6. In root type: NPM run seed
7. Split terminal and in the second one cd into client
8. Root(Server Run Command): npm run start
9. Client(Client Run Command): npm run dev
   ```
