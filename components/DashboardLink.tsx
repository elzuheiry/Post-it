import Link from "next/link";
import Image from "next/image";

type Props = {
  image: string;
  name: string;
};

export default function DashboardLink({ image, name }: Props) {
  return (
    <li>
      <Link href={"/dashboard"}>
        <Image
          width={40}
          height={40}
          src={image}
          alt={name}
          className="rounded-full overflow-hidden"
        />
      </Link>
    </li>
  );
}
