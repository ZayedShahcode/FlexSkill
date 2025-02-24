import { useNavigate } from "react-router-dom";
import { getUser } from "../context/UserContext";

export const Login = () => {
  const { email, password, setEmail, setPassword, verifyCookie } = getUser();
  const navigate = useNavigate();
  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/sign/", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const { token } = await response.json();
    if (token) {
      localStorage.setItem("token", token);
      verifyCookie();
      alert("Login Successful");
      setTimeout(() => {
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      }, 1000);
    } else {
      alert("Incorrect Credentials");
    }
  };
  return (
    <div className="grid place-items-center my-24">
      <form
        className="border border-stone-800 flex flex-col items-center gap-6 w-96 h-96"
        onSubmit={handleOnSubmit}
      >
        <h1 className="text-4xl">Login</h1>
        <label>Email </label>{" "}
        <input
          type="email"
          name="email"
          id="email"
          className="border border-stone-800"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password </label>{" "}
        <input
          type="password"
          name="password"
          id="password"
          className="border border-stone-800"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit" className="border border-stone-800 ">
          Submit
        </button>
      </form>
    </div>
  );
};
