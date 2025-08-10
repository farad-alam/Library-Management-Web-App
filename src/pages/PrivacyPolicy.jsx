import React from "react";

export default function PrivacyPolicy() {
  return (
    <section className="py-32 min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 border shadow-md rounded-md p-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-6">
          At LibraryHub, we respect your privacy and are committed to protecting
          the personal information you share with us.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Information We Collect
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Name, email address, and phone number during registration</li>
          <li>Login credentials for account security</li>
          <li>Borrowing history and preferences</li>
          <li>Device and browser information for analytics</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          How We Use Your Information
        </h2>
        <p className="text-gray-600 mb-4">Your data helps us:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Provide, operate, and improve our services</li>
          <li>Track borrowed books and return dates</li>
          <li>Send important updates and notifications</li>
          <li>Enhance security and prevent fraud</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Data Security
        </h2>
        <p className="text-gray-600">
          We implement industry-standard security measures to safeguard your
          data and never sell your personal information to third parties.
        </p>

        <p className="mt-8 text-gray-600">
          If you have questions about our Privacy Policy, please contact us at{" "}
          <a
            href="mailto:support@libraryhub.com"
            className="text-primary-600 hover:underline"
          >
            support@libraryhub.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
