import React, { useRef } from 'react'
import gsap from "gsap" ;
import { useGSAP } from '@gsap/react';

const FONT_WEIGHTS =   {
    subtitle : {min : 100 , max : 400 , default : 100},
    title : {min :400 , max : 900 , default : 400},
}

const renderText = (text , className , baseWeight = 400) => {
    return [...text].map((char , idx) => (
        <span key={idx} className={className} style={{fontVariationSettings: `"wght" ${baseWeight}`}}>
            {char === " " ? "\u00a0" : char}
        </span>
    ))
}
const setupTextHover = (container , type) => {
    if(!container) 
        return ;
    const letters = container.querySelectorAll("span");
    const {min , max } =   FONT_WEIGHTS[type];

    const animateLetter = (letter , weight , duration = 0.25) => {
        return gsap.to(letter , {
            duration , 
            ease : "power2.out",
            fontVariationSettings : `"wght" ${weight}`
        }) 
    }

    const handleMouseMove = (e) => {
        const {left} = container.getBoundingClientRect();
        const mouseX = e.clientX - left;
        
        letters .forEach((letter) => {
            const {left : l , width : w} = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l - left + w / 2));
            const intensity = Math.exp(-(distance**2)/ 20000)
            animateLetter(letter , min + (max - min) * intensity)
        })
    }

    const handleMouseLeave = () => {
        letters.forEach((letter) => {
            animateLetter(letter, min)
        })
    }

    container.addEventListener("mousemove" , handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)
    
    return () => {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", handleMouseLeave)
    }
};

const Welcome = () => {
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)


    useGSAP(() => {
        const cleanupTitle = setupTextHover(titleRef.current , "title")
        const cleanupSubtitle = setupTextHover(subtitleRef.current , "subtitle")

        return () => {
            if(cleanupTitle) cleanupTitle()
            if(cleanupSubtitle) cleanupSubtitle()
        }
    } , []) ;
  return (
    <section id="welcome">
        <p ref={subtitleRef}> 
            {renderText("Hola Amigo, I'm Jeevant ! Welcome to my" ,
            "text-3xl font-georama",
            100
            )} 
            </p>
        
        <h1 ref={titleRef} className="mt-7">
             {renderText(
                "portfolio",
                "text-9xl italic font-georama",
                 )} </h1>
        <div className="small-screen">
            <p> This website can be best experienced on a desktop/tablet </p>
        </div>
    </section>
  )
}

export default Welcome ;