import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Old standalone pages now live as sections on the home page
export default function SectionRedirect({ to }: { to: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Link href={to} className="label">
        Redirecting…
      </Link>
    </main>
  );
}
