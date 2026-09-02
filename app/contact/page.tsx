import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact | Eyeclimate",
  description:
    "Tell Eyeclimate about your project, research question, or Earth observation needs.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
