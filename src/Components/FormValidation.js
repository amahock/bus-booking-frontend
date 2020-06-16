import React from "react";


const validateForm = (email,password,firstName,lastName,phoneNumber,errors) => {
  // let fields = this.state.fields;
  // let errors = {};
  let formIsValid = true;
  console.log("entered into validate form : "+ firstName);

  if (!firstName) {
    formIsValid = false;
    errors.firstnameErr = "*Please enter your firstName.";
  }

  if (typeof firstName !== "undefined") {
    if (!firstName.match(/^[a-zA-Z ]*$/)) {
      formIsValid = false;
      errors.firstnameErr = "*Please enter alphabet characters only.";
    }
  }
  if (!lastName) {
    formIsValid = false;
    errors.lastnameErr = "*Please enter your lastName.";
  }

  if (typeof lastName !== "undefined") {
    if (!lastName.match(/^[a-zA-Z ]*$/)) {
      formIsValid = false;
      errors.lastnameErr = "*Please enter alphabet characters only.";
    }
  }

  if (!email) {
    formIsValid = false;
    errors.emailErr = "*Please enter your email-ID.";
  }

  if (typeof email !== "undefined") {
    //regular expression for email validation
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      formIsValid = false;
      errors.emailErr = "*Please enter valid email-ID.";
    }
  }

  if (!phoneNumber) {
    formIsValid = false;
    errors.phonenumberErr = "*Please enter your mobile no.";
  }

  if (typeof phoneNumber !== "undefined") {
    if (!phoneNumber.match(/^[0-9]{10}$/)) {
      formIsValid = false;
      errors.phonenumberErr = "*Please enter valid mobile no.";
    }
  }

  if (!password) {
    formIsValid = false;
    errors.passwordErr = "*Please enter your password.";
  }

  if (typeof password !== "undefined") {
    if (!password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
      formIsValid = false;
      errors.passwordErr = "*Please enter secure and strong password.";
    }
  }

const result = {formIsValid,errors};
console.log("validationform component : "+result.formIsValid);
  return result;
};

export default validateForm;