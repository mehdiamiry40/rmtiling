import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your personal information.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="May 2026">
      <p>
        {site.legalName} ("{site.name}", "we", "us" or "our") respects your
        privacy and is committed to protecting your personal information in
        accordance with the Australian Privacy Principles under the{" "}
        <em>Privacy Act 1988</em> (Cth). This policy explains what we collect,
        why, and how we handle it.
      </p>

      <h2>Information we collect</h2>
      <p>
        We collect the information you provide when you contact us or request a
        quote, including your <strong>name, phone number, email address,
        suburb</strong> and any <strong>project details</strong> you share. When
        you visit our website we may also collect anonymous, aggregated usage
        data (such as pages viewed and approximate location) to help us improve
        the site.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your enquiry and prepare your quote.</li>
        <li>To arrange, carry out and follow up on work you book with us.</li>
        <li>To send information you've requested about our services.</li>
        <li>To improve our website and customer experience.</li>
      </ul>

      <h2>Disclosure</h2>
      <p>
        We do not sell or rent your personal information. We may share it with
        trusted service providers who help us operate our business (for example,
        hosting, email or scheduling tools), and only as needed to provide our
        services to you, or where required by law.
      </p>

      <h2>Cookies & analytics</h2>
      <p>
        Our website uses privacy-friendly, cookieless analytics to understand
        how visitors use the site. This data is aggregated and does not identify
        you personally.
      </p>

      <h2>Storage & security</h2>
      <p>
        We take reasonable steps to protect your information from misuse, loss
        and unauthorised access. We keep your information only for as long as
        needed for the purposes described above or as required by law.
      </p>

      <h2>Your rights</h2>
      <p>
        You may request access to, or correction of, the personal information we
        hold about you, or make a privacy complaint, by contacting us. We will
        respond within a reasonable time.
      </p>

      <h2>Contact us</h2>
      <p>
        For any privacy questions or requests, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>
        {site.phone.href && (
          <>
            {" "}
            or call <a href={site.phone.href}>{site.phone.display}</a>
          </>
        )}
        .
      </p>
    </LegalPage>
  );
}
