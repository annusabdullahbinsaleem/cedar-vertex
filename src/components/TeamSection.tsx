import Image from "next/image";
import Link from "next/link";
import styles from "./TeamSection.module.css";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  linkedin: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Anus Abdullah Bin Saleem",
    role: "Founder",
    image: "/images/team/anus-abdullah-bin-saleem.png",
    linkedin: "https://www.linkedin.com/in/annus-abdullah-bin-saleem/",
  },
  {
    name: "Asra Saleem",
    role: "Co-Founder · Business & Finance",
    image: "/images/team/asra-saleem.png",
    linkedin: "https://www.linkedin.com/in/asra-saleem-aa6098125/",
  },
  {
    name: "Basir Bin Saleem",
    role: "Graphic Designer & Video Editor",
    image: "/images/team/basir-bin-saleem.png",
    linkedin: "https://www.linkedin.com/in/basirbinsaleem/",
  },
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
      <path d="M6.94 8.5A1.5 1.5 0 1 1 6.94 5.5a1.5 1.5 0 0 1 0 3Zm-1.25 1.63h2.5v8.37h-2.5V10.13Zm4.34 0h2.39v1.14h.03c.33-.63 1.15-1.3 2.37-1.3 2.54 0 3.01 1.67 3.01 3.84v4.69h-2.5v-4.4c0-1.05-.02-2.4-1.47-2.4-1.47 0-1.69 1.15-1.69 2.33v4.47h-2.5V10.13Z" />
    </svg>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex flex-col">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-surface">
        <div className={`relative aspect-[4/5] overflow-hidden ${styles.imageFrame}`}>
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-full w-full object-cover"
          />

          <div aria-hidden="true" className={styles.overlay} />

          <div className={styles.actions}>
            <Link
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${member.name} on LinkedIn`}
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-primary shadow-sm transition-colors duration-200 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white ${styles.linkedin}`}
            >
              <LinkedInIcon />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-display text-xl text-ink sm:text-2xl">{member.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{member.role}</p>
      </div>
    </article>
  );
}

export default function TeamSection() {
  return (
    <section id="team" aria-labelledby="team-heading" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent-dark">Meet the team</p>
          <h2 id="team-heading" className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            The People Behind Cedar Vertex
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
