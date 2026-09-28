/** Logo oficial da marca — nunca recriar com texto/fonte, ver puka-marca/puka-manual.html. */
export default function BrandLogo({ height = 28 }: { height?: number }) {
  return (
    <>
      <img
        src="/brand/puka-principal-cor.svg"
        alt="Puka"
        height={height}
        style={{ height, width: "auto" }}
        className="dark:hidden"
      />
      <img
        src="/brand/puka-principal-negativo.svg"
        alt="Puka"
        height={height}
        style={{ height, width: "auto" }}
        className="hidden dark:block"
      />
    </>
  );
}
