// var express = require("express");
// var bodyParser = require("body-parser");
// var app = express();
// var mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const session = require("express-session");
// // const blogRoutes = require("./blogRoutes");
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(
//   session({
//     secret: "your_secret_key",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// mongoose.connect("mongodb://127.0.0.1:27017/pet");


// var nme = "";
// var ide="";

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
//     return res.status(200).json({});
//   }
//   next();
// });

// // const model = mongoose.model("registerModel", reg);

// app.use(express.urlencoded({ extended: false }));

// const docSchema = new mongoose.Schema({
//   docName: { type: String, required: true },
//   docEmail: { type: String, required: true },
//   docLicNo: { type: String, required: true },
//   docPass: { type: String, required: true}
// });
// const Doctor = mongoose.model('Doctor', docSchema);

// app.post("/DocRegister", async function (req, res) {
//   console.log("Req:"+ req.body);
//   var docName = req.body.docName;
//   var docEmail = req.body.docEmail;
//   var docNum = req.body.docNum;
//   var docLicNo = req.body.docLicNo;
//   var docPass = req.body.docPass;

//   var x = await Doctor.findOne({ docEmail: req.body.docEmail }, {});
//   if (x) {
//     console.log("here");
//     res.redirect("http://localhost:3000/register?param=old");
//   } else {
//     var docReg = new Doctor({
//       docName: docName,
//       docEmail: docEmail,
//       docLicNo: docLicNo,
//       docNum: docNum,
//       docPass: docPass,
//     });

//     docReg
//       .save()
//       .then((doc) => {
//         console.log(doc);
//         // Redirect to the login page in your React application
//         res.redirect("http://localhost:3000/login?param=reg");
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).send("Error: Unable to save data"); // Handle error
//       });
//   }
// });

// const cusSchema = new mongoose.Schema({
//   cusName: { type: String, required: true },
//   cusEmail: { type: String, required: true },
//   cusContact: { type: String, required: true },
//   cusPass: { type: String, required: true}
// });
// const Customer = mongoose.model('Customer', cusSchema);

// app.post("/CusRegister", async function (req, res) {
//   var cusName = req.body.cusName;
//   var cusEmail = req.body.cusEmail;
//   var cusContact = req.body.cusContact;
//   var cusPass = req.body.cusPass;

//   var x = await Customer.findOne({ uname: req.body.docEmail }, {});
//   if (x) {
//     console.log("here");
//     res.redirect("http://localhost:3000/register?param=old");
//   } else {
//     var cusReg = new Customer({
//       cusName: cusName,
//       cusEmail: cusEmail,
//       cusContact: cusContact,
//       cusPass: cusPass,
//     });

//     cusReg
//       .save()
//       .then((doc) => {
//         console.log(doc);
//         // Redirect to the login page in your React application
//         res.redirect("http://localhost:3000/login?param=reg");
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).send("Error: Unable to save data"); // Handle error
//       });
//   }
// });

// app.post("/loginNode", async function (req, res) {
//   var docEmail = req.body.docEmail;
//   var docPass = req.body.docPass;

//   var x = await Doctor.findOne({ docEmail: docEmail, docPass: docPass }, {});
//   if (x) {
//     var nm = x.docName;
//     var id=x._id;
//     nme = nm;
//     ide=id;
//     console.log(ide);
//     res.redirect("http://localhost:3000/hackathon?name=" + nm);
//   } else {
//     res.redirect("http://localhost:3000/hackathon/login?param=invalid");
//   }
// });

// app.get("/getSession", async function (req, res) {
//   req.session.name = nme;
//   req.session.id = ide;
//   req.session.save();
//   res.send(req.session);
// });

// // const blogSchema = new mongoose.Schema({
// //   userId: { type: String, required: true },
// //   content: { type: String, required: true },
// //   createdAt: { type: Date, default: Date.now }
// // });
// // const Blog = mongoose.model('Blog', blogSchema);

// app.post('/createBlogPost', async (req, res) => {
//   console.log(req+"gsdg");
// try {
//   const userId = req.session.id; // Retrieve user ID from session
//   const content =  req.body.content;
//   console.log(content);
//   const blogPost = new Blog({ userId, content });
//   await blogPost.save();
//   res.status(201).json({ message: 'Blog post created successfully' });
// } catch (error) {
//   res.status(500).json({ error: error.message });
// }
// });

// app.get('/api/doctors', async (req, res) => {
//   try {
//     const doctors = await Doctor.find({}, 'docName');
//     res.json(doctors);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// const appointmentSchema = new mongoose.Schema({
//   petName: {type: String,required: true},
//   doctorName: {type: String,required: true},
//   apptDate: {type: Date,required: true},
//   reason: {type: String,required: true}
// });

// module.exports = mongoose.model('Appointment', appointmentSchema);

// // POST route to create a new appointment
// app.post('/api/appointments', async (req, res) => {
//   try {
//     const { petName, doctorName, apptDate, reason } = req.body;

//     const newAppointment = new Appointment({
//       petName,
//       doctorName,
//       apptDate: new Date(apptDate),
//       reason,
//     });

//     await newAppointment.save();

//     res.status(201).json({ message: 'Appointment created successfully' });
//   } catch (error) {
//     console.error('Error creating appointment:', error);
//     res.status(500).json({ message: 'Error creating appointment' });
//   }
// });


// module.exports = router;

// app.listen(3001);