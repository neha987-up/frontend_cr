module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: false,
    images: {
      domains: ["cr-backend.itechnolabs.tech", "picsum.photos"],
    },
    env: {
      BASE_URL: process.env.BASE_URL,
      STRIPE_PUBLISHABLE_KEY:
        "pk_test_51Q0LQORu4p1pmCRp7GJ1LVP63qHKRzMlKgXGiMXF3twNMNoU8xERILYZxreTZ1U0ATh6iqms5cFAhSMdxQBnL5B200i2DEgfRF",
    },
  };
  return nextConfig;
};
