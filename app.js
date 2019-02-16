// Getting all required packages

var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

// Pre-Configuration of variables

var port = 3000;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/productInventory", {
  useNewUrlParser: true
});
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

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
  AmountReceived: String
});

var product = mongoose.model("product", productSchema);

// Creating one document
// product.create(
//   {
//     status: "Item Available",
//     sku: "262428",
//     condition: "old",
//     clientCode: "abc",
//     brand: "Lewis",
//     modelNumber: "mwas223wq",
//     dimension: "3x3x6",
//     weight: "5",
//     quantity: "1",
//     title: "handbag", // max 64 char, min 10 char7
//     category: "clothing",
//     description: "String",
//     images: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//     listedPrice: "50",
//     sellingPrice: "60",
//     reserve: 25,
//     location: "Milton",
//     paymentMethod: "Cash", // "wireTransfer", "cash", "paypal", "cheque", "creditCard"
//     transactionDetails: "Successful",
//     AmountReceived: "60"
//   },
//   function(err, product) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Newly created Product- " + product);
//     }
//   }
// );

// Routes
// Landing Page
app.get("/", function(req, res) {
  res.render("landing");
});

//Index- show all products
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
  // var status = req.body.status;
  // var sku = req.body.sku;
  // var condition = req.body.condition;
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
  // var paymentMethod = req.body.parentMethod;
  // var transactionDetails = req.body.transactionDetails;
  // var AmountReceived = req.body.AmountReceived;
  var newProduct = {
    clientCode: clientCode,
    brand: brand,
    modelNumber: modelNumber,
    dimension: dimension,
    weight: weight,
    quantity: quantity,
    title: title, // max 64 char, min 10 char7
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

app.listen(port, function() {
  console.log("Server started on Port: " + port);
});
