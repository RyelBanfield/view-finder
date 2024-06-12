import { Navbar } from "@/components/Navbar";

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Template;
