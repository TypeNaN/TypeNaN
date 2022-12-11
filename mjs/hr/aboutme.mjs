'use strict';


import particle from '../effect/particle.mjs'


const aboutme_lang = {
  header: { th: 'สิ่งที่ฉันเป็น', en: 'What I am ?' },
  desc: {
    th: '<p>ฉันคือผู้ที่หลงใหลในเทคโนโลยีและมีความทยานอยากเป็นนักพัฒนาโปรแกรมอย่างมาก ฉันมีความใฝ่ฝันหลายอย่างที่ฉันคิดว่าสามารถทำให้มันเป็นจริงได้จากโปรแกรมที่ฉันพัฒนาขึ้นมา ฉันชอบหาคำตอบด้วยตัวเองมากกว่าการตั้งคำถามและรอคำตอบ</p><p>แม้โลกที่หมุนเร็วขึ้นทุกวันฉันยังคงเดินทีละก้าวโดยหวังว่าสักวันจะไล่ทันความสำเร็จมาโอบกอดไว้</p>',
    en: '<p>I am a technology enthusiast and aspiring developer. I have many aspirations that I think can be realized through the program I developed. I prefer to seek answers on my own rather than asking questions and waiting for answers.</p><p>Even though the world is turning faster every day, I still take one step at a time hoping that someday Will catch up with success and bring it to embrace.</p>'
  },
}

export default class {
  constructor(section) {
    this.section = section
    this.render()
  }

  render = async () => {
    this.lang = document.documentElement.lang
    this.aboutme = document.createElement('section')
    this.aboutme.id = 'HR-Aboutme'
    this.aboutme.className = 'HR-Aboutme scroll-animate'
    this.section.appendChild(this.aboutme)

    this.aboutme.innerHTML += `<h1>${aboutme_lang['header'][this.lang]}</h1>`

    this.aboutme_pic = document.createElement('div')
    this.aboutme_pic.id = 'Aboutme-me'
    this.aboutme.appendChild(this.aboutme_pic)

    this.aboutme_desc = document.createElement('div')
    this.aboutme_desc.id = 'Aboutme-desc'
    this.aboutme_desc.innerHTML = aboutme_lang['desc'][this.lang]
    this.aboutme_pic.appendChild(this.aboutme_desc)

    new particle(this.aboutme, this.aboutme_pic.clientWidth, this.aboutme_pic.clientHeight, './assets/me.webp')


    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show')
        else entry.target.classList.remove('show')
      })
    })
    const scrollAnimate = document.querySelectorAll('.HR-Aboutme.scroll-animate')
    scrollAnimate.forEach((el) => observer.observe(el))
  }
}