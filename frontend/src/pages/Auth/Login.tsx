import React, { useState } from "reactn";
import TransitionMotion from "../../components/Route/Motion";
import LoginTemplate from "components/Auth/Login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <TransitionMotion>
      <LoginTemplate
        email={email}
        password={password}
        remember={remember}
        errors={errors}
        loading={loading}
        setEmail={setEmail}
        setPassword={setPassword}
        setRemember={setRemember}
        setErrors={setErrors}
        setLoading={setLoading}
      />
    </TransitionMotion>
  );
}
