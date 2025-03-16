import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>About Us</h1>
            <a>Contact: </a>
            <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to nextjs.org →
        </a> <br/>
        <Link href={"/home"}>Get back to home page.</Link>
        </div>
    );
}