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
  headers: () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
};

export default nextConfig;
