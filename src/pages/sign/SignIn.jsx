import "./style.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate  } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const[regName, setRegName] = useState('')
  const[regSurname, setRegSurname] = useState('')
  const[regPassword, setRegPassword] = useState('')
  const[regMale, setRegMale] = useState('')
  const[regEmail, setRegEmail] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://ec2-18-183-121-110.ap-northeast-1.compute.amazonaws.com:9999/api/v1/auth/authenticate",
        { email, password },
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Handle successful login
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/user');
      })
      .catch((error) => {
        // Handle login error
        console.error(error);
      });
  };
  const handleRegNameChange = (event) => {
    setRegName(event.target.value);
  };
  const handleRegEmailChange = (event) => {
    setRegEmail(event.target.value);
  };
  const handleRegSurnameChange = (event) => {
    setRegSurname(event.target.value);
  };
  const handleRegPasswordChange = (event) => {
    setRegPassword(event.target.value);
  };
  const handleRegMale = () => {
    setRegMale('Qadın')
  }
  const handlRegMale2 = () => {
    setRegMale('Kişi')
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(regName, regSurname, regPassword , regMale, regEmail);
    axios
      .post(
        "http://ec2-18-183-121-110.ap-northeast-1.compute.amazonaws.com:9999/api/v1/auth/register",
        { regName, regSurname, regEmail, regPassword},
      )
      .then((response) => {
        // Handle successful login
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/user');
      })
      .catch((error) => {
        // Handle login error
        console.error(error);
      });
  };
  return (
    <section>
      <div className="container">
        <div className="log-reg">
          <div className="log-reg-box">
            <div className="log-reg-top">
              <div className="log-top">
                <a href="">Giris</a>
              </div>
              <div className="reg-top">
                <a href="">Qeydiyyat</a>
              </div>
            </div>
            <div className="log-body">
              <form action="" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="uname">
                    <b>Email</b>
                  </label>{" "}
                  <br />
                  <input
                    type="email"
                    name="uname"
                    required
                    onChange={handleEmailChange}
                  />
                </div>
                <div>
                  <label htmlFor="psw">
                    <b>Şifrə</b>
                  </label>{" "}
                  <br />
                  <input
                    type="password"
                    name="psw"
                    required
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="log-body-in-btn">
                  <button>
                    <div className="anotherdiv" onClick={handleLogin}>
                      Giris
                    </div>
                  </button>
                </div>
              </form>
            </div>
            <div className="reg-body">
              <form action="">
                <div>
                  <label htmlFor="uname">
                    <b>Ad</b>
                  </label>{" "}
                  <br />
                  <input type="text" name="uname" onChange={handleRegNameChange} required />
                </div>
                <div>
                  <label htmlFor="psw">
                    <b>Soyad</b>
                  </label>{" "}
                  <br />
                  <input type="text" name="psw" onChange={handleRegSurnameChange} required />
                </div>
                <div>
                  <label htmlFor="uname">
                    <b>Email</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="uname"
                    required
                    onChange={handleRegEmailChange}
                  />
                </div>
                <div>
                  <label htmlFor="psw">
                    <b>Şifrə</b>
                  </label>{" "}
                  <br />
                  <input type="password" name="psw" onChange={handleRegPasswordChange} required />
                </div>
              
                <div>
                  <label htmlFor="uname">
                    <b>Cinsiyyət</b>
                  </label>
                  <div className="gender_all">
                  <div className="gender_div">
                     <label htmlFor="uname">
                        <b>Qadın</b>
                      </label>
                      <input type="radio" name="gender" onChange={handleRegMale} />
                  </div>
                  <div className="gender_div">
                     <label htmlFor="uname">
                        <b>Kişi</b>
                      </label>
                      <input type="radio" name="gender" onChange={handlRegMale2}/>
                  </div>
                  </div>
                  
                  
                  
                </div>
                <div className="log-body-in-btn">
                  <button>
                    <div className="anotherdiv" onClick={handleRegister}>Qeydiyyat</div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
