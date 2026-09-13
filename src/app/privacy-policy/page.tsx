import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Cedar Vertex",
  description:
    "Privacy Policy for Cedar Vertex, a Bristol-based technology and digital services business.",
};

const businessEmail = "hello@cedarvertex.com";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-bg text-ink">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16 lg:px-10">
          <article className="space-y-8 text-ink-soft">
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-accent-dark">
              Cedar Vertex
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-sm text-ink-soft">Last updated: 13 September 2026</p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Introduction</h2>
              <p>
                Cedar Vertex respects your privacy and is committed to handling
                personal information responsibly, transparently and in line with
                applicable data protection laws and good practice.
              </p>
              <p>
                This Privacy Policy explains what information we collect through
                this website, how we use it, how we protect it, and the choices you
                have in relation to your personal data.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Information we collect</h2>
              <p>
                We may collect personal information that you provide to us directly,
                including:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Your name, email address and company details when you contact us.</li>
                <li>Project details or enquiry information you provide when submitting a proposal request.</li>
                <li>Any other information you choose to share when corresponding with us.</li>
              </ul>
              <p>
                We may also collect technical information automatically about how you
                use the website, such as browser type, device information, page views,
                referring pages, and basic interaction data. This helps us understand
                site performance and improve usability.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">How we use your information</h2>
              <p>We may use the information we collect to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Respond to enquiries and provide the services you request.</li>
                <li>Process proposal requests and follow up on project discussions.</li>
                <li>Manage and improve our website, content and customer support.</li>
                <li>Monitor site performance, diagnose issues and improve accessibility.</li>
                <li>Communicate important updates or service information relevant to your enquiry.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Legal basis for processing</h2>
              <p>
                Where required by law, we process personal information on the basis
                of your consent, our legitimate interests, or the need to fulfil a
                contract or respond to a service request.
              </p>
              <p>
                Where we rely on legitimate interests, we will balance those interests
                against your rights and interests and only process the information
                where we believe the processing is reasonable and proportionate.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">How we share information</h2>
              <p>
                We do not sell your personal information. We may share personal
                information only where this is necessary to provide services, support
                business operations, or comply with legal obligations.
              </p>
              <p>
                This may include trusted third-party providers that assist with
                hosting, email delivery, analytics, customer support or technical
                infrastructure, where appropriate safeguards are in place.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Cookies and similar technologies</h2>
              <p>
                This website may use cookies, session data or similar technologies to
                support core functionality, remember preferences, and understand how
                visitors use the site.
              </p>
              <p>
                We do not use advertising trackers, marketing pixels or unrelated
                tracking technologies as part of this website. Any cookies used are
                limited to what is needed for the proper functioning of the site and
                basic service improvement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Data retention</h2>
              <p>
                We keep personal information only for as long as necessary to fulfil
                the purpose for which it was collected, to comply with legal
                obligations, or to support legitimate business needs such as
                record-keeping, dispute resolution or service continuity.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Your rights</h2>
              <p>
                Depending on your location and applicable law, you may have rights
                in relation to your personal information, including the right to
                request access, correction, deletion, restriction of processing, or
                objection to certain processing.
              </p>
              <p>
                If you would like to exercise any of these rights, or if you have
                questions about how your information is handled, please contact us at
                <a
                  href={`mailto:${businessEmail}`}
                  className="ml-1 font-medium text-accent-dark transition-colors hover:text-primary"
                >
                  {businessEmail}
                </a>
                .
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Contact</h2>
              <p>
                If you have any questions about this Privacy Policy or the way we
                process personal information, please contact Cedar Vertex at
                <a
                  href={`mailto:${businessEmail}`}
                  className="ml-1 font-medium text-accent-dark transition-colors hover:text-primary"
                >
                  {businessEmail}
                </a>
                .
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}