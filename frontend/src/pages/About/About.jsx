function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-6">
        About MediCare+
      </h1>

      <p className="text-center text-gray-600 max-w-3xl mx-auto">
        MediCare+ is a smart healthcare appointment system designed to
        connect patients with qualified doctors quickly and efficiently.
      </p>

      {/* MISSION */}
      <div className="grid md:grid-cols-2 gap-8 mt-10">

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-600">
            To simplify healthcare access by providing a digital platform
            where patients can easily find doctors, book appointments, and
            manage their medical visits online.
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-3">Our Vision</h2>
          <p className="text-gray-600">
            To become a leading digital healthcare platform that improves
            patient experience and reduces waiting time in hospitals worldwide.
          </p>
        </div>

      </div>

      {/* FEATURES */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-gray-50 p-5 rounded shadow">
            <h3 className="font-semibold">Easy Booking</h3>
            <p className="text-gray-600 text-sm mt-2">
              Book appointments in just a few clicks.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded shadow">
            <h3 className="font-semibold">Verified Doctors</h3>
            <p className="text-gray-600 text-sm mt-2">
              Only certified and experienced doctors.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded shadow">
            <h3 className="font-semibold">Secure System</h3>
            <p className="text-gray-600 text-sm mt-2">
              Your data is safe and encrypted.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default About;