RESTful CRUD API—Using Node.js, Express.js and MongoDB
Built a secure RESTful API for book data management with CRUD operations in Node.js, Express.js, and MongoDB, integrating error handling,
validation, testing, security enhancements, and deploying to Heroku.
CRUD stands for Create, Read, Update, and Delete. These are the four basic operations you can perform on data in any database. An API, or Application Programming Interface, is a set of rules and protocols for building and interacting with software applications. So, a CRUD API allows you to create, read, update, and delete data through defined interfaces. 
Node.js is a powerful JavaScript runtime that lets you run JavaScript on the server side. It’s fast, scalable, and has a massive community supporting it. On the other hand, Express is a web application framework for Node.js. It simplifies the process of building web applications and APIs with Node.js. It’s like having a toolbox that makes your job as a developer easier and more efficient.
efining CRUD Operations
For a CRUD API, you typically need four types of operations:

Create (POST): Adds new data.
Read (GET): Retrieves data.
Update (PUT/PATCH): Modifies existing data.
Delete (DELETE): Removes data.

Planning URL Structure and HTTP Methods
Imagine you’re building an API for managing books in a library. Here’s how you might structure your endpoints:

Create a Book: POST /books
Get All Books: GET /books
Get a Single Book: GET /books/:id
Update a Book: PUT /books/:id
Delete a Book: DELETE /books/:id

Choosing a Database: MongoDB
MongoDB is an excellent choice for several reasons. It’s flexible, scalable, and works well with JavaScript and Node.js. Plus, its document-oriented nature makes it a good fit for JSON data.

Connecting MongoDB to Your Node.js Application
First, you need to set up MongoDB. You can either install it locally or use a cloud-based service like MongoDB Atlas. Once your database is ready, you need to connect it to your Node.js application.

After updating your CRUD operations, testing each endpoint to ensure they interact correctly with MongoDB. I have used tool like Postman for testing API endpoints.
Test Each Endpoint:

Create a Book: Use the POST method to send a request to http://localhost:5000/books with a JSON body containing a book’s title and author. Check if the book is added correctly.
Get All Books: Send a GET request to http://localhost:5000/books and see if you receive a list of all books.
Get a Single Book: Use the GET method with a specific book ID in the URL. Ensure it returns the correct book.
Update a Book: Send a PUT request with updated data for a specific book ID. Verify if the book updates as expected.
Delete a Book: Use the DELETE method on a book’s endpoint and check if it gets removed from the list.

![crud post](https://github.com/Suruchi24Gupta/RESTful-API/assets/109841435/7c666c58-712f-418a-a46f-acf5b82e97bc)
![crud post 2](https://github.com/Suruchi24Gupta/RESTful-API/assets/109841435/5e533562-c273-41df-b9b0-1370bbd1cbeb)
![crud get](https://github.com/Suruchi24Gupta/RESTful-API/assets/109841435/f83872c8-99a1-47f5-a890-f42222c8812a)
![crud get a single](https://github.com/Suruchi24Gupta/RESTful-API/assets/109841435/4033e575-ffab-413d-bf25-c4b463ed88e5)
![crud put](https://github.com/Suruchi24Gupta/RESTful-API/assets/109841435/18e43beb-3033-4303-8cf2-a3e4f4e6b2ac)
![crud creating 3rd book](https://github.com/Suruchi24Gupta/RESTful-API/assets/109841435/7ea98b90-3642-4f9a-b01e-4947a1b8cb73)
![books crud](https://github.com/Suruchi24Gupta/RESTful-API/assets/109841435/43d4c885-1457-4b66-a227-7b7bce741e51)

Implementing Error Handling
Proper error handling involves catching and responding to errors in a meaningful way.
If you try to create a book without a title or author, Mongoose will throw an error.
Update and Delete Operations
Apply similar try-catch blocks to your update and delete operations. This ensures that any errors during these operations are caught and handled correctly.

Enhancing API Security
When it comes to API security, several common concerns need addressing. These include protecting against SQL injection (less relevant for NoSQL databases but still important to understand), cross-site scripting (XSS), and ensuring secure data transmission.

Implementing Security Best Practices
Use Helmet: Helmet is a middleware for Express that sets various HTTP headers to help protect your app from some well-known web vulnerabilities.
Using Environment Variables for Sensitive Data: Never hardcode sensitive information like database connection strings or API keys in your code. Use environment variables instead. You can manage these with packages like dotenv.
Rate Limiting: To protect against brute-force attacks, implement rate limiting. This limits the number of requests a user can make in a certain timeframe. 
