# Wanderlust - Airbnb Clone

A full-stack web application for listing and reviewing travel accommodations, built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Secure signup and login using Passport.js with local strategy
- **Listing Management**: Create, read, update, and delete (CRUD) accommodation listings
- **Reviews System**: Add and manage reviews for listings with ratings
- **Image Upload**: Upload and store listing images using Cloudinary
- **Responsive Design**: EJS templating with responsive CSS styling
- **Session Management**: Secure session handling with express-session and MongoDB store
- **Flash Messages**: User-friendly feedback messages using connect-flash
- **Data Validation**: Server-side validation using Joi schema validation

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **Cloudinary** - Image storage and management
- **Joi** - Schema validation

### Frontend
- **EJS** - Templating engine
- **Bootstrap/CSS** - Styling
- **JavaScript** - Client-side interactions

## Project Structure

```
├── app.js                    # Main application entry point
├── cloudconfig.js            # Cloudinary configuration
├── middleware.js             # Custom middleware (authentication, etc.)
├── schema.js                 # Joi validation schemas
├── package.json              # Project dependencies
│
├── controller/               # Business logic controllers
│   ├── index.js
│   ├── user.js              # User authentication logic
│   └── reviews.js           # Review operations
│
├── models/                   # Mongoose schemas
│   ├── listing.js           # Listing model
│   ├── review.js            # Review model
│   └── user.js              # User model
│
├── router/                   # API routes
│   ├── listing.js           # Listing routes
│   ├── review.js            # Review routes
│   └── user.js              # User authentication routes
│
├── views/                    # EJS templates
│   ├── includes/            # Reusable components
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   ├── layouts/
│   │   └── boilerplate.ejs  # Main layout template
│   ├── listings/            # Listing views
│   │   ├── index.ejs        # List all listings
│   │   ├── show.ejs         # Single listing detail
│   │   ├── new.ejs          # Create new listing
│   │   └── edit.ejs         # Edit listing
│   └── user/                # User views
│       ├── login.ejs        # Login page
│       └── signup.ejs       # Registration page
│
├── public/                   # Static assets
│   ├── css/
│   │   ├── style.css
│   │   └── rating.css
│   └── js/
│       └── script.js
│
├── init/                     # Database initialization
│   ├── index.js
│   └── data.js
│
├── uploads/                  # Temporary file uploads
│
└── utils/                    # Utility functions
    ├── ExpressError.js      # Custom error class
    └── wrapasync.js         # Async error wrapper
```

## Installation & Setup

### Prerequisites
- Node.js (v22.14.0 or higher)
- MongoDB (running locally on `mongodb://127.0.0.1:27017`)
- Cloudinary account (for image uploads)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd major-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   NODE_ENV=development
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   ```

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   node app.js
   ```
   
   The app will be available at `http://localhost:3000`

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.1.0 | Web framework |
| mongoose | ^8.19.3 | MongoDB ODM |
| passport | ^0.7.0 | Authentication |
| cloudinary | ^2.8.0 | Image storage |
| joi | ^17.13.3 | Data validation |
| ejs | ^3.1.10 | Template engine |
| express-session | ^1.18.2 | Session management |
| multer | ^2.0.2 | File upload handling |
| connect-flash | ^0.1.1 | Flash messages |

## API Routes

### User Routes (`/user`)
- `POST /signup` - Register new user
- `POST /login` - User login
- `GET /logout` - User logout

### Listing Routes (`/listings`)
- `GET /` - View all listings
- `POST /` - Create new listing
- `GET /:id` - View listing details
- `PUT /:id` - Update listing
- `DELETE /:id` - Delete listing

### Review Routes (`/listings/:id/reviews`)
- `POST /` - Add review to listing
- `DELETE /:reviewId` - Delete review

## Core Features Explained

### Authentication
User authentication is handled using Passport.js with the local strategy. Passwords are securely hashed using passport-local-mongoose.

### Image Management
Listings can have multiple images uploaded directly to Cloudinary, providing reliable cloud storage and CDN delivery.

### Data Validation
All user inputs are validated on the server using Joi schemas defined in `schema.js` before being saved to the database.

### Error Handling
Custom error handling with `ExpressError` class and async wrapper for catching errors in route handlers.

## Security Features

- Password hashing with passport-local-mongoose
- Session-based authentication
- CSRF protection via session validation
- Input validation with Joi
- Environment variables for sensitive data

## Future Enhancements

- [ ] Advanced search and filtering
- [ ] Booking system
- [ ] Payment integration
- [ ] Email notifications
- [ ] User profiles and ratings
- [ ] Wishlist feature
- [ ] Real-time chat

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

ISC License

## Author

Created as a major project for learning full-stack web development with the MERN stack (MongoDB, Express, Node.js) and additional technologies.

---

**Happy traveling with Wanderlust! 🌍✈️**
