const Dashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">

      <h2 className="text-2xl font-bold mb-6">
        My Dashboard
      </h2>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-xl font-bold">12</h3>
          <p>Referrals</p>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-xl font-bold">₹1,200</h3>
          <p>Earnings</p>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-xl font-bold">3</h3>
          <p>Listings</p>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-xl font-bold">₹500</h3>
          <p>Wallet</p>
        </div>

      </div>

      {/* REFERRAL LINK */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <p className="text-gray-600 mb-2">Your Referral Link</p>
        <input
          value="https://zameense.com/signup?ref=123"
          readOnly
          className="w-full border p-2 rounded"
        />
      </div>
      

    </div>
  );
};

export default Dashboard;