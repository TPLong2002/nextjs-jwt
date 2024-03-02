import { Metadata } from "next";

type Props = { params: { productId: string } };

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const title = await new Promise((resolve) => {
    setTimeout(() => resolve("Product " + params.productId), 100);
  });
  return {
    title: `${title}`,
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <p>this is Review page</p>
      </header>
      {children}
    </div>
  );
}
