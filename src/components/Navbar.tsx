"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  Bell,
  Globe2,
  Menu,
  X,
  UserCircle,
} from "lucide-react";


export default function Navbar() {

const [open,setOpen] = useState(false);
const [search,setSearch] = useState(false);
const [notify,setNotify] = useState(false);


return (

<header className="fixed top-0 w-full z-50 bg-white shadow">


<nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">


{/* LOGO */}

<Link href="/" className="flex items-center gap-3">

<div className="bg-blue-800 text-white p-3 rounded-xl">
<Globe2 size={25}/>
</div>


<div>

<h1 className="font-bold text-xl text-blue-900">
DLCSF Global
</h1>

<p className="text-xs text-gray-500">
Raising Kingdom Ambassadors
</p>

</div>

</Link>





{/* MENU */}

<div className="hidden lg:flex gap-6 items-center">


<Link href="/">
Home
</Link>

<Link href="/about">
About
</Link>


<Link href="/countries">
Countries
</Link>


<Link href="/events">
Events
</Link>


<Link href="/sermons">
Sermons
</Link>


<Link href="/prayer">
Prayer
</Link>


<Link href="/contact">
Contact
</Link>



{/* SEARCH BUTTON */}

<button
onClick={()=>setSearch(!search)}
className="p-2 hover:bg-gray-100 rounded-full"
>

<Search size={22}/>

</button>





{/* NOTIFICATION BUTTON */}

<button
onClick={()=>setNotify(!notify)}
className="relative p-2 hover:bg-gray-100 rounded-full"
>

<Bell size={22}/>


<span className="absolute top-1 right-1 bg-red-500 w-2 h-2 rounded-full"></span>


</button>





{/* PROFILE */}

<UserCircle size={26}/>




<Link
href="/login"
className="border border-blue-800 px-5 py-2 rounded-xl text-blue-800"
>

Login

</Link>



<Link
href="/register"
className="bg-blue-800 text-white px-5 py-2 rounded-xl"
>

Register

</Link>


</div>






{/* MOBILE BUTTON */}

<button
className="lg:hidden"
onClick={()=>setOpen(!open)}
>

{
open ?
<X/>
:
<Menu/>
}

</button>


</nav>





{/* SEARCH BAR */}

{

search &&

<div className="bg-white shadow p-5">

<input

placeholder="Search sermons, events, countries..."

className="w-full border rounded-lg p-3"

/>

</div>

}





{/* NOTIFICATION BOX */}

{

notify &&

<div className="absolute right-10 top-20 bg-white shadow-xl p-5 rounded-xl">

<h3 className="font-bold">
Notifications
</h3>

<p className="text-gray-500">
No new notifications
</p>

</div>

}





{/* MOBILE MENU */}

{

open &&

<div className="lg:hidden bg-white p-6 flex flex-col gap-5">


<Link href="/">
Home
</Link>


<Link href="/about">
About
</Link>


<Link href="/countries">
Countries
</Link>


<Link href="/events">
Events
</Link>


<Link href="/sermons">
Sermons
</Link>


<Link href="/prayer">
Prayer
</Link>


<Link href="/login">
Login
</Link>


<Link href="/register">
Register
</Link>


</div>

}


</header>

)

}