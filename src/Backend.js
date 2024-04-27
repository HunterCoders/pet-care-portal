const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");

const app = express();
const PORT = 3001;
// Serve static files from the 'uploads' directory
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/pet", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Schema Definitions
const docSchema = new mongoose.Schema({
  docName: { type: String, required: true },
  docEmail: { type: String, required: true },
  docLicNo: { type: String, required: true },
  docPass: { type: String, required: true },
});
const Doctor = mongoose.model("Doctor", docSchema);

const cusSchema = new mongoose.Schema({
  cusName: { type: String, required: true },
  cusEmail: { type: String, required: true },
  cusContact: { type: String, required: true },
  cusPass: { type: String, required: true },
});
const Customer = mongoose.model("Customer", cusSchema);

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  imagePath: { type: String, required: true },
});
const Food = mongoose.model("Food", foodSchema);

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  foodName: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  address: { type: String, required: true },
});

const Order = mongoose.model("Order", orderSchema);

app.post("/addFood", async (req, res) => {
  try {
    var form = new formidable.IncomingForm();

    // Parse the form data
    form.parse(req, async function (err, fields, files) {
      if (err) {
        console.error(err);
        res.status(500).send("Error uploading file.");
        return;
      }

      // File details
      console.log(files.image[0]);
      const image = files.image;
      const oldPath = image[0].filepath;
      const ext = path.extname(image[0].originalFilename);
      
      // Generate new filename with upload time
      const uploadTime = Date.now();
      const newFilename = `${uploadTime}${ext}`;
      
      const newPath = path.join(
        __dirname,
        "uploads",
        newFilename
      );

      // Move the file to a new location
      fs.copyFile(oldPath, newPath, async function (err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error moving file to destination.");
          return;
        }

        const { name, quantity, price, type } = fields;
        console.log(name[0]);

        const relativePath = path.relative(
          "D:\\MCA\\2nd Sem\\Full_Stack\\HackAthon\\pet\\pet-care\\src",
          newPath
        );
        // Create a new food document
        const newFood = new Food({
          name: name[0],
          quantity: quantity[0],
          price: price[0],
          type: type[0],
          imagePath: relativePath,
          uploadTime: uploadTime // Add upload time to food document
        });

        // Save the food document to the database
        await newFood.save();

        // Respond with success message
        res.redirect("http://localhost:3000/addFood?param=upload");
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/DocRegister", async (req, res) => {
  try {
    const { docName, docEmail, docNum, docLicNo, docPass } = req.body;

    const existingDoctor = await Doctor.findOne({ docEmail: docEmail });
    if (existingDoctor) {
      return res.redirect("http://localhost:3000/docRegister?param=old");
    }

    const newDoctor = new Doctor({
      docName: docName,
      docEmail: docEmail,
      docLicNo: docLicNo,
      docNum: docNum,
      docPass: docPass,
    });

    await newDoctor.save();
    res.redirect("http://localhost:3000/doclogin?param=reg");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error: Unable to save data");
  }
});

app.post("/CusRegister", async (req, res) => {
  try {
    const { cusName, cusEmail, cusContact, cusPass } = req.body;

    const existingCustomer = await Customer.findOne({ cusEmail: cusEmail });
    if (existingCustomer) {
      return res.redirect("http://localhost:3000/cusRegister?param=old");
    }

    const newCustomer = new Customer({
      cusName: cusName,
      cusEmail: cusEmail,
      cusContact: cusContact,
      cusPass: cusPass,
    });

    await newCustomer.save();
    res.redirect("http://localhost:3000/cusLogin?param=reg");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error: Unable to save data");
  }
});

app.post("/cusloginNode", async (req, res) => {
  try {
    const { uname, pass } = req.body;

    const customer = await Customer.findOne({ cusEmail: uname, cusPass: pass });
    if (customer) {
      req.session.userId = customer._id;
      console.log(req.session.userId);
      return res.redirect(
        `http://localhost:3000/cusHome?name=${customer.cusName}`
      );
    } else {
      return res.redirect("http://localhost:3000/cusLogin?param=invalid");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/docloginNode", async (req, res) => {
  try {
    const { uname, pass } = req.body;

    const doctor = await Doctor.findOne({ docEmail: uname, docPass: pass });
    if (doctor) {
      req.session.userId = doctor._id;
      return res.redirect(`http://localhost:3000/docAppt?name=${doctor.docName}`);
    } else {
      return res.redirect("http://localhost:3000/docLogin?param=invalid");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/foods", async (req, res) => {
  try {
    // Retrieve all food items from the database
    const foods = await Food.find();

    // Send the retrieved food data as a response
    res.json(foods);
  } catch (error) {
    console.error("Error fetching food data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/addorder", (req, res) => {
  // Retrieve order details from request body
  const foodName = req.body.foodName;
  const quantity = req.body.quantity;
  const totalPrice = req.body.totalPrice;
  const address = req.body.address;
  console.log(foodName);
  // Create a new order instance
  const newOrder = new Order({
    customerId: req.session.userId,
    foodName: foodName,
    quantity: quantity,
    totalPrice: totalPrice,
    address: address,
  });

  // Save the order to MongoDB
  newOrder
    .save()
    .then(() => {
      console.log("Order saved successfully");
      res.redirect("http://localhost:3000/buyFood?param=done");
    })
    .catch((error) => {
      console.error("Error saving order:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});
app.get("/get-customer-id", (req, res) => {
  const customerId = req.session.userId;
  res.json({ customerId });
});

app.get("/api/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find({}, "docName");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const appointmentSchema = new mongoose.Schema({
  custId:{type:String,required:true},
  petName: { type: String, required: true },
  doctorName: { type: String, required: true },
  apptDate: { type: Date, required: true },
  reason: { type: String, required: true },
  completed : {type:Boolean,required:false}
});
const Appointment = mongoose.model("Appointment", appointmentSchema);

// POST route to create a new appointment
app.post("/createAppt", async (req, res) => {
  try {
    console.log(req.session.userId);
    const { petName, doctorName, apptDate, reason } = req.body;

    // Check if the doctor already has more than one appointment on the given date
    const appointmentCount = await Appointment.countDocuments({
      doctorName: doctorName,
      apptDate: apptDate
    });

    console.log(appointmentCount);
    if (appointmentCount >= 1) {
      console.log('here');
      // If the doctor already has 5 or more appointments on the given date, redirect
      return res.redirect("http://localhost:3000/getDoctor?param=err");
    }

    // If the doctor has less than 5 appointments, proceed to create a new appointment
    const newAppointment = new Appointment({
      custId: req.session.userId,
      petName: petName,
      doctorName: doctorName,
      apptDate: apptDate,
      reason: reason,
      completed:false
    });

    // Save the new appointment
    await newAppointment.save();

    // Respond with success message
    return res.redirect("http://localhost:3000/cusHome?param=appt");
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Error creating appointment" });
  }
});
app.get("/orders", async (req, res) => {
  try {
    // Retrieve orders for the logged-in customer from the database
    console.log(req.session.userId );
    const orders = await Order.find({ customerId: req.session.userId });

    // Send the retrieved orders data as a response
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/appointments", async (req, res) => {
  try {
    // Retrieve appointments for the logged-in customer from the database
    const appointments = await Appointment.find({ custId: req.session.userId });

    // Send the retrieved appointments data as a response
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//admin orders
app.get("/adminorders", async (req, res) => {
  try {
    // Retrieve orders data along with customer details from the database
    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
    ]);

    // Send the retrieved orders data as a response
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/ordersDelete/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    // Delete the order from the database
    await Order.findByIdAndDelete(orderId);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Assuming you have the necessary imports and setup for Express and Mongoose


// Route to fetch appointments by doctor's name
app.get("/appointments/:doctorName", async (req, res) => {
  const doctorName = req.params.doctorName;

  try {
    // Fetch appointments data for the specified doctorName from the database
    const appointments = await Appointment.find({ doctorName });

    // Send the appointments data as a response
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/appointmentsDelete/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;

    // Find the appointment by ID and delete it
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error canceling appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/updateappointments/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    // Find the appointment by ID in the database
    const appointment = await Appointment.findById(id);

    // If the appointment is not found, return a 404 error
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Update the appointment's completed status
    appointment.completed = true;

    // Save the updated appointment to the database
    await appointment.save();

    // Return a success message
    res.sendStatus(204);
  } catch (error) {
    console.error("Error marking appointment as complete:", error);
    // Return an error response
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/delorders/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    // Find the order by ID and delete it
    await Order.findByIdAndDelete(orderId);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/adminapi/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find({}, "docName docEmail docLicNo");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//adminAppointments
// Route to fetch appointments for a specific customer
app.get("/adminapi/appointments", async (req, res) => {
  try {
    // Retrieve appointments for the logged-in customer from the database
    const appointments = await Appointment.find({});

    // Send the retrieved appointments data as a response
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
