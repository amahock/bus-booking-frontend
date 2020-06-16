import React,{useEffect, useState} from "react";
import { useParams,useHistory } from "react-router-dom";
import networkRequests from "../Utils/networkRequests";
import {routes} from "../Routes/routes";

const VerifyEmailPage = () =>{
  const { token } = useParams();
  const history = useHistory();

  const [isEmailVerified,setIsEmailVerified] = useState(false);
  const [emailVerificationErr,setEmailVerificationErr] = useState("");

  useEffect(() => {

    console.log("Inside Useeffect : " + token);
    networkRequests("/signUp/verifyEmail", "POST", {
      emailVerificationToken: token
    })
      .then(response => {
        // console.log(response.message);
        if (response.message === "email verified") {
          setIsEmailVerified(true);
        } else {
          setIsEmailVerified(false);
          setEmailVerificationErr(response.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

if(isEmailVerified){
  return(
    <div>
    <h3>Email verified successfully</h3>
    <button className="btn btn-success"
    onClick={()=>history.push(routes.login)}
    >Login</button>
    </div>
  )
  }
  else{
    return (
      <div>
    <h3>There is some problem in email verification. Please register again with the below link.</h3>
    <button className="btn btn-primary"
    onClick={()=>history.push(routes.signUp)}
    >SignUp</button>
        </div>
    )
  }
}

export default VerifyEmailPage;