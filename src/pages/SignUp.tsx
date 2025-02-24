import { useNavigate } from "react-router-dom";
import { getUser } from "../context/UserContext";

interface SignUpResponse {
  message: string;
  token: string;
  success: boolean;
}

export const SignUp = () => {
  const { email, username, password, setEmail, setUsername, setPassword } =
    getUser();
  const navigate = useNavigate();

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/sign/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data: SignUpResponse = await response.json();
      console.log(data);

      if (data.success) {
        localStorage.setItem("token", data.token);

        setTimeout(() => {
          alert("User registered successfully");
          setEmail("");
          setPassword("");
          setUsername("");
          navigate("/dashboard");
        }, 1000);
      } else {
        throw new Error("Cannot Login");
      }
    } catch (error) {
      alert("Error occurred during sign-up");
    }
  };

  return (
    <div className="grid place-items-center my-24">
      <form
        className="border border-stone-800 flex flex-col items-center gap-6 w-96 h-96"
        onSubmit={handleOnSubmit}
      >
        <h1 className="text-4xl">Sign-Up</h1>
        <label>UserName </label>
        <input
          type="text"
          name="username"
          id="username"
          className="border border-stone-800"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Email </label>
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
        <label>Password </label>
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
