import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Link legacyBehavior
        href={{
          pathname: '/[company]',
          query: { company: 'abc-company' },
        }}>
        <a>ABC Company</a>
      </Link>
    </div>
  );
}