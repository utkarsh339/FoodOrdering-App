function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-center text-orange-600 mb-2">
          🍔 Food Ordering
        </h1>
        <h2 className="text-lg font-semibold text-center mb-6">{title}</h2>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
