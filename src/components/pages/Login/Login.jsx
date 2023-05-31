// import React from 'react';
import { useContext, useEffect,  useState } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { AuthContext } from "../../Privider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Login = () => {

  const [disabled, setDisabled] = useState(true);
  const { login } = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(4);
  }, []);

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
        setDisabled(false);
    }
    else {
        setDisabled(true)
    }
}

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    login(email,password)
      .then(result => {
        const user = result.user
        console.log(user)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User created successfully.',
          showConfirmButton: false,
          timer: 1500
        });
        navigate(from, { replace: true });
    })
  };
  
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />
                
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  disabled={disabled}
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p><small>New Here? Create an account <Link to="/signup">Create an Account</Link> </small></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;