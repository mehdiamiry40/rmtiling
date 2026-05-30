import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply to using the ${site.name} website and services.`,
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="May 2026">
      <p>
        These terms apply to your use of the {site.name} website and to any
        quote, booking or work carried out by {site.legalName}. By using our
        website or engaging our services, you agree to these terms.
      </p>

      <h2>Our services</h2>
      <p>
        We provide tiling, regrouting, waterproofing, leaking shower repairs and
        related renovation services across Melbourne. Descriptions of services
        on this website are for general information and may be updated at any
        time.
      </p>

      <h2>Quotes & pricing</h2>
      <p>
        Quotes are free and provided in writing. A quote is based on the
        information available at the time and the scope discussed. If site
        conditions or the agreed scope change, we will discuss any variation with
        you before proceeding. Quotes are valid for 30 days unless stated
        otherwise.
      </p>

      <h2>Bookings & payment</h2>
      <p>
        Work is scheduled by agreement. Payment terms are set out in your quote
        or invoice. Please raise any concerns about completed work with us
        promptly so we can put things right.
      </p>

      <h2>Workmanship guarantee</h2>
      <p>
        We stand behind our work with a workmanship guarantee and use quality,
        Australian-standard materials. Nothing in these terms limits any rights
        you have under the <em>Australian Consumer Law</em>, which apply in
        addition to our guarantee.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent permitted by law, our liability is limited to re-supplying
        the relevant services or the cost of having them re-supplied. We are not
        liable for pre-existing defects or issues outside the agreed scope of
        work.
      </p>

      <h2>Website content</h2>
      <p>
        The content on this website is owned by or licensed to us and is provided
        for general information only. You may not reproduce it without our
        permission.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of Victoria, Australia, and you
        submit to the jurisdiction of its courts.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
        <a href={site.phone.href}>{site.phone.display}</a>.
      </p>
    </LegalPage>
  );
}
