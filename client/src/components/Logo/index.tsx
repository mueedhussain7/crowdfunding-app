import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/">
            <p className='text-xl text-primary font-bold'>Bit<span className='text-secondary'>Raise</span></p>
        </Link>
    );
}

export { Logo }