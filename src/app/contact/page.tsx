import { Mail, Phone, MapPin } from "lucide-react";


export default function ContactPage() {

return (

<main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">


<section className="py-24 px-6 text-center">


<h1 className="text-5xl font-bold text-yellow-400">
Contact DLCSF Global
</h1>


<p className="mt-5 text-gray-200">
Connect with our global fellowship team.
</p>


</section>



<section className="max-w-5xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-8">


<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">

<Mail size={40}/>

<h2 className="text-xl font-bold mt-5">
Email
</h2>

<p className="mt-3">
info@dlcsfglobal.org
</p>

</div>



<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">

<Phone size={40}/>

<h2 className="text-xl font-bold mt-5">
Phone
</h2>

<p className="mt-3">
+234 XXX XXX XXXX
</p>

</div>



<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">

<MapPin size={40}/>

<h2 className="text-xl font-bold mt-5">
Location
</h2>

<p className="mt-3">
Global Headquarters
</p>

</div>


</section>


</main>

);

}