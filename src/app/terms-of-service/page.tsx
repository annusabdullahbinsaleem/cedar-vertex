import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Cedar Vertex",
  description:
    "Terms of Service for Cedar Vertex, a Bristol-based technology and digital services business.",
};

const businessEmail = "hello@cedarvertex.com";

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            <p className="text-sm text-ink-soft">Last updated: 13 September 2026</p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Introduction</h2>
              <p>
                These Terms of Service set out the terms under which Cedar Vertex
                provides digital design, development, consultancy and related
                services to clients and visitors of this website.
              </p>
              <p>
                By using this website or engaging Cedar Vertex for services, you
                agree to these Terms. Where a separate written proposal, statement
                of work, quote, contract or agreement is entered into, that
                document will take precedence over any conflicting term in these
                Terms, to the extent permitted by law and the parties&apos; written
                agreement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">About Cedar Vertex</h2>
              <p>
                Cedar Vertex is a Bristol-based digital design and technology
                business offering services such as website development, web and
                software development, UI/UX and product design, digital product
                development, technology consultancy, accessibility-focused design,
                SEO services, branding and graphic design, social media and digital
                design services, AI-assisted digital or product development, and
                other agreed digital or technology services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Definitions</h2>
              <p>
                In these Terms, the following meanings apply: &ldquo;Cedar Vertex&rdquo;
                means the business providing the services; &ldquo;Client&rdquo; means the
                individual or organisation engaging Cedar Vertex for services;
                &ldquo;Services&rdquo; means the services described in a proposal,
                statement of work, quote or other agreed written arrangement;
                &ldquo;Website&rdquo; means this website and related online content;
                and &ldquo;Deliverables&rdquo; means any work product or outputs agreed
                to be provided under the applicable Services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Using Our Website</h2>
              <p>
                You may use this Website for lawful purposes only. You agree not to:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Misuse, interfere with or disrupt the Website or its services.</li>
                <li>Attempt unauthorised access to any part of the Website, systems or data.</li>
                <li>Introduce malicious code, viruses, malware or other harmful material.</li>
                <li>Use the Website for unlawful, fraudulent or deceptive activity.</li>
              </ul>
              <p>
                Cedar Vertex aims to keep Website information accurate and up to date,
                but we do not guarantee that all statements, pricing, service
                descriptions or other content on the Website are complete, current or
                error-free at all times.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Our Services</h2>
              <p>
                Cedar Vertex provides digital design, development and related
                services on an agreed basis. The exact Services, deliverables,
                timelines, responsibilities and fees will typically be set out in a
                proposal, quotation, statement of work or other written agreement.
              </p>
              <p>
                A proposal or quotation is not automatically a binding contract until
                accepted by both parties in writing, or otherwise agreed in a way
                consistent with the applicable proposal or contract.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Proposals, Quotes and Scope of Work</h2>
              <p>
                Any proposal, quote or statement of work provided by Cedar Vertex is
                subject to the terms stated in that document and these Terms. The
                agreed scope, deliverables, fees, timescales, assumptions, dependencies,
                approval steps and any third-party costs should be documented clearly.
              </p>
              <p>
                Additional work outside the agreed scope may require a revised
                proposal, additional fees or an amended timeline. Cedar Vertex may
                also need the Client to provide access, content, feedback, approvals,
                brand assets, credentials, account access, hosting details, APIs,
                domain information, testing access or other material in a timely
                manner.
              </p>
              <p>
                Project timelines may depend on the Client&apos;s timely provision of
                the information and access required for the Services. Where the Client
                delays or withholds approvals, content or access, delivery dates may
                need to be revised.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Client Responsibilities</h2>
              <p>
                The Client is responsible for providing accurate information, timely
                approvals, relevant content, required assets, access credentials and
                any other cooperation needed for the project to proceed.
              </p>
              <p>
                The Client must ensure that it has the rights to any materials,
                content, images, text, data, brand assets, code, trademarks,
                licensed assets or other information it provides to Cedar Vertex.
                Cedar Vertex is not responsible for checking or verifying the legal
                ownership or licensing of materials supplied by the Client, except
                where expressly agreed in writing.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Payments and Fees</h2>
              <p>
                Fees, payment terms and any deposit, milestone or other payment
                arrangement will be stated in the applicable proposal, quote,
                invoice or written agreement.
              </p>
              <p>
                Where a proposal or invoice states a payment period, payment is due
                within that period unless otherwise agreed. Additional work,
                revisions outside the agreed scope, third-party costs, rush requests,
                extra consultancy or additional services may be charged separately.
              </p>
              <p>
                Where a Client does not pay amounts due when required, Cedar Vertex
                may suspend work, delay delivery or withhold transfer or licensing of
                applicable final deliverables to the extent permitted by the written
                agreement and applicable law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Changes to Project Scope</h2>
              <p>
                If the Client requests changes to the agreed scope of work, Cedar
                Vertex may revise the project plan, delivery schedule, fees or
                deliverables as appropriate. Any material change should be agreed in
                writing before work proceeds.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Project Delays</h2>
              <p>
                Cedar Vertex will aim to meet agreed delivery dates, but timings may
                be affected by factors outside our reasonable control, including
                delays in receiving approvals, content, assets, feedback, access,
                infrastructure or third-party services.
              </p>
              <p>
                In such circumstances, Cedar Vertex may extend timelines reasonably,
                provided that the delay is not caused by Cedar Vertex&apos;s failure to
                perform its agreed responsibilities.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Intellectual Property</h2>
              <p>
                The Client retains ownership of any Client-owned materials that it
                provides to Cedar Vertex, including pre-existing content, brand assets,
                documents, data and other materials that the Client lawfully owns and
                provides for the project.
              </p>
              <p>
                Cedar Vertex retains ownership of its pre-existing tools, frameworks,
                templates, processes, know-how, reusable components, internal methods,
                non-project-specific materials and other intellectual property unless
                otherwise expressly agreed in writing.
              </p>
              <p>
                Ownership and licensing of final Deliverables will be governed by the
                applicable proposal, statement of work, contract or written agreement.
                Unless expressly stated otherwise, Cedar Vertex does not automatically
                transfer all rights in every deliverable to the Client regardless of
                payment status.
              </p>
              <p>
                Third-party assets, open-source components, libraries, plugins,
                frameworks, templates and similar items remain subject to their
                respective licences. Cedar Vertex may use general skills, knowledge,
                techniques and non-confidential know-how developed during a project,
                provided this does not disclose confidential Client information.
              </p>
              <p>
                Where payment is outstanding, Cedar Vertex may withhold delivery,
                transfer or licensing of applicable final Deliverables to the extent
                permitted by the applicable agreement and applicable law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Client Materials and Content</h2>
              <p>
                The Client is responsible for ensuring that any materials, content,
                text, images, logos, data, code, media, assets or other information
                it provides to Cedar Vertex do not infringe the rights of any third
                party and are suitable for the agreed project purpose.
              </p>
              <p>
                Cedar Vertex may review, edit, refine, adapt, reorganise or repurpose
                content where reasonably necessary to deliver the Services, but this
                does not transfer ownership of Client-owned materials unless expressly
                agreed.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Third-Party Services</h2>
              <p>
                Cedar Vertex may use or integrate third-party services such as hosting
                providers, domain providers, cloud services, APIs, payment providers,
                analytics tools, CMS platforms, plugins, AI tools, communication
                platforms and other software or service providers where relevant to
                the Services.
              </p>
              <p>
                These third-party services may have their own terms, pricing,
                availability, support limits, privacy practices and restrictions. The
                Client is responsible for reviewing and accepting any separate terms
                that apply to those services where applicable.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">AI-Assisted Work</h2>
              <p>
                Cedar Vertex may use AI-assisted tools during design, development,
                research, content production, debugging or other digital work where
                appropriate.
              </p>
              <p>
                AI-assisted outputs may require human review, testing, editing,
                refinement or validation before being used in a production or client
                environment. Cedar Vertex does not guarantee that every AI-assisted
                output will be error-free or suitable for every purpose without
                review.
              </p>
              <p>
                Client confidentiality and applicable data protection obligations still
                apply to AI-assisted work. Cedar Vertex will not intentionally use
                confidential Client information with an AI service where doing so
                would breach an applicable confidentiality obligation or agreed
                restriction.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Website and Software Availability</h2>
              <p>
                Cedar Vertex will use reasonable care to maintain the Website and any
                agreed Services, but availability, uptime, performance and access may
                vary depending on hosting, connectivity, software dependencies,
                third-party providers, maintenance windows and other factors.
              </p>
              <p>
                While Cedar Vertex aims to provide a reliable service, no system is
                guaranteed to be free from interruption, defects or maintenance
                requirements. Where a service is hosted by a third party, that third
                party&apos;s availability and limitations may also apply.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Accessibility</h2>
              <p>
                Cedar Vertex is committed to accessible digital design and development
                practices where reasonably possible. However, accessibility is a
                continuous process and the level of accessibility achieved for any
                project will depend on the agreed scope, the Client&apos;s content,
                the chosen technologies and the relevant requirements applicable to
                the project.
              </p>
              <p>
                Cedar Vertex will use reasonable efforts to apply accessibility best
                practices in the design and implementation of agreed Services, but no
                statement of compliance can be guaranteed for every platform,
                browser, device, content source or third-party integration.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Confidentiality</h2>
              <p>
                Cedar Vertex will hold confidential information supplied by the Client
                in confidence and will use it only for the purposes of delivering the
                agreed Services, except where disclosure is required by law, court
                order or professional obligations.
              </p>
              <p>
                Each party should identify confidential information as such where
                reasonably possible. Cedar Vertex may retain and use general knowledge,
                experience, methods and techniques developed during the project,
                provided it does not disclose specific confidential Client
                information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Data Protection and Privacy</h2>
              <p>
                Cedar Vertex handles personal information in line with applicable data
                protection law and the Cedar Vertex Privacy Policy, available at
                <a
                  href="/privacy-policy"
                  className="ml-1 font-medium text-accent-dark transition-colors hover:text-primary"
                >
                  /privacy-policy
                </a>
                .
              </p>
              <p>
                The Client is responsible for ensuring that any personal data it sends
                to Cedar Vertex is provided lawfully and with appropriate consent or
                lawful basis where required.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Warranties and Disclaimers</h2>
              <p>
                Cedar Vertex will perform the Services with reasonable care and skill
                consistent with industry practice and the agreed scope of work.
              </p>
              <p>
                Except where expressly stated in a written agreement, Cedar Vertex
                does not guarantee specific commercial results, rankings, traffic,
                conversions, lead generation, revenue, audience growth or other
                business outcomes. Any such outcomes depend on many factors beyond
                Cedar Vertex&apos;s control.
              </p>
              <p>
                To the extent permitted by applicable law, Cedar Vertex excludes any
                implied warranties or conditions that are not expressly stated in the
                applicable agreement, except those that cannot lawfully be excluded.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Limitation of Liability</h2>
              <p>
                Cedar Vertex&apos;s total liability arising from the Services, the Website or
                these Terms will be limited to the fees actually paid for the relevant
                Services, or such other amount as may be stated in the applicable written
                agreement, where applicable.
              </p>
              <p>
                Cedar Vertex will not be liable for indirect, incidental, consequential,
                special or punitive losses, including loss of business, loss of revenue,
                loss of goodwill, loss of opportunity or loss of data, except where such
                loss arises from Cedar Vertex&apos;s gross negligence, wilful misconduct or
                fraud.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Indemnity</h2>
              <p>
                The Client agrees to indemnify and hold Cedar Vertex harmless from and
                against claims, losses, costs or liabilities arising from the Client&apos;s
                misuse of the Services, unlawful content, breach of third-party rights,
                failure to obtain required permissions, or other conduct by the Client
                that causes harm, loss or legal claim.
              </p>
              <p>
                This indemnity does not apply to claims arising from Cedar Vertex&apos;s own
                negligence, misconduct or failure to perform the Services with reasonable
                care and skill.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Suspension or Termination</h2>
              <p>
                Either party may terminate the Services where permitted by the
                applicable agreement and applicable law. Where termination occurs,
                the Client remains responsible for work properly completed and any
                approved or incurred costs up to the termination date.
              </p>
              <p>
                Certain provisions, including those relating to confidentiality,
                intellectual property, payment obligations, liability allocations,
                dispute resolution and any other provisions that by their nature are
                intended to continue after termination, will continue in force where
                appropriate.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Cancellation</h2>
              <p>
                Cancellation rights and procedures will depend on the terms of the
                applicable proposal, statement of work or agreement. Where a project
                is cancelled, the Client remains responsible for any work already
                completed, approved or committed by Cedar Vertex, along with any
                non-refundable or agreed charges in the relevant agreement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Force Majeure</h2>
              <p>
                Cedar Vertex will not be liable for delays or failure to perform
                caused by circumstances beyond its reasonable control, including acts
                of God, extreme weather, strikes, labour disruption, supply chain
                disruption, cyber incidents, pandemic, public health measures,
                government action, internet or telecommunications failures, or the
                failure of third-party services or infrastructure on which the Services
                depend.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Links to Third-Party Websites</h2>
              <p>
                The Website may contain links to external websites or resources
                operated by others. Cedar Vertex is not responsible for the content,
                accuracy, availability, privacy practices or terms of those third-party
                websites.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Changes to These Terms</h2>
              <p>
                Cedar Vertex may update these Terms from time to time to reflect changes
                in our Services, legal requirements, business practices or regulatory
                expectations. Any material update will be posted on this page with a
                revised &ldquo;Last updated&rdquo; date.
              </p>
              <p>
                Continued use of the Website or the Services after such changes are made
                will indicate your acceptance of the updated Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Governing Law and Jurisdiction</h2>
              <p>
                These Terms are governed by the laws of England and Wales, unless
                applicable law requires otherwise.
              </p>
              <p>
                Any dispute arising out of or in connection with these Terms will be
                subject to the exclusive jurisdiction of the courts of England and
                Wales, unless a different forum is required by applicable law.
              </p>
              <p>
                Where a customer is a consumer, nothing in these Terms is intended to
                remove or restrict any rights that cannot lawfully be excluded or
                restricted under applicable UK consumer protection law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, the Website,
                or the Services, please contact Cedar Vertex at
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
