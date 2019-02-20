MEN (MongoDB + Express + Node.js) app for CRUD operations



app.js- Base node.js server file, containing all routes

views/landing.ejs- Landing/Starting Page of the webapp containing navbars, different sections such as About, Contact

views/index.ejs- Click on Inventory on the navbar to open table of products with information. It has a responsive table with sorting and searching enabled

views/show.ejs- Shows more detailed information about a product when you click on its title from the table

views/new.ejs- Multistep form that takes in data from user and creates a new product

views/edit.ejs- enables the user to edit & update and delete a particular product from the inventory



All the static files are located in public directory

Restful Routing is done

Mongoose is used to connect the app to MongoDB

