This dummy blog website can perform CRUD operations on the database linked to it and display the data on the webpage.
The database folder contains the blogs.db file is a database file storing the table containing the blog website's entries. This file is used to store the insertion and updating of new blogs and the deletion of blogs.
The public folder contains index.html and style.css. The HTML file is the basic framework of the website, containing forms, headers, and paragraphs to display the content and allow the user to interface with CRUD operations. The CSS file is used for beautification of the webpage. (Not much attention has been given to the CSS aspect of the project; the primary focus was implementing the CRUD operations)
The app.js file is the javascript file, which is the main component of the backend. It connects the database to the webpage and handles the logic of the blog website.

P.S. After performing an operation using any of the provided forms, you need to traverse back to the login page and refresh it to see the updated blogs.
