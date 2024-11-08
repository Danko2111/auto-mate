import ClientLayout from "../components/ClientLayout";
import { authOptions } from "./api/auth/[...nextauth]/route";
import "./globals.css";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Auto-Mate",
  description:
    "Automate makes car management hassle-free. Receive maintenance reminders, log services, and keep your vehicles in top shape—all from a single, easy-to-use application.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <ClientLayout session={session}>{children}</ClientLayout>
      </body>
    </html>
  );
}
