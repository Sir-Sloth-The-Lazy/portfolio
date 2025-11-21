import dayjs from "dayjs"

import { navLinks } from "#constants"

export const Navbar = () => {
  return (
    <nav>
        <div>
            <img src="/images/logo.svg" alt="logo" />
            <p className="font-bold"> Jeevant's Portfolio</p>
            <ul>
                {navLinks.map(({ id , name}) =>(
                    <li key={id}>
                        <p>{name}</p>
                        </li>
                ))}
            </ul>
        </div>
        <div>
            <time>{dayjs().format("YYYY")}</time>
        </div>
    </nav>
  )
}
