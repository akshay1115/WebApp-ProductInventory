// Getting all required packages

var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override");

// Pre-Configuration of variables

var port = 3000;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/productInventory", {
  useNewUrlParser: true
});
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// DB Schema Setup

var productSchema = new mongoose.Schema({
  status: String, //"pendingList", "itemAvailable", "ItemSold", "PendingPayment" , "SellerPayoutCompleted"
  sku: Number,
  condition: String, // new or used
  clientCode: String,
  brand: String,
  modelNumber: String,
  dimension: String,
  weight: Number,
  quantity: Number,
  title: String, // max 64 char, min 10 char7
  category: String,
  description: String,
  images: String,
  listedPrice: Number,
  sellingPrice: Number,
  reserve: Number,
  location: String,
  paymentMethod: String, // "wireTransfer", "cash", "paypal", "cheque", "creditCard"
  transactionDetails: String,
  amountReceived: String
});

var product = mongoose.model("product", productSchema);

// =======================================================
//                        Routes
// =======================================================

// Landing Page

app.get("/", function(req, res) {
  res.render("landing");
});

//Index- show all products (Inventory)

app.get("/products", function(req, res) {
  product.find({}, function(err, allProducts) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { products: allProducts });
    }
  });
});

//Create- add new product to DB through form

app.post("/products", function(req, res) {
  // get data from form and add to DB
  var status = "Item Available";
  var sku = req.body.sku;
  var clientCode = req.body.cc;
  var brand = req.body.brand;
  var modelNumber = req.body.modelNo;
  var dimension = req.body.dimension;
  var weight = req.body.weight;
  var quantity = req.body.quantity;
  var title = req.body.title;
  var category = req.body.category;
  var description = req.body.description;
  var images = req.body.image;
  var listedPrice = req.body.lp;
  var sellingPrice = req.body.sp;
  var reserve = req.body.reserve;
  var location = req.body.location;

  //creating DB object
  var newProduct = {
    status: status,
    sku: sku,
    clientCode: clientCode,
    brand: brand,
    modelNumber: modelNumber,
    dimension: dimension,
    weight: weight,
    quantity: quantity,
    title: title,
    category: category,
    description: description,
    images: images,
    listedPrice: listedPrice,
    sellingPrice: sellingPrice,
    reserve: reserve,
    location: location
  };

  // Create new product and save to db
  product.create(newProduct, function(err, newlyCreatedProduct) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/products");
    }
  });
});

// Show multistep form to create new product

app.get("/products/new", function(req, res) {
  res.render("new");
});

// Show more info about one product

app.get("/products/:id", function(req, res) {
  //find the product with provided ID
  product.findById(req.params.id, function(err, foundProduct) {
    if (err) {
      console.log(err);
    } else {
      //render show template with that product
      res.render("show", { product: foundProduct });
    }
  });
});

//Edit route

app.get("/products/:id/edit", function(req, res) {
  product.findById(req.params.id, function(err, editProduct) {
    if (err) {
      alert("Wrong ID");
      res.redirect("/products");
    } else {
      res.render("edit", { product: editProduct });
    }
  });
});

//Update Route

app.put("/products/:id", function(req, res) {
  var clientCode = req.body.cc;
  var brand = req.body.brand;
  var modelNumber = req.body.modelNo;
  var dimension = req.body.dimension;
  var weight = req.body.weight;
  var quantity = req.body.quantity;
  var title = req.body.title;
  var category = req.body.category;
  var description = req.body.description;
  var images = req.body.image;
  var listedPrice = req.body.lp;
  var sellingPrice = req.body.sp;
  var reserve = req.body.reserve;
  var location = req.body.location;

  //creating DB object
  var updatedProduct = {
    clientCode: clientCode,
    brand: brand,
    modelNumber: modelNumber,
    dimension: dimension,
    weight: weight,
    quantity: quantity,
    title: title,
    category: category,
    description: description,
    images: images,
    listedPrice: listedPrice,
    sellingPrice: sellingPrice,
    reserve: reserve,
    location: location
  };

  product.findByIdAndUpdate(req.params.id, updatedProduct, function(
    err,
    updatedProduct
  ) {
    if (err) {
      res.redirect("/products");
    } else {
      res.redirect("/products/" + req.params.id);
    }
  });
});

//Delete route

app.delete("/products/:id", function(req, res) {
  product.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/products");
      alert("There was a problem deleting the product");
    } else {
      res.redirect("/products");
    }
  });
});

// Port

app.listen(port, function() {
  console.log("Server started on Port: " + port);
});
