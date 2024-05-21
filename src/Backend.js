// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "process.env.SESSION_SECRET",
  resave: false,
  saveUninitialized: false,
}));
app.use(cors({
  origin: '*',
  credentials: true,
}));

// Static file serving
const buildPath = path.join(__dirname, '../build');
app.use(express.static(buildPath));

// MongoDB connection
// const URI = "mongodb+srv://anusin1947:jpjrtIHYunFGumhX@pet-car-portal.sug01yj.mongodb.net/?retryWrites=true&w=majority&appName=pet-car-portal";
// const client = new MongoClient(URI, {
//   serverApi: {
//     version: '1',
//     strict: true,
//     deprecationErrors: true,
//   }
// });

async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb+srv://anusin1947:jpjrtIHYunFGumhX@pet-car-portal.sug01yj.mongodb.net/hack?retryWrites=true&w=majority&appName=pet-car-portal&ssl=true")
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connectToMongoDB();

// Mongoose models
const doctorSchema = new mongoose.Schema({
  docName: { type: String, required: true },
  docEmail: { type: String, required: true },
  docLicNo: { type: String, required: true },
  docPass: { type: String, required: true },
});
const Doctor = mongoose.model('Doctor', doctorSchema);

const customerSchema = new mongoose.Schema({
  cusName: { type: String, required: true },
  cusEmail: { type: String, required: true },
  cusContact: { type: String, required: true },
  cusPass: { type: String, required: true },
});
const Customer = mongoose.model('customer', customerSchema);

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  imagePath: { type: String, required: true },
});
const Food = mongoose.model('Food', foodSchema);

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  foodName: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  address: { type: String, required: true },
});
const Order = mongoose.model('Order', orderSchema);

const appointmentSchema = new mongoose.Schema({
  custId: { type: String, required: true },
  petName: { type: String, required: true },
  doctorName: { type: String, required: true },
  apptDate: { type: Date, required: true },
  reason: { type: String, required: true },
  completed: { type: Boolean, required: false },
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Routes
app.post('/addFood', async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file.');
    }

    const image = files.image;
    const oldPath = image[0].filepath;
    const ext = path.extname(image[0].originalFilename);
    const uploadTime = Date.now();
    const newFilename = `${uploadTime}${ext}`;
    const newPath = path.join(__dirname, 'uploads', newFilename);

    try {
      fs.copyFileSync(oldPath, newPath);
      const { name, quantity, price, type } = fields;
      const relativePath = path.relative(__dirname, newPath);

      const newFood = new Food({
        name: name[0],
        quantity: quantity[0],
        price: price[0],
        type: type[0],
        imagePath: relativePath,
      });

      await newFood.save();
      res.redirect('/addFood?param=upload');
    } catch (error) {
      console.error('Error moving file to destination:', error);
      res.status(500).send('Error moving file to destination.');
    }
  });
});

app.post('/DocRegister', async (req, res) => {
  const { docName, docEmail, docNum, docLicNo, docPass } = req.body;
  try {
    const existingDoctor = await Doctor.findOne({ docEmail });
    if (existingDoctor) {
      return res.redirect('/docRegister?param=old');
    }

    const newDoctor = new Doctor({ docName, docEmail, docLicNo, docNum, docPass });
    await newDoctor.save();
    res.redirect('/doclogin?param=reg');
  } catch (error) {
    console.error('Error saving doctor:', error);
    res.status(500).send('Error saving doctor.');
  }
});

app.post('/CusRegister', async (req, res) => {
  const { cusName, cusEmail, cusContact, cusPass } = req.body;
  try {
    const existingCustomer = await Customer.findOne({uname:cusEmail});
    if (existingCustomer) {
      return res.redirect('/cusRegister?param=old');
    }

    const newCustomer = new Customer({ cusName, cusEmail, cusContact, cusPass });
    await newCustomer.save();
    res.redirect('/cusLogin?param=reg');
  } catch (error) {
    console.error('Error saving customer:', error);
    res.status(500).send('Error saving customer.');
  }
});


app.post('/cusloginNode', async (req, res) => {
  console.log('Login');
  const { uname, pass } = req.body;
  try {
    const customer = await Customer.findOne({ cusEmail: uname, cusPass: pass });
    if (customer) {
      req.session.userId = customer._id;
      return res.redirect(`/cusHome?name=${encodeURIComponent(customer.cusName)}`);
    } else {
      return res.redirect('/cusLogin?param=invalid');
    }
  } catch (error) {
    console.error('Error during customer login:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/docloginNode', async (req, res) => {
  const { uname, pass } = req.body;
  try {
    const doctor = await Doctor.findOne({ docEmail: uname, docPass: pass });
    if (doctor) {
      req.session.userId = doctor._id;
      return res.redirect(`/docAppt?name=${doctor.docName}`);
    } else {
      return res.redirect('/docLogin?param=invalid');
    }
  } catch (error) {
    console.error('Error during doctor login:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    console.error('Error fetching food data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/addorder', async (req, res) => {
  const { foodName, quantity, totalPrice, address } = req.body;
  try {
    const newOrder = new Order({
      customerId: req.session.userId,
      foodName,
      quantity,
      totalPrice,
      address,
    });
    await newOrder.save();
    res.redirect('/buyFood?param=done');
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get-customer-id', (req, res) => {
  res.json({ customerId: req.session.userId });
});

app.get('/getdoctors', async (req, res) => {
  try {
    console.log('Fetched Doctors');
    const doctors = await Doctor.find({}, 'docName');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/createAppt", async (req, res) => {
  try {
    const { petName, doctorName, apptDate, reason } = req.body;

    const appointmentCount = await Appointment.countDocuments({
      doctorName: doctorName,
      apptDate: apptDate,
    });

    if (appointmentCount >= 1) {
      return res.redirect("/getDoctor?param=err");
    }

    const newAppointment = new Appointment({
      custId: req.session.userId,
      petName: petName,
      doctorName: doctorName,
      apptDate: apptDate,
      reason: reason,
      completed: false,
    });

    await newAppointment.save();
    res.redirect("/cusHome?param=success");
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve static files from the 'uploads' directory
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.session.userId });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find({ custId: req.session.userId });
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/adminorders", async (req, res) => {
  try {
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

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/ordersDelete/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    await Order.findByIdAndDelete(orderId);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/appointmentsDelete/:id", async (req, res) => {
  const appointmentId = req.params.id;
  try {
    await Appointment.findByIdAndDelete(appointmentId);
    res.status(204);
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/appointments/:name", async (req, res) => {
  const doctorName = req.params.name;
  try {
    console.log('Fecthing Appts :',doctorName);
    const appt=await Appointment.find({doctorName:doctorName});
    res.json(appt);
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/updateappointments/:id", async (req, res) => {
  console.log('Updated');
  const appointmentId = req.params.id;
  const { completed } = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { completed: completed },
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

