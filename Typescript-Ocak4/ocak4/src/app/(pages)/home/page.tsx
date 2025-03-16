import Link from 'next/link';
import style from '../../page.module.css';

export default function Home() {
    return (
        <div>
            <h1 className={style.primary}>Home</h1>
            <a className={style.secondary}>Hi to Next JS</a><br />
            <a href="/about-us" className={style.secondary}>About</a><br />
            <Link href={"/"}>Main menu</Link>
        </div>
    );
}