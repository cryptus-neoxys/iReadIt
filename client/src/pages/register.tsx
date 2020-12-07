import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="w-40 h-screen bg-center bg-cover"
        style={{ backgroundImage: "url('/images/bricks.jpg')" }}></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Sign up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form className="mb-6">
            <input
              type="checkbox"
              className="mr-1 cursor-pointer"
              id="agreement"
            />
            <label className="text-sm cursor-pointer" htmlFor="agreement">
              I agree to get email about cool stuff on iReadit
            </label>
            <div className="mb-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-400 rounded focus:outline-none"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-400 rounded focus:outline-none"
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-400 rounded focus:outline-none"
              />
            </div>
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
