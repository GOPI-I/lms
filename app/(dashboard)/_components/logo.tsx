import Image from "next/image";

export const Logo = () =>{
    return(
        <Image
        height={123}
        width={123}
        alt="logo"
        src="/logo.svg"
        />
    )
}