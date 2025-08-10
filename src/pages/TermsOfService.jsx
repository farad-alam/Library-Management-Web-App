import React from "react";

export default function TermsOfService() {
  return (
    <section className="py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 border shadow-md rounded-md p-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Terms of Service
        </h1>
        <p className="text-gray-600 mb-6">
          By accessing and using LibraryHub, you agree to these terms and
          conditions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          1. Account Responsibilities
        </h2>
        <p className="text-gray-600">
          You are responsible for maintaining the confidentiality of your
          account and for all activities that occur under it.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          2. Borrowing Policy
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Each user can borrow a maximum of 3 books at a time</li>
          <li>Books must be returned by the due date to avoid penalties</li>
          <li>Damaged or lost books may incur replacement fees</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          3. Acceptable Use
        </h2>
        <p className="text-gray-600">
          You agree not to misuse our services, engage in fraudulent activities,
          or attempt to breach system security.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          4. Modifications to Service
        </h2>
        <p className="text-gray-600">
          We may modify or discontinue parts of our service at any time without
          prior notice.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          5. Termination
        </h2>
        <p className="text-gray-600">
          We reserve the right to suspend or terminate accounts that violate our
          terms.
        </p>

        <p className="mt-8 text-gray-600">
          For any questions regarding these terms, please contact us at{" "}
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
