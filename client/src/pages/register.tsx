import { FormEvent, useState } from "react";
import Axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuthState } from "../context/auth";

import InputGroup from "../components/InputGroup";

export default function Home() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const { authenticated } = useAuthState();

  const router = useRouter();
  if (authenticated) router.push("/");

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    if (!agreement) {
      setErrors({ ...errors, agreement: "You must agree to T&Cs" });
      return;
    }

    try {
      await Axios.post("/auth/register", {
        email,
        password,
        username,
      });

      router.push("/login");
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex bg-white">
      <Head>
        <title>Register</title>
      </Head>

      <div
        className="h-screen bg-center bg-cover w-36 "
        style={{ backgroundImage: "url('/images/bricks.jpg')" }}></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Sign up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form className="mb-6" onSubmit={submitForm}>
            <input
              type="checkbox"
              className="mr-1 cursor-pointer"
              id="agreement"
              checked={agreement}
              onChange={(e) => setAgreement(e.target.checked)}
            />
            <label className="text-sm cursor-pointer" htmlFor="agreement">
              I agree to get email about cool stuff on iReadit
            </label>
            <small className="block font-medium text-red-600">
              {errors.agreement}
            </small>
            <InputGroup
              className="mb-2"
              error={errors.email}
              placeholder={"EMAIL"}
              setValue={setEmail}
              type="email"
              value={email}
            />
            <InputGroup
              className="mb-2"
              error={errors.username}
              placeholder={"USERNAME"}
              setValue={setUsername}
              type="text"
              value={username}
            />
            <InputGroup
              className="mb-4"
              error={errors.password}
              placeholder={"PASSWORD"}
              setValue={setPassword}
              type="password"
              value={password}
            />
            <button className="w-full py-3 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded">
              Register
            </button>
          </form>
          <small>
            Already an iReaditor?
            <Link href="/login">
              <a className="ml-1 font-bold text-blue-500 uppercase"> Log In</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
