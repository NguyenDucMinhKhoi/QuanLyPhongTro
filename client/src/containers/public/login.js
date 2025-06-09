import React, { useState, useEffect } from "react";
import { InputForm, Button } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    name: "",
  });
  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    msg && Swal.fire("Opps!", msg, "error");
  }, [msg, update]);

  const handleSubmit = async () => {
    let finalPayload = isRegister
      ? payload
      : {
        phone: payload.phone,
        password: payload.password,
      };
    let invalids = validate(finalPayload);
    if (invalids === 0)
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload));
  };
  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach((item) => {
      if (item[1] === "") {
        setInvalidFields((prev) => [
          ...prev,
          {
            name: item[0],
            message: "You cannot leave this field blank.",
          },
        ]);
        invalids++;
      }
    });
    fields.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 8) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Password must be at least 8 characters.",
              },
            ]);
            invalids++;
          }
          break;
        case "phone":
          if (!+item[1]) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Invalid phone number.",
              },
            ]);
            invalids++;
          }
          break;

        default:
          break;
      }
    });
    return invalids;
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="login-container my-3 bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm">
        <h3 className="font-semibold text-2xl md-3">
          {isRegister ? "Sign up" : "Login"}
        </h3>
        <div className="w-full flex flex-col gap-3">
          {isRegister && (
            <InputForm
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              label={"Full Name"}
              value={payload.name}
              setValue={setPayload}
              keyPayload={"name"}
            />
          )}
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Phone Number"}
            value={payload.phone}
            setValue={setPayload}
            keyPayload={"phone"}
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Password"}
            value={payload.password}
            setValue={setPayload}
            keyPayload={"password"}
            type={"password"}
          />
          <Button
            text={isRegister ? "Sign up" : "Login"}
            bgColor="bg-secondary1"
            textColor="text-white"
            fullWidth
            onClick={handleSubmit}
          />

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              className="flex-1 flex items-center justify-center gap-2 bg-[#1877F2] text-white py-2 rounded-md hover:bg-[#1877F2]/90 transition-colors"
              onClick={() => {/* Handle Facebook login */ }}
            >
              <FaFacebookF size={20} />
              <span>Facebook</span>
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => {/* Handle Google login */ }}
            >
              <FcGoogle size={24} />
              <span className="font-medium">Google</span>
            </button>
          </div>
        </div>
        <div className="mt-7 flex items-center justify-between">
          {isRegister ? (
            <small>
              {" "}
              Already have an account?{" "}
              <span
                onClick={() => {
                  setIsRegister(false);
                  setPayload({
                    phone: "",
                    password: "",
                    name: "",
                  });
                }}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Login now
              </span>
            </small>
          ) : (
            <>
              <small className="text-[blue] hover:text-[red] cursor-pointer">
                Forgot your password?
              </small>
              <small
                onClick={() => {
                  setIsRegister(true);
                  setPayload({
                    phone: "",
                    password: "",
                    name: "",
                  });
                }}
                className="text-[blue] hover:text-[red] cursor-pointer"
              >
                Sign up
              </small>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
