var mongoose = require('mongoose');
// creating schema
var employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  eType: String,
  hourRate: Number,
  totalHours: Number
});

employeeSchema.methods.getSalary = function () {
  console.log('The total Salary %s Rs. %d ', this.name, this.hourRate * this.totalHours);
};

// creating model
var employeeModel = mongoose.model('Employee', employeeSchema);

// model object
var employee = new employeeModel({
  name: 'Ali',
  email: 'abdulmuqsit10101@gmail.com',
  eType: 'Web Developer',
  hourRate: 8,
  totalHours: 16
});

employee.getSalary();
