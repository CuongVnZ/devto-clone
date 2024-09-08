export default function Component() {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <img
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--dMdX_-dl--/c_imagga_scale,f_auto,fl_progressive,h_1920,q_auto,w_1920/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/8/dev-badge.png"
            alt="DEV Community"
            className="w-16 mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold">Join the DEV Community</h2>
          <p className="text-gray-600">
            DEV Community is a community of 1,772,187 amazing developers
          </p>
        </div>
        <div className="space-y-4">
          <button className="w-full bg-black text-white p-2 rounded-lg flex items-center justify-center">
            <i className="fab fa-apple mr-2"></i> Continue with Apple
          </button>
          <button className="w-full bg-gray-800 text-white p-2 rounded-lg flex items-center justify-center">
            <i className="fab fa-github mr-2"></i> Continue with GitHub
          </button>
          <button className="w-full bg-red-600 text-white p-2 rounded-lg flex items-center justify-center">
            <i className="fab fa-google mr-2"></i> Continue with Google
          </button>
        </div>
        <div className="mt-6 text-center text-gray-600">
          <p>OR</p>
        </div>
        <form className="space-y-4 mt-6">
          <input
            className="w-full p-2 border border-gray-300 rounded-lg"
            type="email"
            placeholder="Email"
          />
          <input
            className="w-full p-2 border border-gray-300 rounded-lg"
            type="password"
            placeholder="Password"
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button className="w-full bg-blue-600 text-white p-2 rounded-lg">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
