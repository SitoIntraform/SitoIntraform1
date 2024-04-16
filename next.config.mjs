/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/admin/dashboard",
  //       destination: "/admin/dashboard",
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
