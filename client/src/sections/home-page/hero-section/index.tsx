import { Button } from "@nextui-org/react";
import Link from "next/link";

interface HeroProps {
  data: {
    title: string;
    subtitle?: string;
    description: string;
    cta1: { label: string; link: string };
    cta2: { label: string; link: string };
  };
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="text-text">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[90vh] lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            {data.title}
            {data.subtitle && <span className="sm:block">{data.subtitle}</span>}
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl">{data.description}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button className="rounded-md" variant="solid" color="primary">
              <Link
                href={data.cta1.link}
                className="w-full h-full flex justify-center items-center"
              >
                {data.cta1.label}
              </Link>
            </Button>
            <Button className="rounded-md" variant="bordered" color="primary">
              <Link className="w-full h-full flex justify-center items-center" href={data.cta2.link}>{data.cta2.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
