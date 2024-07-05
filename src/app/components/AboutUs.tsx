type Props = {
  heading: string;
  description: string;
};

export type AboutUsProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const AboutUs = (props: AboutUsProps) => {
  const { heading, description } = {
    ...AboutUsDefaults,
    ...props,
  } as Props;
  return (
    <section id="about-us" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 items-start justify-between gap-x-12 gap-y-8 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:gap-x-20">
        <div>
          <h2 className="text-5xl font-bold md:text-7xl lg:text-8xl">
            {heading}
          </h2>
        </div>
        <div>
          <div>
            <p className="md:text-md">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AboutUsDefaults: AboutUsProps = {
  heading: "We're focused on quality and experience.",
  description:
    "As a new platform run by a small team, we're committed to providing the best user experience possible. We're dedicated to delivering high-quality visuals and a seamless user experience. We will be taking feedback and iterating on our platform to ensure it meets the needs of our users.",
};

AboutUs.displayName = "AboutUs";
