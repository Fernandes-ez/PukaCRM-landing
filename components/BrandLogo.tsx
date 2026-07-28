import Image from "next/image";

export default function BrandLogo({
  iconSize = 32,
  textClassName = "text-lg",
}: {
  iconSize?: number;
  textClassName?: string;
}) {
  return (
    <span className="flex items-center gap-2">
      <Image
        src="/logo-icon.png"
        alt="Puka CRM"
        width={iconSize}
        height={iconSize}
        priority
      />
      <span className={`font-semibold ${textClassName}`}>
        Puka <span className="text-brand-600 dark:text-brand-400">CRM</span>
      </span>
    </span>
  );
}
