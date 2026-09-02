import Image from "next/image";

type Organization = {
  name: string;
  logo?: string;
  caption?: string;
  logoClassName?: string;
};

const groups: { title: string; organizations: Organization[] }[] = [
  {
    title: "Customers & collaborators",
    organizations: [
      {
        name: "ScepterAir Inc.",
        logo: "/partners/mono/scepter-air.png",
      },
      {
        name: "Mara Elephant Project · Kenya",
        logo: "/partners/mono/mara-elephant-project.png",
      },
      {
        name: "Safisha Nchi Ltd · Kenya",
        logo: "/partners/mono/safisha-nchi.png",
        caption: "Safisha Nchi Ltd",
      },
      {
        name: "Pergam Italia",
        logo: "/partners/mono/pergam-italia.png",
      },
      { name: "SpectraView Inc." },
    ],
  },
  {
    title: "Academic institutions",
    organizations: [
      {
        name: "Stanford University",
        logo: "/partners/mono/stanford.png",
      },
      { name: "UC Santa Barbara", logo: "/partners/mono/ucsb.png" },
      {
        name: "Smithsonian National Zoo & Conservation Biology Institute",
        logo: "/partners/mono/smithsonian-national-zoo.png",
      },
      { name: "IIT Delhi", logo: "/partners/mono/iit-delhi-clean.png" },
      {
        name: "IIT Kanpur",
        logo: "/partners/mono/iit-kanpur.png",
        logoClassName: "md:scale-[1.18]",
      },
    ],
  },
  {
    title: "Supporters",
    organizations: [
      {
        name: "Mozilla Foundation",
        logo: "/partners/mono/mozilla-foundation.png",
      },
      { name: "CNSI · UCSB", logo: "/partners/mono/cnsi-ucsb.png" },
      {
        name: "Schmidt Science Foundation",
        logo: "/partners/mono/schmidt-sciences.png",
      },
      {
        name: "Google for Startups",
        logo: "/partners/mono/google-for-startups.png",
      },
      {
        name: "NVIDIA Inception",
        logo: "/partners/mono/nvidia-inception.png",
      },
      {
        name: "GWC · Global Wildlife Conservation",
        logo: "/partners/mono/global-wildlife-conservation.png",
      },
    ],
  },
];

export default function PartnerOrganizations() {
  return (
    <div className="mt-14 space-y-12 rounded-2xl border border-divider bg-black/20 px-6 py-10 text-left md:px-10 md:py-12 lg:-mx-10 xl:-mx-20">
      {groups.map((group) => (
        <section key={group.title} aria-label={group.title}>
          <h3 className="text-center text-label uppercase tracking-label text-text-dim">
            {group.title}
          </h3>
          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5 xl:gap-x-10">
            {group.organizations.map((organization) => (
              <div
                key={organization.name}
                className="flex min-h-28 items-center justify-center p-2 opacity-75 transition-opacity hover:opacity-100"
                title={organization.name}
              >
                {organization.logo ? (
                  <div className="flex w-full flex-col items-center gap-2">
                    <div className="relative h-16 w-full md:h-20">
                      <Image
                        src={organization.logo}
                        alt={organization.name}
                        fill
                        sizes="(min-width: 1280px) 230px, (min-width: 1024px) 210px, (min-width: 640px) 30vw, 45vw"
                        className={`object-contain ${organization.logoClassName ?? ""}`}
                      />
                    </div>
                    {organization.caption ? (
                      <span className="text-center text-body-xs font-medium text-white">
                        {organization.caption}
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <span className="text-center text-body-sm font-semibold leading-heading text-white">
                    {organization.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
