import Image from "next/image";

export default function GallerySection(){

const images = [
  {
    src: "/images/worship.jpg",
    title: "Global Worship Service"
  },
  {
    src: "/images/conference.jpg",
    title: "DLCSF Conference"
  },
  {
    src: "/images/prayer.jpg",
    title: "Prayer Meeting"
  }
];


return (
<section>

{images.map((image)=>(
<div key={image.src}>

<Image
src={image.src}
alt={image.title}
width={500}
height={350}
/>

<h3>
{image.title}
</h3>

</div>
))}

</section>
)

}