import React from "react";

const FormLayout = ({ heading, formContent }) => (
  <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
    <div className="card card-signin my-5">
      <div className="card-body">
        <h5 className="card-title text-center">{heading}</h5>
        {formContent}
      </div>
    </div>
  </div>
);

export default FormLayout;
