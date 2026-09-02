import { redirect } from "next/navigation";

export const metadata = {
  title: "Create account | Eyeclimate",
  robots: { index: false, follow: false },
};
export default function SignupPage() {
  redirect("/login");
}
