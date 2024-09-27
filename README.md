# Railway Management System

## Overview
A Railway Management System similar to IRCTC, designed to allow users to check train availability between stations, book seats, and manage bookings with real-time updates. The application features role-based access for users and administrators.

## Features
- User Registration and Login
- Admin functionalities to add and manage trains
- Check seat availability between stations
- Book seats on available trains
- View booking details
- Race condition handling for seat booking

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT (JSON Web Tokens)

## API Endpoints

### Authentication

- **Register User**  
  `POST /api/auth/register`  
  Registers a new user with name, email, and password.

- **Login User**  
  `POST /api/auth/login`  
  Logs in an existing user and returns a JWT token for authentication.

### Train Operations (Admin)

- **Add Train** (Admin only)  
  `POST /api/trains/add`  
  Adds a new train with a source, destination, and seat availability. This endpoint is protected by an API key.

### User Operations

- **Get Seat Availability**  
  `GET /api/trains/search?source=<source>&destination=<destination>`  
  Retrieves all trains between the given source and destination, along with seat availability.

- **Book Seat**  
  `POST /api/bookings/book`  
  Books a seat on a train for a logged-in user. This requires a valid JWT token.

- **Get Booking Details**  
  `GET /api/bookings/:bookingId`  
  Retrieves booking details for the specified booking ID.

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- PostgreSQL
- Prisma CLI

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Sejal0109/railway-management-system.git
