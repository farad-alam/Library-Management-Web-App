import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="py-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact US</h1>
          <p className="text-lg text-gray-600">
            Have a question, feedback, or need assistance? We’d love to hear
            from you.
          </p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-all"
            >
              Send Message
            </button>
          </form>

          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>
              Email:{" "}
              <a
                href="mailto:support@libraryhub.com"
                className="text-primary-600 hover:underline"
              >
                support@libraryhub.com
              </a>
            </p>
            <p>Phone: +880 123 456 789</p>
          </div>
        </div>
      </div>
    </section>
  );
}
